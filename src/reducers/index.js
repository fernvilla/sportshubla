import { combineReducers } from 'redux';
import * as auth from './authReducer';

export default combineReducers({ ...auth });
