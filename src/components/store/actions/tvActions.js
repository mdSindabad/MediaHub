import {TV_REQUEST_SEND, TV_REQUEST_SUCCESS, TV_REQUEST_FAILURE} from './actionTypes';
import axios from 'axios';
const tv_request_send = () => {
    return {
        type: TV_REQUEST_SEND
    }
};

const tv_request_success = (payload) => {
    return {
        type: TV_REQUEST_SUCCESS,
        payload
    }
};

const tv_request_failure = (payload) => {
    return {
        type: TV_REQUEST_FAILURE,
        payload
    }
};

export const fetch_tv_data = (page, category) => {
    return dispatch => {
        dispatch(tv_request_send());
        console.log(page)
        axios.get(`https://api.themoviedb.org/3/tv/${category}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
            .then(response => {
                const items = response.data.results;
                const data = {
                    items,
                    page,
                    category
                };
                dispatch(tv_request_success(data));
            })
            .catch(error => {
                dispatch(tv_request_failure(error.message))
            })
    }
};