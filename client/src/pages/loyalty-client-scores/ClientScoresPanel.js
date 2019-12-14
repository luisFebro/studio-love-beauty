import React from 'react';
import PropTypes from 'prop-types';

ClientScoresPanel.propTypes = {
    success: PropTypes.bool,
}

export default function ClientScoresPanel({ success }) {
    return (
        success &&
        <div>
            I am the scorepanel
        </div>
    );
}