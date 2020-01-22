import { reducer } from 'easy-peasy';
// actions are used with the usestoredispatch hook inside the wanting functional component
// copy and paste the type of actions below
// You can use only one isntance of object like 'cases' for each object.
// Check for mispellings in case of one action not being dispatched properly.

// REDUCERS
const initialState = {
    token: localStorage.getItem('token'), // n1 n3
    tokenWhenLogin: '', // n2
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
                    tokenWhenLogin: action.payload,
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
                    tokenWhenLogin: '',
                    token: null,
                };
            default:
                return state;
        }
    })
};

/* COMMENTS
n1: localStorage.getItem('token') is null when user authenticates, and only when the user reloads it gets the token stored by setItem.
n2: this is for an immeditate avsalability of token to send request from frontend in the first access. Otherwise, user will need to restart the page to have the token in the localstorage.
n3: for security reasons, it is recommended to use sessionStorage. sessionStorage object is available only to that window/tab until the window is closed.
https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage
*/
