import React from 'react';
import PropTypes from 'prop-types';
import CreatedAtBr from './CreatedAtBr';
import ModalBtn from "./modal/ModalBtn";

PanelHiddenContent.propTypes = {
    data: PropTypes.object.isRequired,
};

export default function PanelHiddenContent({ data }) {
    const {
        name,
        staffBooking,
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
                <p>Observações: {
                    staffBooking && staffBooking.notes.length === 0
                    ? "Nenhuma"
                    : staffBooking.notes
                }</p>
            </div>
            <CreatedAtBr createdAt={createdAt} />
        </div>
    );
}
