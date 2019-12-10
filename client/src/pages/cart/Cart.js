import React, { Component } from 'react';
// STRUCTURE
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CardTotals from './CardTotals';
// END STRUCTURE
import Title from '../../components/Title';
import { ProductConsumer } from '../../data/contexts/mainContext';

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const { cart } = value;
                        if (cart.length > 0) {
                            return (
                                <React.Fragment>
                                    <Title title="seu carrinho" />
                                    <CartColumns />
                                    <CartList value={value} />
                                    <CardTotals value={value} history={this.props.history} />
                                </React.Fragment>
                            );
                        } else {
                            return <EmptyCart />;
                        }
                    }}
                </ProductConsumer>
            </section>
        );
    }
}
