import { reducer } from 'easy-peasy';

// REDUCERS
const initialState = {
    showLogin: false,
    showPurchaseValue: false,
    showStaffConfirmation: false,
    showClientScoresPanel: true,
};

export const componentReducer = {
    cases: reducer((state = initialState, action) => {
        switch(action.type) {
            // SHOW
            case 'LOGIN_DISPLAYED':
                return {
                    ...state,
                    showLogin: true,
                };
            case 'PURCHASE_VALUE_DISPLAYED':
                return {
                    ...state,
                    showPurchaseValue: true,
                };
            case 'STAFF_CONFIRMATION_DISPLAYED':
                return {
                    ...state,
                    showStaffConfirmation: true,
                };
            case 'CLIENT_SCORES_PANEL_DISPLAYED':
                return {
                    ...state,
                    showClientScoresPanel: true,
                };

            // HIDE
            case 'LOGIN_HIDDEN':
                return {
                    ...state,
                    showLogin: false,
                };
            case 'PURCHASE_VALUE_HIDDEN':
                return {
                    ...state,
                    showPurchaseValue: false,
                };
            case 'STAFF_CONFIRMATION_HIDDEN':
                return {
                    ...state,
                    showStaffConfirmation: false,
                };
            case 'CLIENT_SCORES_PANEL_HIDDEN':
                return {
                    ...state,
                    showClientScoresPanel: false,
                };
            case 'ALL_COMPONENTS_CLEARED':
                let key;
                for(key in state) {
                    state[key] = false;
                }
                return {
                    ...state,
                };
            default:
                return state;
        }
    })
};

