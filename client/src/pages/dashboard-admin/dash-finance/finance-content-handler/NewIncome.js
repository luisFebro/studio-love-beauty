import React from 'react';
import PropTypes from 'prop-types';

NewIncome.propTypes = {
    setCurrComponent: PropTypes.func,
    currComponent: PropTypes.string,
}

export default function NewIncome({ setCurrComponent, currComponent }) {
    return (
        currComponent === "NewIncome" &&
        <div id="new-income" className="animated slideInLeft">
            I am the new income.
            <button onClick={() => setCurrComponent("FinanceGraph")}>Voltar</button>
        </div>
    );
}