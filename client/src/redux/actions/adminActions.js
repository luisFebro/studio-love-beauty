import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';
import { getBodyRequest } from '../../utils/server/getBodyRequest';
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
        const body = getBodyRequest(objToUpdate);
        const res = await axios.put(`/api/admin/business-info/update`, body, configTypeJson);
        dispatch({ type: 'UPDATE_BIZ_INFO', payload: objToUpdate });
        return res;
    } catch (err) {
        return err.response;
    }
};
