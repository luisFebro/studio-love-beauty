import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import StaffConf

StaffConfirmation.propTypes = {
    success: PropTypes.bool,
}

export default function StaffConfirmation({ success }) {
    return (
        success &&
        <Fragment>
            <div
                className="my-4 animated slideInLeft fast ml-3 text-container text-center"
            >
                ...
            </div>
            <div className="ml-5">
                {/*<StaffConf success={success} />*/}
            </div>
        </Fragment>
    );
}