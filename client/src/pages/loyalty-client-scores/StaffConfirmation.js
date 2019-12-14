import React from 'react';
import PropTypes from 'prop-types';

StaffConfirmation.propTypes = {
    success: PropTypes.bool,
}

export default function StaffConfirmation({ success }) {
    return (
        success &&
        <div>
            I am the staffconfirmation
        </div>
    );
}