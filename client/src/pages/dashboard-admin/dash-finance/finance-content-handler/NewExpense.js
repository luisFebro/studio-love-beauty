import React from 'react';
import PropTypes from 'prop-types';
import TitleContainer from '../../../../components/TitleContainer';
import SideButton from '../../../../components/buttons/SideButton';
import BalanceForm from './BalanceForm';

NewIncome.propTypes = {
    setCurrComponent: PropTypes.func,
    currComponent: PropTypes.string,
}

export default function NewIncome({
    setCurrComponent,
    currComponent,
    setRun,
    run }) {
    const styles = {
        root: {
            width: '100%',
        },
        mainContent: {
            display: 'flex',
            flexBasis: '90%',
            justifyContent: 'center',
            minHeight: 'auto' //temp
        },
    }

    const showMainContent = () => (
        <div style={styles.mainContent}>
            <BalanceForm
                setRun={setRun}
                run={run}
                setCurrComponent={setCurrComponent}
                isExpenseForm={true}
            />
        </div>
    );

    return (
        currComponent === "NewExpense" &&
        <div id="nova-saida" style={styles.root}>
            <TitleContainer
                title="NOVA SAÍDA"
            />
           <div className="my-5 animated slideInRight d-flex">
               <SideButton
                    onClick={() => setCurrComponent("FinanceGraph")}
                    fontAwesomeIcon="fas fa-angle-left"
                />
                {showMainContent()}
           </div>
        </div>
    );
}