import {SEARCH_REQUEST_SEND, SEARCH_REQUEST_SUCCESS, SEARCH_REQUEST_FAILURE} from './actionTypes';
import axios from 'axios';
const search_request_send = () => {
    return {
        type: SEARCH_REQUEST_SEND
    }
};

const search_request_success = (payload) => {
    return {
        type: SEARCH_REQUEST_SUCCESS,
        payload
    }
};

const search_request_failure = (payload) => {
    return {
        type: SEARCH_REQUEST_FAILURE,
        payload
    }
};

export const fetch_search_data = (page, queryString) => {
    return dispatch => {
        dispatch(search_request_send());
        console.log(page)
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${queryString}`)
            .then(response => {
                const items = response.data.results;
                const data = {
                    items,
                    page,
                    query: queryString
                };
                dispatch(search_request_success(data));
            })
            .catch(error => {
                dispatch(search_request_failure(error.message))
            })
    }
};