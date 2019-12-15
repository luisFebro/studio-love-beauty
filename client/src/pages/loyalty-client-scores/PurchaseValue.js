import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InsertValue from '../../components/loyaltyScores/InsertValue';

PurchaseValue.propTypes = {
    success: PropTypes.bool,
    setValuePaid: PropTypes.func,
}

export default function PurchaseValue({ success, setValuePaid }) {
    return (
        success &&
        <div className="mr-md-5 ml-md-4">
            <Fragment>
                <div
                    className="my-4 animated slideInLeft fast ml-3 text-container text-center"
                >
                    Insira o valor da compra da nota fiscal.
                </div>
                <div className="ml-md-5 center-small">
                    <InsertValue success={success} setValuePaid={setValuePaid} />
                </div>
            </Fragment>
        </div>
    );
}
