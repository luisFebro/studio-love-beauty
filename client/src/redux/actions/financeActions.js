import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';
import addSpacingPlusToQuery from '../../utils/string/addSpacingPlusToQuery';
import { setCustomLoading } from './globalActions';

export const createFinance = async (dispatch, objToSend) => {
    try {
        return await axios.post(`/api/finance`, objToSend, configTypeJson);
    } catch (err) {
        return err.response;
    }
};

export const getPeriodQuery = (period, chosenDate) => {
    switch(period) {
        case 'day':
            return `&thisDayMonth=${addSpacingPlusToQuery(chosenDate)}`;
        case 'month':
            return `&thisMonth=${addSpacingPlusToQuery(chosenDate)}`;
        case 'all':
            return ``;
        default:
            console.log("Something did not work in the query switch")
    }
}

export const getCashOpsList = async (dispatch, period, skip, chosenDate) => {
    const periodQuery = getPeriodQuery(period, chosenDate);
    console.log("periodQuery", periodQuery);
    setCustomLoading(dispatch, true);

    try {
        const res = await axios.get(`/api/finance/cash-ops/list/${period}?skip=${skip}${periodQuery}`, configTypeJson);
        setCustomLoading(dispatch, false);
        return res;
    } catch (err) {
        setCustomLoading(dispatch, false);
        return err.response;
    }
};

export const getAllAvailableNames = async (dispatch, isAdmin = false) => {
    try {
        return await axios.get(`/api/finance/staff/list/names${isAdmin ? `?role=admin` : ""}`, configTypeJson);
    } catch (err) {
        return err.response;
    }
};