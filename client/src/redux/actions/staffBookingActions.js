import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';
import { setLoadingProgress } from './globalActions';

export const createBooking = async (dispatch, objToSend, staffId) => { // L
    try {
        return await axios.post(`/api/staff-booking/${staffId}`, objToSend, configTypeJson);
    } catch (err) {
        return err.response;
    }
};

export const updateBooking = async (dispatch, objToSend, bookingId) => { // L
    try {
        return await axios.put(`/api/staff-booking/${bookingId}`, objToSend, configTypeJson);
    } catch (err) {
        return err.response;
    }
};

// update "atrasado" status
export const checkStatusAndUpdateMany = async (dispatch, _staffId) => { // L
    try {
        return await axios.put(`/api/staff-booking/status/${_staffId}`, configTypeJson);
    } catch (err) {
        return err.response;
    }
};

// LISTS
export const getStaffBookingList = async (dispatch, userId) => {
    setLoadingProgress(dispatch, true);
    try {
        const res = await axios.get(`/api/user/staff-booking/list/${userId}`, configTypeJson);
        checkStatusAndUpdateMany(dispatch, userId);
        setLoadingProgress(dispatch, false);
        dispatch({ type: "STAFF_BOOKING_READ", payload: res.data })
    } catch (err) {
        setLoadingProgress(dispatch, false);
        return err.response;
    }
};