import React from 'react';
import PropTypes from 'prop-types';
import TitleContainer from '../../../../components/TitleContainer';
import SideButton from '../../../../components/buttons/SideButton';

NewExpense.propTypes = {
    setCurrComponent: PropTypes.func,
    currComponent: PropTypes.string,
}


export default function NewExpense({ setCurrComponent, currComponent }) {
    const styles = {
        root: {
            width: '100%'
        },
        mainContent: {
            display: 'flex',
            flexBasis: '90%',
            minHeight: '500px' //temp
        }
    }

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
                <div style={styles.mainContent}>
                    I am the new Expense.
                </div>
            </div>
        </div>
    );
}