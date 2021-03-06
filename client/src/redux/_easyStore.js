// Models
import { modalReducers } from './modalReducers';
import { productReducer } from './productReducer';
import { snackbarReducer } from './snackbarReducer';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { globalReducer } from './globalReducer';
import { animationReducer } from './animationReducer';
import { adminReducer } from './adminReducer';
import { staffBookingReducer } from './staffBookingReducer';
import { componentReducer } from './componentReducer';

//Main store
export const easyStore = {
    authReducer,
    userReducer,
    productReducer,
    modalReducers,
    snackbarReducer,
    globalReducer,
    animationReducer,
    adminReducer,
    componentReducer,
    staffBookingReducer,
};
