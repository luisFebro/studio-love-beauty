import React, { useState, Fragment } from 'react';
import Login from '../components/auth/Login';
import LoyaltyScoreHandler from './loyalty-client-scores';
import ImageLogo from '../components/ImageLogo';
import { useStoreState } from 'easy-peasy';

export default function LoginPage() {
    const { showLogin } = useStoreState(state => ({
        showLogin: state.componentReducer.cases.showLogin,
    }))

    const showMainContent = () => (
        <div className="mr-md-5 ml-md-4">
            {showLogin ? (
                <Fragment>
                    <div
                        className="my-4 ml-3 text-container text-center"
                    >
                        Identifique-se para atualizar
                        <br />
                        seus pontos de fidelidade
                        <br />
                        ou
                        <br />
                        ter acesso ao gerenciamento
                    </div>
                    <div className="mr-md-5 ml-md-5 center-small">
                        <Login />
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