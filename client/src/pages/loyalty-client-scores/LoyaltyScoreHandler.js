import React, { Fragment } from 'react';
import { useStoreState } from 'easy-peasy';
import PurchaseValue from './PurchaseValue';
import StaffConfirmation from './StaffConfirmation';
import ClientScoresPanel from './ClientScoresPanel';
import ImageLogo from '../../components/ImageLogo';

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
        <div style={{color: 'white'}} className="d-flex flex-column-reverse flex-md-row justify-content-center">
            <PurchaseValue success={showPurchaseValue} />
            <StaffConfirmation success={showStaffConfirmation} />
            <ClientScoresPanel success={showClientScoresPanel}/>
            <ImageLogo />
        </div>
    );
}