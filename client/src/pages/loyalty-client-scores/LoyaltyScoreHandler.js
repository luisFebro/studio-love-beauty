import React, { Fragment } from 'react';
import { useStoreState } from 'easy-peasy';
import PurchaseValue from './PurchaseValue';
import StaffConfirmation from './StaffConfirmation';
import ClientScoresPanel from './ClientScoresPanel';

export default function LoyaltyScoreHandler() {
    const {
        showPurchaseValue,
        showStaffConfirmation,
        showClientScoresPanel
    } = useStoreState(state => ({
        showPurchaseValue: state.componentReducer.cases.showPurchaseValue,
        showStaffConfirmation: state.componentReducer.cases.showStaffConfirmation,
        showClientScoresPanel: state.componentReducer.cases.showClientScoresPanel,
    }))

    return (
        <Fragment>
            <PurchaseValue success={showPurchaseValue} />
            <StaffConfirmation success={showStaffConfirmation} />
            <ClientScoresPanel success={showClientScoresPanel}/>
        </Fragment>
    );
}