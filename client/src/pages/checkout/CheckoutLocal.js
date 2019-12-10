import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ButtonContainerPressedEffectDark as DarkBtn } from '../../components/buttons/Default';
import ShoppingSummary from './ShoppingSummary';
import FormCheckoutLocal from '../../components/forms/FormCheckoutLocal';

export default function checkoutLocal() {
    return (
        <Fragment>
            <div>
                <ShoppingSummary />
                <FormCheckoutLocal />
            </div>
            <div className="container">
                <div className="row">
                    <Link to="/seu-carrinho" className="col-10 mx-auto text-uppercase my-4">
                        <DarkBtn>Voltar Carrinho</DarkBtn>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}

