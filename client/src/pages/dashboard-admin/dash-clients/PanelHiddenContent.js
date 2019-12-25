import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreatedAtBr from '../CreatedAtBr';
import ModalBtn from "./modal/ModalBtn";

PanelHiddenContent.propTypes = {
    data: PropTypes.object.isRequired,
};

export default function PanelHiddenContent({ data }) {
    const [selectedValue, setSelectedValue] = useState(0);
    const {
        _id,
        name,
        cpf,
        loyaltyScores,
        phone,
        maritalStatus,
        birthday,
        email,
        createdAt,
    } = data;

    const styles = {
        pointsContainer: {
            position: 'relative'
        }
    }

    const showDiscountPointsBtn = () => (
        <ModalBtn
            setSelectedValue={setSelectedValue}
            modal={{
                mainSubject: "Desconto",
                title: `Descontar Pontos Fidelidades<br />cliente: ${name}`,
                userCurrentScores: loyaltyScores.currentScore,
                subTitle: "digite apenas números e vírgulas",
                labelTxtField: "Insira aqui <br /> qtde. pontos a retirar",
                txtBtn: "Descontar",
                iconBtn: "fas fa-minus-circle"
            }}
            button={{
                title: "Descontar",
                iconFontAwesome: "fas fa-minus-circle",
                variant: "extended",
                top: 240,
                left: 215,
                backgroundColor: 'grey',
            }}
        />
    )

    const displayLoyaltyScores = () => {
        const gotThousandPoints = loyaltyScores && parseInt(loyaltyScores.currentScore) >= 1000;

        return (
            <div style={{backgroundColor: gotThousandPoints ? "var(--mainGreen)" : "var(--mainPink)"}}>
                <p>Pontos Fidelidade:</p>
                {["0", undefined].includes(loyaltyScores && loyaltyScores.currentScore)
                ? <p className="text-center">Pontuação não registrada.</p>
                : (
                    <div className={styles.pointsContainer}>
                        {gotThousandPoints
                        ? (<div
                            style={{backgroundColor: ''}}
                            className="text-main-container text-center font-weight-bold"
                          >
                            Este cliente alcançou 1000 pontos de fidelidade!<br />Pontos excedentes: {parseInt(loyaltyScores.currentScore) - 1000}
                          </div>)
                        : (<div
                            className="text-center font-weight-bold"
                          >
                            Acumulado: {loyaltyScores && loyaltyScores.currentScore}
                          </div>)}

                        <div className="d-flex justify-content-center">
                            <div className="mr-4">Valor Anterior: {loyaltyScores && loyaltyScores.lastScore}</div>
                            <div>Última Pontuação: {loyaltyScores && loyaltyScores.cashCurrentScore}</div>
                        </div>
                        {showDiscountPointsBtn()}
                    </div>
                )}
                <CreatedAtBr createdAt={createdAt} />
            </div>
        );
    }

    return (
        <div
            className="text-default enabledLink"
            style={{userSelect: 'text', margin: 'auto', width: '90%'}}
        >
            <div>
                <p>CPF: {cpf}</p>
            </div>
            <div>
                <p>Email: {email}</p>
            </div>
            <div>
                <p>Contato: {phone}</p>
            </div>
            <div>
                <p>Aniversário: {birthday}</p>
            </div>
            <div>
                <p>Estado Civil: {maritalStatus}</p>
            </div>
            <div>
                <p>ID Sistema: {_id}</p>
            </div>
            {displayLoyaltyScores()}
        </div>
    );
}
