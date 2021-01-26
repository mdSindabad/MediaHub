import {HOME_REQUEST_SEND, HOME_REQUEST_SUCCESS, HOME_REQUEST_FAILURE} from './actionTypes';
import axios from 'axios';
const home_request_send = () => {
    return {
        type: HOME_REQUEST_SEND
    }
};

const home_request_success = (payload) => {
    return {
        type: HOME_REQUEST_SUCCESS,
        payload
    }
};

const home_request_failure = (payload) => {
    return {
        type: HOME_REQUEST_FAILURE,
        payload
    }
};

export const fetch_home_data = (page) => {
    return dispatch => {
        dispatch(home_request_send());
        setTimeout(() => {
            axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
                .then(response => {
                    const items = response.data.results;
                    const data = {
                        items,
                        page
                    };
                    dispatch(home_request_success(data));
                })
                .catch(error => {
                    dispatch(home_request_failure(error.message))
                })
        }, 100);
    }
};