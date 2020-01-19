import React, { useState, useEffect } from 'react';
import CashOutList from './CashOutList';
import CashInList from './CashInList';
import TitleContainer from '../../../../components/TitleContainer';
import { useStoreDispatch, useStoreState } from 'easy-peasy';
import { getCashOpsList } from '../../../../redux/actions/financeActions';
import { showSnackbar } from '../../../../redux/actions/snackbarActions';
import LoadingThreeDots from '../../../../components/loadingIndicators/LoadingThreeDots';
import PropTypes from 'prop-types';

AllCashLists.propTypes = {
    setDashData: PropTypes.func,
    dashData: PropTypes.object,
    currComponent: PropTypes.string,
}

export default function AllCashLists({
    setDashData,
    handlerRun,
    dashData,
    currComponent }) {
    const [run, setRun] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [cashInData, setCashInData] = useState({
        sumAll: "...",
        list: [],
        sumAll: 0,
        chunkSize: 0,
        totalSize: 0,
    })

    const [cashOutData, setCashOutData] = useState({
        sumAll: "...",
        list: [],
        sumAll: 0,
        chunkSize: 0,
        totalSize: 0,
    })

    const [queryData, setQueryData] = useState({
        period: "all",
        initialSkip: 0,
        chosenDate: "",
    })
    const { period, initialSkip, chosenDate } = queryData;

    const dispatch = useStoreDispatch();

    const { isCustomLoading } = useStoreState(state => ({
        isCustomLoading: state.globalReducer.cases.isCustomLoading,
    }))

    useEffect(() => {
        setDashData({
            ...dashData,
            cashInSumAll: cashInData.sumAll,
            cashOutSumAll: cashOutData.sumAll,
        })
    }, [cashInData.sumAll, cashOutData.sumAll])

    useEffect(() => {
        getCashOpsList(dispatch, period, initialSkip, chosenDate)
        .then(res => {
            if(res.status !== 200) return showSnackbar(dispatch, res.data.msg, 'error')
            const { cashInOps, cashOutOps } = res.data;
            setCashInData({
                ...cashInData,
                list: cashInOps.list,
                sumAll: cashInOps.sumAll,
                chunkSize: cashInOps.chunkSize,
                totalSize: cashInOps.totalSize,
            })
            setCashOutData({
                ...cashOutData,
                list: cashOutOps.list,
                sumAll: cashOutOps.sumAll,
                chunkSize: cashOutOps.chunkSize,
                totalSize: cashOutOps.totalSize,
            })
        })
    }, [run, handlerRun])

    return (
        currComponent === 'FinanceGraph' &&
        <section>
            <TitleContainer
                title="HISTÓRICO"
            />
            <div style={{color: '#f7f1e3'}} className="text-shadow d-flex flex-column flex-md-row justify-content-between">
                <CashInList
                    setRun={setRun}
                    run={run}
                    cashInData={cashInData}
                    setCashInData={setCashInData}
                    isParentLoading={isCustomLoading}
                    queryData={queryData}
                    loadingIndicator={<LoadingThreeDots color="var(--mainWhite)" />}
                />
                <CashOutList
                    setRun={setRun}
                    run={run}
                    cashOutData={cashOutData}
                    setCashOutData={setCashOutData}
                    isParentLoading={isCustomLoading}
                    queryData={queryData}
                    loadingIndicator={<LoadingThreeDots color="var(--mainWhite)"/>}
                />
            </div>
        </section>
    );
}

