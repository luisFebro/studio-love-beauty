import { reducer } from 'easy-peasy';
import updateKey from './helpers/updateKey';

// REDUCERS
const initialState = {
    businessInfo: {},
};

export const adminReducer = {
    cases: reducer((state = initialState, action) => {
        switch (action.type) {
            case 'LOAD_ADMIN':
                return {
                    ...state,
                    businessInfo: action.payload.businessInfo
                }
            case 'UPDATE_BIZ_INFO':
                const obj = state.businessInfo;
                const objWithValueToUpdate = action.payload;
                updateKey(obj, objWithValueToUpdate);
                return {
                    ...state,
                }
            default:
                return state;
        }
    })
};
