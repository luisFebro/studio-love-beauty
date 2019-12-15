import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useStoreState } from 'easy-peasy';
import TitleComponent from '../../components/TitleComponent';
import animateNumber from '../../utils/numbers/animateNumber';
import { convertDotToComma, convertCommaToDot } from '../../utils/numbers/convertDotComma';
import isInteger from '../../utils/numbers/isInteger';


ClientScoresPanel.propTypes = {
    success: PropTypes.bool,
    verification: PropTypes.bool,
    valuePaid: PropTypes.string
}

export default function ClientScoresPanel({ success, valuePaid, verification }) {
    console.log([valuePaid, verification]);
    const [showTotalPoints, setShowTotalPoints] = useState(false);
    const animatedNumber = useRef(null);

    const { name } = useStoreState(state => ({
        name: state.userReducer.cases.currentUser.name,
    }))

    useEffect(() => {
        if(success && verification) {
            animateNumber(
                animatedNumber.current,
                0,
                cashCurrentScore,
                3000,
                setShowTotalPoints
            );
        }
    }, [success, verification])

    const { loyaltyScores } = useStoreState(state => ({
        loyaltyScores: state.userReducer.cases.loyaltyScores,
    }))

    let lastScore = "100.2"; // loyaltyScores && loyaltyScores.lastScore;
    let cashCurrentScore = convertCommaToDot(valuePaid);
    lastScore =
    isInteger(lastScore)
    ? parseInt(lastScore)
    : parseFloat(lastScore).toFixed(1);

    cashCurrentScore =
    isInteger(cashCurrentScore)
    ? parseInt(cashCurrentScore)
    : parseFloat(cashCurrentScore).toFixed(1);

    const currentScore = (parseFloat(lastScore) + parseFloat(cashCurrentScore)).toFixed(1);

    return (
        success &&
        <div className="mr-md-5 ml-md-4 mt-5 animated slideInLeft fast">
            <div>
                <span className="text-main-container">{name},</span>
                <TitleComponent>
                   Veja aqui seus Pontos
                </TitleComponent>
                <div
                    className="text-weight-bold text-center text-main-container mt-3 m-1 p-3"
                    style={{ color: "var(--mainPink)", backgroundColor: "var(--mainDark)" }}
                >
                    <p>Pontuação Anterior: {convertDotToComma(lastScore)}</p>
                    <p>
                        <span>Você Ganhou: </span>
                        <span ref={animatedNumber}>...</span>
                        <span style={{color: "white"}}>{showTotalPoints ? "*" : null}</span>
                    </p>
                    <div
                        className="animated bounce slow"
                        style={{
                            display: showTotalPoints ? "block" : "none",
                            animationIterationCount: 4
                        }}
                    >
                        <p>Pontuação Atual: {convertDotToComma(currentScore)}</p>
                        <p className="text-center text-default">Volte sempre!</p>
                        <br/>
                        <br/>
                    </div>
                </div>
                <p style={{fontSize: "18px"}}>{showTotalPoints ? "*Valores arredondados se decimal" : null}</p>
            </div>
        </div>
    );
}