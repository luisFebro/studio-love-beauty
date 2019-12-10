import { reducer } from 'easy-peasy';
// About: Reusable with many components, especially for true-false states
//Reducer Naming Structure: type: MAIN/SUBJECT + PARTICIPLE VERB eg. USER_CLEARED

// REDUCERS
const initialState = {
    isLoading: false,
    isLinearPLoading: false,
    errorMsg: null,
    currentItemFound: null
};

export const globalReducer = {
    cases: reducer((state = initialState, action) => {
        switch (action.type) {
            // Objs
            case 'CURRENT_ITEM_FOUND':
                return {
                    ...state,
                    currentItemFound: action.payload
                };
            //Show
            case 'SHOW_LOADING':
                return {
                    ...state,
                    isLoading: true
                };
            case 'SHOW_ERROR':
                return {
                    ...state,
                    errorMsg: action.payload
                };
            case 'TOGGLE_LOADING_PROGRESS':
                return {
                    ...state,
                    isLinearPLoading: action.payload
                }
            //Clear
            case 'CLEAR_LOADING':
                return {
                    ...state,
                    isLoading: false
                };
            case 'CLEAR_ERROR':
                return {
                    ...state,
                    errorMsg: ''
                };
            default:
                return state;
        }
    })
};
