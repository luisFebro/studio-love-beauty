import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';
import { getBodyRequest } from '../../utils/server/getBodyRequest';
import { setLoadingProgress } from './globalActions';
// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue


export const readAdmin = async dispatch => {
    try {
        // setLoadingOn(dispatch);
        const res = await axios.get('/api/admin', configTypeJson);
        console.log('==ADMIN DATA LOADED==');
        dispatch({
            type: 'LOAD_ADMIN',
            payload: res.data
        });
        // setLoadingOff(dispatch);
    } catch (err) {
        return err.response;
    }
}

export const updateBusinessInfo = async (dispatch, objToUpdate) => {
    try {
        const res = await axios.put(`/api/admin/business-info/update`, objToUpdate, configTypeJson);
        dispatch({ type: 'UPDATE_BIZ_INFO', payload: objToUpdate });
        return res;
    } catch (err) {
        return err.response;
    }
};

export const checkVerificationPass = async (dispatch, objToSend) => { // L
    setLoadingProgress(dispatch, true);
    try {
        const res = await axios.post(`/api/admin/verification-pass`, objToSend, configTypeJson);
        setLoadingProgress(dispatch, false);
        return res;
    } catch (err) {
        setLoadingProgress(dispatch, false);
        return err.response;
    }
};

/* COMMENTS
n1: LESSON: never use GET METHOD if you want to send an object to backend, even in the case if it is working on Postman.
*/