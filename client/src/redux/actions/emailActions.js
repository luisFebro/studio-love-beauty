// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';
import { setLoadingProgress } from './globalActions';

export const sendWelcomeConfirmEmail = async (bodyEmail, userId) => {
    try {
        return await axios.post(`/api/email/client/welcome-and-confirm/${userId}`, bodyEmail, configTypeJson);
    } catch (err) {
        return err.response;
    }
};

export const sendBuyRequestEmail = async (dispatch, bodyEmail) => {
    setLoadingProgress(dispatch, true);
    try {
        const res = await axios.post('/api/email/admin/order-request', bodyEmail, configTypeJson);
        setLoadingProgress(dispatch, false);
        return res;
    } catch (err) {
        setLoadingProgress(dispatch, false);
        return err.response;
    }
};

export const sendNewPasswordLink = async (dispatch, bodyEmail) => {
    setLoadingProgress(dispatch, true);
    try {
        const res = await axios.post('/api/email/client/new-password', bodyEmail, configTypeJson)
        setLoadingProgress(dispatch, false);
        return res;
    } catch(err) {
        setLoadingProgress(dispatch, false);
        return err.response;
    }
}

//n1 -here err.response makes sure if response is defined before setting Error. This avoids a popup error
// n2 - This next will redirect the page to home after user send message succefully
