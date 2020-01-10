import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';
import { setLoadingProgress, setCustomLoading } from './globalActions';

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
export const getStaffBookingList = async (dispatch, userId, docsToSkip, needReadMore = false, filter) => {
    needReadMore === true
    ? setCustomLoading(dispatch, true)
    : setLoadingProgress(dispatch, true)

    try {
        const url =`/api/user/staff-booking/list/${userId}?skip=${docsToSkip}${filter ? `&search=${filter}` : ""}`;
        const res = await axios.get(url, configTypeJson);
        checkStatusAndUpdateMany(dispatch, userId);

        needReadMore === true
        ? setCustomLoading(dispatch, false)
        : setLoadingProgress(dispatch, false)

        needReadMore === true
        ? dispatch({ type: "STAFF_BOOKING_READ_MORE", payload: res.data })
        : dispatch({ type: "STAFF_BOOKING_READ", payload: res.data })

        return res;
    } catch (err) {
        needReadMore === true
        ? setCustomLoading(dispatch, false)
        : setLoadingProgress(dispatch, false)
        return err.response;
    }
};