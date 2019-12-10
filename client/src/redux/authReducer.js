import { reducer } from 'easy-peasy';
// actions are used with the usestoredispatch hook inside the wanting functional component
// copy and paste the type of actions below
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.

// REDUCERS
const initialState = {
    token: localStorage.getItem('token'), // n1
    isUserAuthenticated: false,
};

export const authReducer = {
    cases: reducer((state = initialState, action) => {
        switch(action.type) {
            case 'AUTHENTICATE_USER_ONLY':
                return {
                    ...state,
                    isUserAuthenticated: true,
                };
            case 'LOGIN_EMAIL':
            case 'REGISTER_EMAIL':
                localStorage.setItem('token', action.payload);
                return {
                    ...state,
                    isUserAuthenticated: true,
                };
            case 'LOGIN_GOOGLE':
            case 'LOGIN_FACEBOOK':
                localStorage.setItem('token', action.payload);
                return {
                    ...state,
                    isUserAuthenticated: true,
                };
            case 'LOGIN_ERROR':
            case 'REGISTER_ERROR':
            case 'LOGOUT_SUCCESS':
                localStorage.removeItem('token');
                return {
                    ...state,
                    isUserAuthenticated: false,
                    token: null,
                };
            default:
                return state;
        }
    })
};

/* COMMENTS
n1: localStorage.getItem('token') is null when user authenticates, and only when the user reloads it gets the token stored by setItem.
*/
