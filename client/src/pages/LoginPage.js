import React, { useState, Fragment } from 'react';
import Login from '../components/auth/Login';
import LoyaltyScoreHandler from './loyalty-client-scores';
import ImageLogo from '../components/ImageLogo';
import { useStoreState, useStoreDispatch } from 'easy-peasy';

export default function LoginPage() {
    const { showLogin } = useStoreState(state => ({ //isStaff, isAdmin, isUserAuthenticated,
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        isStaff: state.userReducer.cases.currentUser.isStaff,
        isAdmin: state.userReducer.cases.currentUser.isAdmin,
        showLogin: state.componentReducer.cases.showLogin,
    }))

    const dispatch = useStoreDispatch();
    const isStaff = false;
    const isAdmin = false;
    const isUserAuthenticated = true;

    const showLoyaltyPageHandler = () => {
        if(!isAdmin && !isStaff && isUserAuthenticated) {
            return true;
        }
        return false;
    }

    const showMainContent = () => (
        <div className="mr-md-5 ml-md-4">
            {showLogin ? (
                <Fragment>
                    <div
                        className="my-4 animated slideInLeft fast ml-3 text-container text-center"
                    >
                        Identifique-se para atualizar seus <br /> pontos de fidelidade
                        <br />
                        ou
                        <br />
                        ter acesso ao gerenciamento
                    </div>
                    <div className="ml-5">
                        <Login okChecked={showLoyaltyPageHandler()} />
                    </div>
                </Fragment>
            ) : (
                <LoyaltyScoreHandler />
            )}
        </div>
    );

    return (
        <div style={{color: 'white'}} className="d-flex flex-column-reverse flex-md-row justify-content-center">
            {showMainContent()}
            <ImageLogo />
        </div>
    );
}