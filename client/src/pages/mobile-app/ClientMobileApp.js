import React, { Fragment } from 'react';
import RatingStars from './RatingStars';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import ImageLogo from '../../components/ImageLogo';
import Login from '../../components/auth/Login';
import LoadingThreeDots from '../../components/loadingIndicators/LoadingThreeDots';
import { convertDotToComma } from '../../utils/numbers/convertDotComma';

export default function ClientMobile() {
    const { isUserAuth, role, loyaltyScores, userName, isLoading } = useStoreState(state => ({
        isUserAuth: state.authReducer.cases.isUserAuthenticated,
        role: state.userReducer.cases.currentUser.role,
        userName: state.userReducer.cases.currentUser.name,
        loyaltyScores: state.userReducer.cases.currentUser.loyaltyScores,
        isLoading: state.globalReducer.cases.isLinearPLoading,
    }))

    const userScore = loyaltyScores && loyaltyScores.currentScore;

    const showLogin = () => (
        <div className="my-5">
            <div className="mb-3 text-white text-em-2-5 text-center text-default">
                Faça seu acesso.
            </div>
            <div className="margin-auto-60">
                <Login />
            </div>
        </div>
    );

    return (
        <div>
            <div className="margin-auto-90">
                <ImageLogo />
            </div>
            {isLoading
            ? <LoadingThreeDots color="white" />
            : isUserAuth && role === "cliente"
            ? (
                <Fragment>
                    <div className="mb-2 text-white text-em-1-8 text-left text-default">Boa noite, {userName.cap()}!</div>
                    <div className="my-3 text-white text-em-2-5 text-center text-default">
                        Você tem agora:<br/>
                        <p className="text-em-4 my-3">{convertDotToComma(userScore)} Pontos</p>
                    </div>
                    <div>
                        <RatingStars score={userScore} />
                    </div>
                </Fragment>
            ) : showLogin()}
        </div>
    );
}