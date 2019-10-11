import axios from 'axios';
import store from '../store/store';
const HISTORY_API='https://api.coindesk.com/v1/bpi/historical/close.json?currency=';
const CORS='https://cors-anywhere.herokuapp.com/';
export default function getData(){
    let x=store.getState();
    return axios.get(CORS+HISTORY_API+x.currency);   
}