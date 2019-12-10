import React, { useRef, Fragment } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
// import { addElemArrayUser, removeElemArrayUser } from '../../../redux/actions/userActions';
import { findAnItem } from '../../../redux/actions/globalActions';
import {
    showModalConfTitle,
    showModalConfYesNo,
    showModalUnderConstruction
} from '../../../redux/actions/modalActions';
// import { showSnackbar } from '../../../redux/actions/snackbarActions';
import { animateHinge } from '../../../redux/actions/animationActions';
// End Redux
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import truncateWords from '../../../utils/string/truncateWords';
import MultiIconButton from '../../../components/buttons/MultiIconButton';
import { productType } from '../../../types';
// SpeedDial Buttons and Icons
import SpeedDialButton from '../../../components/buttons/SpeedDialButton';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TitleIcon from '@material-ui/icons/Title';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DeleteIcon from '@material-ui/icons/Delete';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
// End SpeedDial Buttons and Icons
import PropTypes from 'prop-types';

// Functions to get modals
const showModalForTitle = (dispatch, allProductsList, _id) => {
    const attachedObj = {
        mainSubject: 'Título',
        nameForm: 'title',
        typeForm: 'text'
    };
    findAnItem(dispatch, allProductsList, _id, attachedObj);
    showModalConfTitle(dispatch);
};
const showModalForPrice = (dispatch, allProductsList, _id) => {
    const attachedObj = {
        mainSubject: 'Preço',
        nameForm: 'price',
        typeForm: 'number'
    };
    findAnItem(dispatch, allProductsList, _id, attachedObj);
    showModalConfTitle(dispatch);
};
const showModalForDeleteProd = (dispatch, allProductsList, _id, animateRef) => {
    const attachedObj = {
        action: {
            noun: 'Exclusão',
            verb: 'Excluir'
        },
        mainSubject: 'Produto'
    };
    findAnItem(dispatch, allProductsList, _id, attachedObj);
    showModalConfYesNo(dispatch);
    setTimeout(() => {
        animateHinge(animateRef);
    }, 9000);
};
// End Functions to get modal

EditableProduct.propTypes = {
    product: productType,
    isFav: PropTypes.bool
}

