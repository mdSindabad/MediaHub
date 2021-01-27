import {MOVIE_REQUEST_SEND, MOVIE_REQUEST_SUCCESS, MOVIE_REQUEST_FAILURE} from './actionTypes';
import axios from 'axios';
const movie_request_send = () => {
    return {
        type: MOVIE_REQUEST_SEND
    }
};

const movie_request_success = (payload) => {
    return {
        type: MOVIE_REQUEST_SUCCESS,
        payload
    }
};

const movie_request_failure = (payload) => {
    return {
        type: MOVIE_REQUEST_FAILURE,
        payload
    }
};

export const fetch_movie_data = (page, category) => {
    return dispatch => {
        dispatch(movie_request_send());
        console.log(page)
        axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
            .then(response => {
                const items = response.data.results;
                const data = {
                    items,
                    page,
                    category
                };
                dispatch(movie_request_success(data));
            })
            .catch(error => {
                dispatch(movie_request_failure(error.message))
            })
    }
};