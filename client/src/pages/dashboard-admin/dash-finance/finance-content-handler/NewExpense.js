import React from 'react';
import PropTypes from 'prop-types';

NewExpense.propTypes = {
    setCurrComponent: PropTypes.func,
    currComponent: PropTypes.string,
}

export default function NewExpense({ setCurrComponent, currComponent }) {
    return (
        currComponent === "NewExpense" &&
        <div id="new-expense" className="animated slideInRight">
            I am the new Expense.
            <button onClick={() => setCurrComponent("FinanceGraph")}>Voltar</button>
        </div>
    );
}