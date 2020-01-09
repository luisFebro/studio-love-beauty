import React from 'react';
import PropTypes from 'prop-types';
import CreatedAtBr from '../CreatedAtBr';
// import ModalBtn from "./modal/ModalBtn";

PanelHiddenContent.propTypes = {
    data: PropTypes.object.isRequired,
};

export default function PanelHiddenContent({ data }) {
    const {
        service,
        notes,
        createdAt,
    } = data;

    const styles = {
        pointsContainer: {
            position: 'relative'
        }
    }

    return (
        <div
            className="text-default enabledLink"
            style={{userSelect: 'text', margin: 'auto', width: '90%'}}
        >
            <div>
                <p>Serviço: {null}</p>
            </div>
            <div>
                <p>Observações: {null}</p>
            </div>
            <CreatedAtBr createdAt={createdAt} />
        </div>
    );
}
