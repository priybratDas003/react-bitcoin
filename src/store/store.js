import {createStore} from 'redux';
import reducer from './reducer';
const store=createStore(reducer,{},window.devToolsExtension && window.devToolsExtension());
export default store;