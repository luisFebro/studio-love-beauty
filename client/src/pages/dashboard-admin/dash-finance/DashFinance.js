import React, { useState } from 'react';
import DashSectionTitle from '../../DashSectionTitle';
import AllCashLists from './cash-lists/AllCashLists';
import FinanceContentHandler from './finance-content-handler/FinanceContentHandler';

export default function DashFinance() {
    const [dashData, setDashData] = useState({
        cashInSumAll: 0,
        cashOutSumAll: 0,
    })

    return (
        <div>
            <DashSectionTitle title="Controle Financeiro" backgroundColor="linear-gradient(to right, #000000, #434343)" />
            <FinanceContentHandler dashData={dashData} />
            <AllCashLists dashData={dashData} setDashData={setDashData} />
        </div>
    );
}