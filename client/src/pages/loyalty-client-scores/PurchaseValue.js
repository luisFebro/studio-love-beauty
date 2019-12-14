import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InsertValue from '../../components/_layout/loyaltyScores/InsertValue';

PurchaseValue.propTypes = {
    success: PropTypes.bool,
}

export default function PurchaseValue({ success }) {
    return (
        success &&
        <Fragment>
            <div
                className="my-4 animated slideInLeft fast ml-3 text-container text-center"
            >
                Insira o valor da compra da nota fiscal.
            </div>
            <div className="ml-5">
                <InsertValue success={success} />
            </div>
        </Fragment>
    );
}