export default function EditableProduct({ product, isFav }) {
    const animateRef = useRef(null);
    // const [isAddedAsFav, setIsAddedAsFav] = useState(isFav);

    const { allProductsList, isUserAuthenticated } = useStoreState(state => ({
        allProductsList: state.productReducer.cases.allProductsList,
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
    }));
    const dispatch = useStoreDispatch();
    // console.log("isAuth", isUserAuthenticated); //Check this behavior: auth is running multiple 11 times

    const { _id, title, image, price, inCart } = product;

    const speedDial = {
        actions: [
            //the order rendered is inverse from the bottom to top
            {
                icon: <FormatListNumberedIcon />,
                name: 'Mudar Quantidade',
                backColor: 'var(--mainYellow)',
                onClick: () => showModalUnderConstruction(dispatch)
            },
            {
                icon: <TitleIcon />,
                name: 'Editar Título',
                backColor: 'var(--mainYellow)',
                onClick: () => showModalForTitle(dispatch, allProductsList, _id)
            },
            {
                icon: <MonetizationOnIcon />,
                name: 'Mudar Preço',
                backColor: 'var(--mainYellow)',
                onClick: () => showModalForPrice(dispatch, allProductsList, _id)
            },
            {
                icon: <DeleteIcon />,
                name: 'Excluir Produto',
                backColor: '#4834d4',
                onClick: () => showModalForDeleteProd(dispatch, allProductsList, _id, animateRef)
            }
        ]
    };

    // const toggleFav = () => {
    //     setIsFavChanged(!isFavChanged);
    // };

    const editButtons = () => (
        <Fragment>
            <MultiIconButton
                backColor="var(--mainYellow)"
                buttonIcon={<AddAPhotoIcon />}
                top={110}
                left={-10}
                onClick={() => {
                    showModalUnderConstruction(dispatch);
                }}
            />
            <SpeedDialButton actions={speedDial.actions} className="no-outline" />
        </Fragment>
    );

    return (
        <ProductWrapper ref={animateRef} className="col-6 col-md-4 col-lg-3 mx-auto my-2">
            <div style={{ position: 'relative' }} className="card">
                <div
                    className="img-container p-1 p-sm-3"
                    onClick={() => {
                        console.log('value.handleDetail(_id)');
                    }}
                >
                    <Link to="">
                        <img className="card-img-top" src={image} alt="product" />
                    </Link>
                    <button
                        className="cart-fav"
                        // onClick={() => toggleFav()}
                    >
                        {isUserAuthenticated ? (
                            isFav ? (
                                <i
                                    className="filledHeart fas fa-heart animated heartBeat fast"
                                    onClick={() => {
                                        /*removeElemArrayUser(dispatch, bodyFavorite, _idUser);
                                        showSnackbar(dispatch, "Removido dos seus favoritos!");*/
                                    }}
                                    style={{
                                        animationIterationCount: 3
                                    }}
                                ></i>
                            ) : (
                                <i
                                    className="emptyHeart far fa-heart"
                                    onClick={() => {
                                        /*addElemArrayUser(dispatch, bodyFavorite, _idUser);
                                            showSnackbar(dispatch, "Adicionado aos seus favoritos!")*/
                                        // value.openModalFavorite(_id);
                                    }}
                                ></i>
                            )
                        ) : (
                            <i
                                className="emptyHeart far fa-heart"
                                onClick={() => {
                                    /*showModalRegister(dispatch);
                                        showSnackbar(dispatch, "Faça seu acesso para adicionar aos favoritos!")*/
                                }}
                            ></i>
                        )}
                    </button>
                    <button
                        style={{ filter: 'opacity(90%)' }}
                        className="cart-btn"
                        disabled={inCart ? true : false}
                        onClick={() => {
                            // value.addToCart(_id);
                            // value.openModal(_id);
                        }}
                    >
                        {inCart ? (
                            <p className="text-capitalize mb-0" disabled>
                                {' '}
                                No carrinho
                            </p>
                        ) : (
                            <i className="fas fa-cart-plus"></i>
                        )}
                    </button>
                </div>
                {/*card footer*/}
                <div className="text-product-title p-1 card-footer d-flex flex-column text-center justify-content-between">
                    <p style={{ height: '4em', overflow: 'hidden' }} className="mb-0 text-capitalize">
                        {truncateWords(title, 40)}
                    </p>
                    <h5 style={{ position: 'relative' }} className="mt-2 text-right mb-2 mr-2">
                        <span>R$</span>
                        {price}
                    </h5>
                </div>
                {editButtons()}
            </div>
        </ProductWrapper>
    );
}

const ProductWrapper = styled.div`
    .card {
        box-shadow: 0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.12);
        border-color: transparent;
        transition: all 1s linear;
    }
    .card-footer {
        background: transparent;
        border-top: transparent;
        transition: all 1s linear;
    }
    &:hover {
        .card{
            box-shadow: 0 19px 38px rgba(0,0,0,0.40), 0 15px 12px rgba(250,0,0,0.32)
            border: .04rem solid rgba(0, 0, 0, .2);
        }
        .card-footer {
            background: rgba(247, 247, 247);
        }
    }

    .img-container {
        position: relative;
        overflow: hidden; //This is essencial for handle bigger pics
    }

    .card-img-top {
        transition: all .6s linear;
    }

    .img-container:hover .card-img-top {
        transform: scale(1.2);
    }

    .cart-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: .2rem .4rem;
        background: var(--mainYellow);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: .5rem 0 0 0;
        transform: translate(0, 0); /*translate(100%, 100%)*/
        transition: all 1s linear;
    }

    .cart-fav {
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
    }

    .cart-fav i {
        color: var(--mainRed);
        font-size: 1.7rem;
        transition: .5s;
    }

    .cart-fav .emptyHeart {
        opacity: .3;
    }

    .cart-fav .filledHeart {
        opacity: 1;
        transform: scale(1.1);
    }

    .cart-fav .emptyHeart:hover {
        opacity: 1;
        transform: scale(1.1);
    }

    .cart-btn:hover {
        color: var(--mainBlue);
        cursor: pointer;
    }

    .cart-btn:focus, .cart-fav:focus {
        outline: none;
    }

    .img-container:hover .cart-btn {
        transform: translate(0, 0);
    }
`;
