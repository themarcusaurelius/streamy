import streams from '../api/streams';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM } from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

//asynchronous function
export const createStream = formValues => async dispatch => {
    const response = await streams.post('/streams', formValues);
    dispatch({ type: CREATE_STREAM, payload: response.data })
} ;

   
