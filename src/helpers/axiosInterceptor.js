import axios from 'axios';
import URL from '../constants/url';

export const axiosInstance = axios.create({
  baseURL: URL.BASE_URL,
  timeout: 5 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Authorization: '',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('axiosInstance request', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // console.log('axiosInstance response', error);
    return Promise.reject(error);
  },
);
