import React from 'react';
import { convertDotToComma } from '../../../../utils/numbers/convertDotComma';
import LoadMoreItemsButton from '../../../../components/buttons/LoadMoreItemsButton';
import { getPeriodQuery } from '../../../../redux/actions/financeActions';
import PropTypes from 'prop-types';

CashOutList.propTypes = {
    setCashInData: PropTypes.func,
    cashOutData: PropTypes.object,
    isParentLoading: PropTypes.bool,
    loadingIndicator: PropTypes.node,
    queryData: PropTypes.object,
}

export default function CashOutList({
    setCashOutData,
    cashOutData,
    isParentLoading,
    loadingIndicator,
    queryData,
}) {

    const { period, chosenDate } = queryData;

    const styles = {
        root: {
            margin: '15px auto',
            paddingBottom: '25px',
            width: '90%',
            maxWidth: '450px',
            minHeight: 'auto',
            borderRadius: '10px',
            backgroundColor: '#34495e',
            color: 'var(--mainWhite)'
        },
        panel: {
            margin: '15px auto',
            width: '85%',
            height: '100px',
            backgroundColor: '#ff4757', //watermelon red
        }
    }

    return (
        <div style={styles.root}>
            <section>
                <p
                    className="pt-4 text-main-container text-center text-em-2-0"
                >
                    SAÍDA
                </p>
                <p
                    className="py-3 px-3 text-main-container text-left"
                >
                    Total de Operações: <strong className="text-em-2">{isParentLoading ? "..." : cashOutData.totalSize}</strong>
                    <br />
                    Valor Total: <strong className="text-em-2">{isParentLoading ? "..." : `R$ ${convertDotToComma(cashOutData.sumAll)}`}</strong>
                </p>
            </section>
            {isParentLoading
            ? loadingIndicator
            : (
                <React.Fragment>
                    {cashOutData.list.map(panel => (
                        <div key={panel._id} style={styles.panel} className="text-em-2-5">
                            <p>R$ {convertDotToComma(panel.cashOutValue)}</p>
                            <p>{panel.agentName}</p>
                        </div>
                    ))}
                    <LoadMoreItemsButton
                        url={`/api/finance/cash-ops/list/${period}?skip=${"SKIP"}${getPeriodQuery(period, chosenDate)}`}
                        objPathes={{
                            strList: "data.cashOutOps.list",
                            strChunkSize: "data.cashOutOps.chunkSize",
                            strTotalSize: "data.cashOutOps.totalSize",
                        }}
                        setData={setCashOutData}
                        data={cashOutData}
                        button={{
                            title: "Carregar mais Registros",
                            loadingIndicator: "Carregando mais agora...",
                            backgroundColor: '#ff4757',
                        }}
                    />
                </React.Fragment>
            )}
        </div>
    );
}