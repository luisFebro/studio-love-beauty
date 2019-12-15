import React, { useState, Fragment } from 'react';
import Login from '../components/auth/Login';
import LoyaltyScoreHandler from './loyalty-client-scores';
import ImageLogo from '../components/ImageLogo';
import { useStoreState, useStoreDispatch } from 'easy-peasy';

export default function LoginPage() {
    const { showLogin, isUserAuthenticated, isStaff, isAdmin, currUser } = useStoreState(state => ({
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        currUser: state.userReducer.cases.currentUser,
        isAdmin: state.userReducer.cases.currentUser.isAdmin,
        showLogin: state.componentReducer.cases.showLogin,
    }))

    const dispatch = useStoreDispatch();

    const showLoyaltyPageHandler = () => {
        if(!isAdmin && !isStaff) { //  && isUserAuthenticated needs to includes it after fix userAlthentication
            return true;
        }
        return false;
    }

    const redirectAdmin = () => {
        if(isAdmin) return true;
        return false;
    }

    const redirectStaff = () => {
        if(isStaff) return true;
        return false;
    }

    const showMainContent = () => (
        <div className="mr-md-5 ml-md-4">
            {showLogin ? (
                <Fragment>
                    <div
                        className="my-4 ml-3 text-container text-center"
                    >
                        Identifique-se para atualizar seus pontos <br /> de fidelidade
                        <br />
                        ou
                        <br />
                        ter acesso ao gerenciamento
                    </div>
                    <div className="ml-md-5 center-small">
                        <Login
                            okClient={showLoyaltyPageHandler()}
                            okStaff={redirectStaff()}
                            okAdmin={redirectAdmin(isAdmin)}
                        />
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