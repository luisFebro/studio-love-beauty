import React, { useState } from 'react';
import DashSectionTitle from '../../DashSectionTitle';
import AllCashLists from './cash-lists/AllCashLists';
import FinanceContentHandler from './finance-content-handler/FinanceContentHandler';
import FilterAndButtons from './FilterAndButtons';

export default function DashFinance() {
    const [dashData, setDashData] = useState({
        cashInSumAll: 0,
        cashOutSumAll: 0,
        period: 'dayMonth',
    })

    return (
        <div>
            <DashSectionTitle title="Controle Financeiro" backgroundColor="linear-gradient(to right, #000000, #434343)" />
            <FilterAndButtons />
            <FinanceContentHandler dashData={dashData} />
            <AllCashLists dashData={dashData} setDashData={setDashData} />
        </div>
    );
}