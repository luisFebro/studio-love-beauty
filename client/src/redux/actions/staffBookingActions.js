import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';
import { setLoadingProgress } from './globalActions';

export const getStaffBookingList = async (dispatch, userId) => { // L
    setLoadingProgress(dispatch, true);
    try {
        const res = await axios.get(`/api/user/staff-booking/list/${userId}`, configTypeJson);
        setLoadingProgress(dispatch, false);
        dispatch({ type: "STAFF_BOOKING_READ", payload: res.data })
    } catch (err) {
        setLoadingProgress(dispatch, false);
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