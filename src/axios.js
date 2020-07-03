import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-d5c72.firebaseio.com/',
});

export default instance;
