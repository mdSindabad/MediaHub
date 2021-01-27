import {MOVIE_REQUEST_SEND, MOVIE_REQUEST_SUCCESS, MOVIE_REQUEST_FAILURE} from '../actions/actionTypes';

const initialMovieState = {
    isLoading: true,
    data: {},
    error: '' 
};

export const movieReducer = (state = initialMovieState, action) => {
    switch (action.type) {
        case MOVIE_REQUEST_SEND:
            return {
                ...state,
                isLoading: true,
                data: {},
                error: ''
            }
        case MOVIE_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: ''
            }
        case MOVIE_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                data: {},
                error: action.payload
            }    
        default:
            return state
    }
};