import { SIGN_IN, SIGN_OUT } from '../actions/types';

//To get the initial value of state set to null, define it ahead of time and then pass it in below.
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isSignedIn: true, userId: action.payload };
        case SIGN_OUT:
            return {...state, isSignedIn: false, userId: null };
        default:
            return state;
    }
};