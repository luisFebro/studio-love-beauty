import React from 'react';
import PropTypes from 'prop-types';
import TitleContainer from '../../../../components/TitleContainer';
import SideButton from '../../../../components/buttons/SideButton';

NewIncome.propTypes = {
    setCurrComponent: PropTypes.func,
    currComponent: PropTypes.string,
}

export default function NewIncome({ setCurrComponent, currComponent }) {
    const styles = {
        root: {
            width: '100%',
        },
        mainContent: {
            display: 'flex',
            flexBasis: '90%',
            minHeight: '500px' //temp
        }
    }

    return (
        currComponent === "NewIncome" &&
        <div id="nova-entrada" style={styles.root}>
            <TitleContainer
                title="NOVA ENTRADA"
            />
           <div className="my-5 animated slideInLeft d-flex">
               <div style={styles.mainContent}>
                   I am the new income.
               </div>
               <SideButton
                    onClick={() => setCurrComponent("FinanceGraph")}
                />
           </div>
        </div>
    );
}