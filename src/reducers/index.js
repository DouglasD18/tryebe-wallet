import { combineReducers } from 'redux';
import edit from './edit';
import user from './user';
import wallet from './wallet';

const rootReducer = combineReducers({ user, wallet, edit });

export default rootReducer;
