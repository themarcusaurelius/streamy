import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducers'

export default combineReducers({
    //replaceMe: () => 'TEST'
    auth: authReducer,
    form: formReducer
})