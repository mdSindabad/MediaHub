import {HOME_REQUEST_SEND, HOME_REQUEST_SUCCESS, HOME_REQUEST_FAILURE} from '../actions/actionTypes';

const initialHomeState = {
    isLoading: true,
    data: {},
    error: '' 
};

export const homeReducer = (state = initialHomeState, action) => {
    switch (action.type) {
        case HOME_REQUEST_SEND:
            return {
                ...state,
                isLoading: true,
                data: {},
                error: ''
            }
        case HOME_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: ''
            }
        case HOME_REQUEST_FAILURE:
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