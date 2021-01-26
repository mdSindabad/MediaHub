import {SEARCH_REQUEST_SEND, SEARCH_REQUEST_SUCCESS, SEARCH_REQUEST_FAILURE} from '../actions/actionTypes';

const initialSearchState = {
    isLoading: true,
    data: {},
    error: '' 
};

export const searchReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case SEARCH_REQUEST_SEND:
            return {
                ...state,
                isLoading: true,
                data: {},
                error: ''
            }
        case SEARCH_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: ''
            }
        case SEARCH_REQUEST_FAILURE:
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