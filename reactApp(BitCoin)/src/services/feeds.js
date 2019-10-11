import axios from 'axios';
const FEED_API='https://api.coindesk.com/v1/bpi/currentprice.json';
const CORS='https://cors-anywhere.herokuapp.com/';

export default function getFeeds(){
    return axios.get(CORS+FEED_API);
}