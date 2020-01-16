import React from 'react';
import FinanceGraph from './FinanceGraph';
import NewExpense from './NewExpense';
import NewIncome from './NewIncome';

export default function FinanceContentHandler({ dashData }) {
    return (
        <div className="container-center">
            <NewIncome />
            <FinanceGraph dashData={dashData} />
            <NewExpense />
        </div>
    );
}