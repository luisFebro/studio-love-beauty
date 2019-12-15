import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import HomeButton from '../../components/buttons/HomeButton';
import { updateUser } from "../../redux/actions/userActions";
import { showSnackbar } from "../../redux/actions/snackbarActions";
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
    const [showTotalPoints, setShowTotalPoints] = useState(false);
    const animatedNumber = useRef(null);

    const { name, userId, loyaltyScores } = useStoreState(state => ({
        loyaltyScores: state.userReducer.cases.currentUser.loyaltyScores,
        name: state.userReducer.cases.currentUser.name,
        userId: state.userReducer.cases.currentUser._id,
    }))

    const dispatch = useStoreDispatch();

    let lastScore = loyaltyScores && loyaltyScores.currentScore;
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

    useEffect(() => {
        if(success && verification) {
            animateNumber(
                animatedNumber.current,
                0,
                cashCurrentScore,
                3000,
                setShowTotalPoints
            );

            const objToSend = {
                "loyaltyScores.cashCurrentScore": cashCurrentScore,
                "loyaltyScores.currentScore": currentScore.toString()
            }
            updateUser(dispatch, objToSend, userId)
            .then(res => {
                if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
                showSnackbar(dispatch, "Opa, sua pontuação foi realizada com sucesso!", 'success', 8000);
            })
        }
    }, [success, verification])

    return (
        success &&
        <div className="mr-md-5 ml-md-4 mt-5 animated slideInLeft fast">
            <div style={{minWidth: 300}} className="mx-2">
                <span className="text-main-container">{name},</span>
                <TitleComponent>
                   Veja aqui seus Pontos
                </TitleComponent>
                <div
                    className="text-weight-bold text-center text-main-container mt-3 m-1 p-3"
                    style={{ color: "var(--mainPink)", backgroundColor: "var(--mainDark)" }}
                >
                    <p>Pontuação Anterior:<br />{convertDotToComma(lastScore)}</p>
                    <p>
                        <span>Você Ganhou: </span>
                        <span ref={animatedNumber}>...</span>
                        <span style={{color: "white"}}>{!Number.isInteger(cashCurrentScore) && showTotalPoints ? "*" : null}</span>
                    </p>
                    <div
                        className="animated bounce slow"
                        style={{
                            display: showTotalPoints ? "block" : "none",
                            animationIterationCount: 4
                        }}
                    >
                        <p>Pontuação Atual:<br />{convertDotToComma(currentScore)}</p>
                        <p className="text-center text-default">Volte sempre!</p>
                        <br/>
                        <br/>
                    </div>
                </div>
                <p style={{fontSize: "18px"}}>{!Number.isInteger(cashCurrentScore) && showTotalPoints ? "*Valor Decimal Arredondado." : null}</p>
                <HomeButton hideComp="clientScoresPanel" />
            </div>
        </div>
    );
}