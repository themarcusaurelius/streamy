import _ from 'lodash';
import {
    FETCH_STREAM, 
    FEATCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
    FETCH_STREAMS,
} from '../actions/types';


//Object Based Approach Using Key Interpolation Syntax
export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload)
        default: 
            return state;
    }
};