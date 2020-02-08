import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import InsertValue from '../../components/loyaltyScores/InsertValue';
import HomeButton from '../../components/buttons/HomeButton';
import showVanillaToast from '../../components/vanilla-js/toastify/showVanillaToast';
import { useStoreState } from 'easy-peasy';

PurchaseValue.propTypes = {
    success: PropTypes.bool,
    setValuePaid: PropTypes.func,
}

export default function PurchaseValue({ success, setValuePaid }) {
    let { userName, role } = useStoreState(state => ({
        userName: state.userReducer.cases.currentUser.name,
        role: state.userReducer.cases.currentUser.name,
    }))

    useEffect(() => {
        if(userName && role === "cliente" ) {
            setTimeout(() => showVanillaToast(`${userName.cap()}, nesta sessão você precisa de um <br />colaborador do salão<br />para validar sua nova pontuação`, 9000), 3000);
        }
    }, [userName, role])

    return (
        success &&
        <div className="mr-md-5 ml-md-4">
            <div
                className="my-4 animated slideInLeft fast ml-3 text-container text-center"
            >
                Insira o valor da compra da nota fiscal.
            </div>
            <div className="ml-md-5 center-small">
                <InsertValue success={success} setValuePaid={setValuePaid} />
            </div>
            <HomeButton hideComp="purchaseValue" />
        </div>
    );
}
