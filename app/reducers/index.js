import {combineReducers} from 'redux';
import {  routerReducer } from 'react-router-redux'
import {reducerPrefixer} from '../appCommon/prefix';
import chat from '../modules/chatRoom/reducers';
//import {SET_DATA} from '../constants';

/*function data(state = {}, action) {
 switch (action.type) {
 case SET_DATA:
 return action.payload;
 default:
 return state
 }
 }*/

export default combineReducers({
    /*items,
     filter,
     data,*/
    ...chat,
    router:routerReducer
})