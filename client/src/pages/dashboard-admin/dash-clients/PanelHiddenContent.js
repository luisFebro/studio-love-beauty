import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CreatedAtBr from '../CreatedAtBr';

PanelHiddenContent.propTypes = {
    data: PropTypes.object.isRequired,
};

export default function PanelHiddenContent({ data }) {
    const {
        _id,
        cpf,
        loyaltyScores,
        phone,
        maritalStatus,
        birthday,
        email,
        createdAt,
    } = data;

    const displayLoyaltyScores = () => {
        const gotThousantPoints = loyaltyScores && parseInt(loyaltyScores.currentScore) >= 1000;

        return (
            <div style={{backgroundColor: gotThousantPoints ? "var(--mainGreen)" : "var(--mainPink)"}}>
                <p>Pontos Fidelidade:</p>
                {["0", undefined].includes(loyaltyScores && loyaltyScores.currentScore)
                ? <p className="text-center">Pontuação não registrada.</p>
                : (
                    <Fragment>
                        {gotThousantPoints
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
                    </Fragment>
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
