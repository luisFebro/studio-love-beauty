import React, { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import PurchaseValue from './PurchaseValue';
import StaffConfirmation from './StaffConfirmation';
import ClientScoresPanel from './ClientScoresPanel';

export default function LoyaltyScoreHandler() {
    const { isStaff, isAdmin } = useStoreState(state => ({
        isStaff: state.userReducer.cases.currentUser.isStaff,
        isAdmin: state.userReducer.cases.currentUser.isAdmin,
    }))

    const showLayaltyHandler = (isAdmin, isStaff) => (
        (!isAdmin && !isStaff) &&
        <div>
            <PurchaseValue />
            <StaffConfirmation />
            <ClientScoresPanel />
        </div>
    );

    return (
        <div>
            {showLayaltyHandler(isAdmin, isStaff)}
        </div>
    );
}