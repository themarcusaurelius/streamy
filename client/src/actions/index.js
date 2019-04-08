import streams from '../api/streams';
import history from '../history';
import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';

export const signIn = userId => {
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

//Asynchronous Action Creator Functions

//Create A New Stream
export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth
    const response = await streams.post('/streams', { ...formValues, userId });
    
    dispatch({ type: CREATE_STREAM, payload: response.data })
    //Programmatic navigation to get user back to the root route
    history.push('/');
};

//Get All Streams
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    
    dispatch({ type: FETCH_STREAMS, payload: response.data })
};

//Get One Stream
export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/stream/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data })
};

//Edit Stream
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data })
};

//Delete Stream
export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);
    
    dispatch({ type: DELETE_STREAM, payload: id })
};



   
