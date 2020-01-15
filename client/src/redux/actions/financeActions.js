import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';


export const createFinance = async (dispatch, objToSend) => {
    try {
        return await axios.post(`/api/finance`, objToSend, configTypeJson);
    } catch (err) {
        return err.response;
    }
};

export const getAllStaffNames = async (dispatch) => {
    try {
        return await axios.get(`/api/finance/staff/list/names`, configTypeJson);
    } catch (err) {
        return err.response;
    }
};