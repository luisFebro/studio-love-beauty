import React, { Fragment, useRef, useEffect, useState } from 'react';
import Tilt from 'react-tilt'
import RatingStars from './RatingStars';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import ImageLogo from '../../components/ImageLogo';
import Login from '../../components/auth/Login';
import { Link } from 'react-router-dom';
import LoadingThreeDots from '../../components/loadingIndicators/LoadingThreeDots';
import { convertDotToComma } from '../../utils/numbers/convertDotComma';
import animateNumber from '../../utils/numbers/animateNumber';
import getPercentage from '../../utils/numbers/getPercentage';
import ReactjsPercentageCircle from '../../components/progressIndicators/ReactjsPercentageCircle/ReactjsPercentageCircle';
import getDayGreetingBr from '../../utils/getDayGreetingBr';
import "./ellipse.css";

const maxScore = 500;
export default function ClientMobile() {
    const userScoreRef = useRef(null);
    const [showPercentage, setShowPercentage] = useState(false);
    let { isUserAuth, role, loyaltyScores, userName, isLoading } = useStoreState(state => ({
        isUserAuth: state.authReducer.cases.isUserAuthenticated,
        role: state.userReducer.cases.currentUser.role,
        userName: state.userReducer.cases.currentUser.name,
        loyaltyScores: state.userReducer.cases.currentUser.loyaltyScores,
        isLoading: state.globalReducer.cases.isLinearPLoading,
    }))


    let userScore = loyaltyScores && loyaltyScores.currentScore;

    useEffect(() => {
        if(isUserAuth && role === "cliente") {
            animateNumber(
                userScoreRef.current,
                0,
                userScore,
                3000,
                setShowPercentage
            );
        }
    }, [role, isUserAuth])

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

    const showGreeting = () => (
        <div className="position-relative">
            <div className="ellipse"></div>
            <div
                style={{position: 'absolute', top: '-5px'}}
                className="ml-2 mb-2 text-white text-shadow text-em-1-4 text-left text-default">
                {getDayGreetingBr()},<br/> <span className="text-em-1-8">{userName.cap() + "!"}</span>
            </div>
        </div>
    );

    const showScores = () => (
        <div className="my-3 text-white text-em-2-5 text-center text-default">
            Fidelidômetro:<br/>
            <div className="d-flex justify-content-center">
                <p ref={userScoreRef}>...</p>
                <p className="ml-3">Pontos</p>
            </div>
            <div className="container-center">
            </div>
            {showPercentage
            ? (
                <Fragment>
                    <Tilt
                        className="Tilt"
                        options={{ max : 90, reverse: true }}
                    >
                        <div className="container-center animated zoomIn">
                            <ReactjsPercentageCircle
                                percent={getPercentage(maxScore, userScore)}
                                color="var(--mainPink)"
                                radius={70}
                                borderWidth={10}
                                textStyle="text-pink text-em-1-2"
                            />
                        </div>
                    </Tilt>
                    {userScore > maxScore
                    ? (
                        <div>
                            <p>Parabéns!<br />Você ganhou um prêmio.</p>
                            <img className="animated bounce" style={{animationIterationCount: 20}} src="/img/icons/pink-gift-box.png" alt="presente" width={100} height="auto"/>
                        </div>
                    ) : (
                        <div>
                            <div className="position-relative mt-4">
                                <img style={{opacity: '.5'}} className="animated bounce" src="/img/icons/pink-gift-box.png" alt="presente" width={100} height="auto"/>
                                <p className="text-em-2" style={{position: 'absolute', top: '10px', left: '48%'}}>?</p>
                            </div>
                        </div>
                    )}
                </Fragment>
            ) : null}
        </div>
    );

    const showRules = () => (
        <Link to="/regulamento">
            <div
                className="text-container font-weight-italic text-center"
                style={{color: "var(--mainPink)", cursor: "pointer"}}
            >
                Consulte<br />as Regras Aqui
            </div>
        </Link>
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
                    <br/>
                    <br/>
                    {showGreeting()}
                    {showScores()}
                    <div className="mb-4">
                        <RatingStars score={userScore} />
                    </div>
                    <div className="mb-4">
                        {showRules()}
                    </div>
                </Fragment>
            ) : showLogin()}
        </div>
    );
}

/*
ORIGINAL TO BE PUT WHEN INTERNET IS OKAY:
 */

/*
<div className="my-3 container-center">
    <img src="/img/official-logo.jpg" alt="logo" width={300} height="auto"/>
</div>
 */