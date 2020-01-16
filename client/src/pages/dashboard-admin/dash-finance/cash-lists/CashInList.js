import React from 'react';
import { convertDotToComma } from '../../../../utils/numbers/convertDotComma';
import LoadMoreItemsButton from '../../../../components/buttons/LoadMoreItemsButton';
import { getPeriodQuery } from '../../../../redux/actions/financeActions';
import PropTypes from 'prop-types';

CashInList.propTypes = {
    setCashInData: PropTypes.func,
    cashInData: PropTypes.object,
    isParentLoading: PropTypes.bool,
    loadingIndicator: PropTypes.node,
    queryData: PropTypes.object,
}

export default function CashInList({
    setCashInData,
    cashInData,
    queryData,
    isParentLoading,
    loadingIndicator }) {

    const { period, chosenDate } = queryData;

    const styles = {
        root: {
            margin: '15px auto',
            paddingBottom: '25px',
            width: '90%',
            maxWidth: '450px',
            height: 'auto',
            borderRadius: '10px',
            backgroundColor: '#34495e', //wet alphabet dark
            color: 'var(--mainWhite)'
        },
        panel: {
            margin: '15px auto',
            width: '85%',
            height: '100px',
            backgroundColor: '#2ecc71', //emerald green
        }
    }

    return (
        <div style={styles.root}>
            <section>
                <p
                    className="pt-4 text-main-container text-center text-em-2-0"
                >
                    ENTRADA
                </p>
                <p
                    className="py-3 px-3 text-main-container text-left"
                >
                    Total de Operações: <strong className="text-em-2">{isParentLoading ? "..." : cashInData.totalSize}</strong>
                    <br />
                    Valor Total: <strong className="text-em-2">{isParentLoading ? "..." : `R$ ${convertDotToComma(cashInData.sumAll)}`}</strong>
                </p>
            </section>
            {isParentLoading
            ? loadingIndicator
            : (
                <React.Fragment>
                    {cashInData.list.map(panel => (
                        <div key={panel._id} style={styles.panel} className="text-em-2-5">
                            <p>R$ {convertDotToComma(panel.cashInValue)}</p>
                            <p>{panel.agentName}</p>
                        </div>
                    ))}
                    <LoadMoreItemsButton
                        url={`/api/finance/cash-ops/list/${period}?skip=${"SKIP"}${getPeriodQuery(period, chosenDate)}`}
                        objPathes={{
                            strList: "data.cashInOps.list",
                            strChunkSize: "data.cashInOps.chunkSize",
                            strTotalSize: "data.cashInOps.totalSize",
                        }}
                        setData={setCashInData}
                        data={cashInData}
                        button={{
                            title: "Carregar mais Registros",
                            loadingIndicator: "Carregando mais agora...",
                            backgroundColor: '#2ecc71',
                        }}
                    />
                </React.Fragment>
            )}
        </div>
    );
}