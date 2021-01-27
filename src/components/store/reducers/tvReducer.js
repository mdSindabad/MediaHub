import {TV_REQUEST_SEND, TV_REQUEST_SUCCESS, TV_REQUEST_FAILURE} from '../actions/actionTypes';

const initialTvState = {
    isLoading: true,
    data: {},
    error: '' 
};

export const tvReducer = (state = initialTvState, action) => {
    switch (action.type) {
        case TV_REQUEST_SEND:
            return {
                ...state,
                isLoading: true,
                data: {},
                error: ''
            }
        case TV_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: ''
            }
        case TV_REQUEST_FAILURE:
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