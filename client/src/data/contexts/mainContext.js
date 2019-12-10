import React, { Component } from 'react';
import { storeProducts, detailProduct } from '../dataStoreProducts';

//Provider
class ProductProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            detailProduct: detailProduct,
            cart: [],
            favorite: [],
            modalOpenOnly: false,
            modalOpen: false,
            isModalFavoriteOpen: false,
            modalProduct: detailProduct,
            cartSubtotal: 0,
            cartTax: 10,
            cartTotal: 0,
            cartTotalItems: 0
        };
        this.generateRef = this.generateRef.bind(this);
    }

    componentDidMount() {
        this.setProducts();
    }

    //Get Data from login button components
    getDataLogin = data => {
        this.setState({ dataLogin: data });
    };
    // copying the array elements to not being only references
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        });

        this.setState(
            () => {
                return { products: tempProducts };
            },
            () => {
                this.generateRef();
            }
        );
    };

    generateRef = () => {
        const { products } = this.state;
        const productProps = [...products];

        const categoriesAbbrev = productProps.map(each => {
            let tempCategories = [];
            tempCategories.push(each.description.substr(0, 4).toLowerCase());
            return tempCategories;
        });

        productProps.forEach((obj, i) => {
            obj.title += ` (código: ${categoriesAbbrev[i]}${++i})`;
        });
        // this.getRandomArray(productProps);

        // const countCategories = categoriesAbbrev.map(each => {
        //     let cat = {"ling": 0 , "cosm": 0, "come": 0,"sado": 0}
        //     if(each === "sado") {
        //         cat[each]++;
        //     }
        // });

        this.setState(() => {
            return {
                products: [...productProps]
            };
        });
    };

    // For card list random order
    // getRandomArray = array => {
    //     return array.sort(function(a, b) {
    //         return 0.5 - Math.random();
    //     });
    // };

    // getItem = id => {
    //     const { products } = this.state;
    //     const product = products.find(item => item.id === id);
    //     return product;
    // }

    // handleDetail = id => {
    //     const product = this.getItem(id);
    //     this.setState(() => {
    //         return { detailProduct: product };
    //     });
    // };

    // addFavorite = id => {
    //     const { products, favorite } = this.state;
    //     let tempProducts = [...products];
    //     const index = tempProducts.indexOf(this.getItem(id));
    //     const product = tempProducts[index];
    //     product.isAddedToFav = true;
    //     this.setState({
    //         products: tempProducts,
    //         favorite: [...favorite, product]
    //     },
    //     () => {
    //         console.log(this.state);
    //     });
    // };

    // addToCart = id => {
    //     const { products, cart } = this.state;
    //     let tempProducts = [...products];
    //     const index = tempProducts.indexOf(this.getItem(id));
    //     const product = tempProducts[index];
    //     product.inCart = true;
    //     product.count = 1;
    //     const price = product.price;
    //     product.total = price;

    //     this.setState(
    //         () => {
    //             return {
    //                 products: tempProducts,
    //                 cart: [...cart, product]
    //             };
    //         },
    //         () => {
    //             this.addTotals();
    //             this.countItems();
    //         }
    //     );
    /*
        Insert this chunk of code (( } HERE );)) for testing and check the current state which is being rendered.
        , () => {
            console.log(this.state);
        }
        */
    // };

    // MODALS
    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true };
        });
    };

    openModalOnly = () => {
        setTimeout(() => {
            this.setState(() => {
                return {
                    modalOpenOnly: true
                };
            });
        }, 1000);
    };

    openModalFavorite = id => {
        const product = this.getItem(id);
        setTimeout(() => {
            this.setState({ modalProduct: product, isModalFavoriteOpen: true });
        }, 1900);
    };

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false, modalOpenOnly: false, isModalFavoriteOpen: false };
        });
    };
    // END MODALS

    // CART METHODS
    increment = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count++;
        product.total = product.count * product.price;

        this.setState(
            () => {
                return {
                    cart: [...tempCart]
                };
            },
            () => {
                this.addTotals();
                this.countItems();
            }
        );
    };

    decrement = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count--;

        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(
                () => {
                    return {
                        cart: [...tempCart]
                    };
                },
                () => {
                    this.addTotals();
                    this.countItems();
                }
            );
        }
    };

    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(
            () => {
                return {
                    cart: [...tempCart],
                    products: [...tempProducts]
                };
            },
            () => {
                this.addTotals();
            }
        );
    };

    clearCart = () => {
        this.setState(
            () => {
                return {
                    cart: []
                };
            },
            () => {
                this.setProducts();
                this.addTotals();
                this.countItems();
            }
        );
    };

    addTotals = () => {
        let subtotal = 0;
        this.state.cart.map(item => (subtotal += item.total));
        const tempFreight = 15;
        const freight = parseFloat(tempFreight.toFixed(2));
        const total = subtotal + freight;
        this.setState(() => {
            return {
                cartSubtotal: subtotal,
                cartTax: freight,
                cartTotal: total
            };
        });
    };

    countItems = () => {
        const { cart } = this.state;
        let finalCount;
        let totalItems = cart.map(item => {
            return item.count;
        });

        if (totalItems.length !== 0) {
            finalCount = totalItems.reduce((cur, next) => {
                return cur + next;
            });
        }
        this.setState({ cartTotalItems: finalCount });
    };

    render() {
        return (
            <div>
                <ProductContext.Provider
                    value={{
                        ...this.state, //gets all the properties from objects listed in state
                        handleDetail: this.handleDetail,
                        addToCart: this.addToCart,
                        addFavorite: this.addFavorite,
                        openModal: this.openModal,
                        openModalOnly: this.openModalOnly,
                        openModalFavorite: this.openModalFavorite,
                        closeModal: this.closeModal,
                        increment: this.increment,
                        decrement: this.decrement,
                        removeItem: this.removeItem,
                        clearCart: this.clearCart,
                        getDataLogin: this.getDataLogin
                    }}
                >
                    {this.props.children}
                </ProductContext.Provider>
            </div>
        );
    }
}

//Consumer
const ProductContext = React.createContext();
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
