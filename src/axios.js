import axios from 'axios';
import constants from '../constant';

const baseURL = constants.apiUrl;

export default axios.create({
  baseURL: baseURL
  // You can add your headers here
});
