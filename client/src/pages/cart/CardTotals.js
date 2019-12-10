import React from 'react';
import { Link } from 'react-router-dom';
import {
    ButtonContainerPressedEffectDark as DarkBtn,
    ButtonContainerPressedEffectYellow as YellowBtn
} from '../../components/buttons/Default';

export default function CardTotals({ value }) {
    const { cartSubtotal, cartTax, cartTotal, clearCart } = value;
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 col-sm-8 mt-2 ml-sm-5 ml-md-auto text-capitalize text-right">
                        <button
                            className="btn btn-outline-danger text-uppercase mb-3 px-5"
                            type="button"
                            onClick={() => clearCart()}
                        >
                            limpar carrinho
                        </button>
                        <h5>
                            <span className="text-sub-title">subtotal: </span>
                            <strong>R$ {cartSubtotal}</strong>
                        </h5>
                        <h5>
                            <span className="text-sub-title">frete: </span>
                            <strong>R$ {cartTax}</strong>
                        </h5>
                        <h5>
                            <span className="text-sub-title">total final: </span>
                            <strong>R$ {cartTotal}</strong>
                        </h5>
                        <div className="d-flex flex-row justify-content-between">
                            {/*<PaypalExpressBtn total={cartTotal} clearCart={clearCart} history={history}/>*/}
                            <Link to="/">
                                <DarkBtn
                                    className="text-uppercase mt-5"
                                    type="button"
                                    //onClick={() => clearCart()}
                                >
                                    ver vitrine
                                </DarkBtn>
                            </Link>
                            <Link to="/finalizar-compra">
                                <YellowBtn
                                    className="text-uppercase mt-5"
                                    type="button"
                                    //onClick={() => clearCart()}
                                >
                                    finalizar compra
                                </YellowBtn>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
