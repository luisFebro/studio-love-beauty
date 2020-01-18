import React, { useState } from 'react';
import FinanceGraph from './FinanceGraph';
import NewExpense from './NewExpense';
import NewIncome from './NewIncome';
import FilterAndButtons from './FilterAndButtons';
import AllCashLists from '../cash-lists/AllCashLists';

export default function FinanceContentHandler({
    setDashData,
    dashData
    }) {
    const [currComponent, setCurrComponent] = useState("FinanceGraph");
    const [handlerRun, setHandlerRun] = useState(false);

    return (
        <div>
            <FilterAndButtons
                setCurrComponent={setCurrComponent}
            />
            <div className="container-center">
                <NewIncome
                    setRun={setHandlerRun}
                    run={handlerRun}
                    setCurrComponent={setCurrComponent}
                    currComponent={currComponent}
                />
                <FinanceGraph
                    dashData={dashData}
                    currComponent={currComponent}
                />
                <NewExpense
                    setRun={setHandlerRun}
                    run={handlerRun}
                    setCurrComponent={setCurrComponent}
                    currComponent={currComponent}
                />
            </div>
            <AllCashLists
                dashData={dashData}
                setDashData={setDashData}
                currComponent={currComponent}
                handlerRun={handlerRun}
            />
        </div>
    );
}