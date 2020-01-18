import React, { useState } from 'react';
import FinanceGraph from './FinanceGraph';
import NewExpense from './NewExpense';
import NewIncome from './NewIncome';
import FilterAndButtons from './FilterAndButtons';

export default function FinanceContentHandler({ dashData }) {
    const [currComponent, setCurrComponent] = useState("FinanceGraph");

    return (
        <div>
            <FilterAndButtons
                setCurrComponent={setCurrComponent}
            />
            <div className="container-center">
                <NewIncome
                    setCurrComponent={setCurrComponent}
                    currComponent={currComponent}
                />
                <FinanceGraph
                    dashData={dashData}
                    currComponent={currComponent}
                />
                <NewExpense
                    setCurrComponent={setCurrComponent}
                    currComponent={currComponent}
                />
            </div>
        </div>
    );
}