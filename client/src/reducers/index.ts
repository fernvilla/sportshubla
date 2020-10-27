import { combineReducers } from 'redux';
import { auth } from './authReducer';
import { favorites } from './favoritesReducer';

const rootReducer = combineReducers({ auth, favorites });
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
