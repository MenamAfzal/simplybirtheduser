'use strict';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {Alert} from 'react-native';
import {BASE_URL} from '../constants/url';
import {axiosInstance} from './axiosInterceptor';

/* Instance for normal calls (currently replaced by axios interceptor instance in code) */
var instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Authorization: '',
  },
});

/* Instance for calls that send formdata */
var form_instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 1000,
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': 'multipart/form-data',
    'Cache-Control': 'no-cache',
    Authorization: '',
  },
});

/* Setting auth token in instance, form instance and axios interceptor instance for api calls */
const setAuthToken = token => {
  if (token) {
    // Apply to every request
    instance.defaults.headers.Authorization = token;
    axiosInstance.defaults.headers.Authorization = token;
    form_instance.defaults.headers.Authorization = token;
  } else {
    // Delete auth header
    delete instance.defaults.headers.common.Authorization;
    delete axiosInstance.defaults.headers.common.Authorization;
    delete form_instance.defaults.headers.common.Authorization;
  }
};

class RestClient {
  /* Checking network connection */
  static isConnected() {
    return new Promise(function (fulfill, reject) {
      NetInfo.fetch().then(state => {
        fulfill(true);
        if (state.isConnected) {
          fulfill(state.isConnected);
        } else {
          Alert.alert('looks like you have network issue');
          reject(state.isConnected);
        }
      });
    });
  }

  /* Axios call for get methods */
  static async getCall(url, token) {
    setAuthToken(token);
    let context = this;
    return new Promise(async function (fulfill, reject) {
      try {
        context
          .isConnected()
          .then(() => {
            axiosInstance
              .get(url)
              .then(response => {
                console.log(response);
                if (response && response.status === 200) {
                  fulfill(response.data);
                }
              })
              .catch(error => {
                reject(error?.response);
              });
          })
          .catch(error => {
            reject(error?.response);
          });
      } catch (error) {
        reject(error?.response);
      }
    });
  }

  /* Axios call for post methods */
  static async postCall(url, body, token) {
    setAuthToken(token);
    let context = this;
    console.log("url", url)
    console.log("body", body)

    return new Promise(function (fulfill, reject) {
      try {
        context
          .isConnected()
          .then(() => {
            axiosInstance
              .post(url, body)
              .then(function (response) {
                console.log("response in postCall", response);
                if (response && response.status === 200) {
                  fulfill(response.data);
                }
                reject(response);
              })
              .catch(error => {
                reject(error.response);
              });
          })
          .catch(error => {
            console.log("error in postCall", error);
            reject(error.response);
          });
      } catch (error) {
        reject(error.response);
      }
    });
  }

  /* Axios call for post methods that do not have a body */
  static async postCallNoData(url, token) {
    setAuthToken(token);
    let context = this;
    return new Promise(function (fulfill, reject) {
      try {
        context.isConnected().then(() => {
          axiosInstance
            .post(url)
            .then(function (response) {
              console.log(response);
              if (response && response.status === 200) {
                fulfill(response.data);
              }
              reject(response);
            })
            .catch(error => {
              Alert.alert(error);
              reject({
                error: 'Server Error. Try again',
              });
            });
        });
      } catch (error) {
        console.log(error);
        reject(error?.response);
      }
    });
  }

  /* Axios call for delete methods */
  static deleteCall(url) {
    setAuthToken(accessToken());
    // instance.setHeader('accesstoken', accessToken());
    let context = this;
    return new Promise(function (fulfill, reject) {
      try {
        context
          .isConnected()
          .then(() => {
            axiosInstance
              .delete(url, {timeout: 3 * 1000})
              .then(function (response) {
                if (response.data.status === 200) {
                  fulfill(response);
                }
              })
              .catch(error => {
                reject({
                  err: {errCode: error.response.data.err.msg},
                  errCode: error.response.data.status,
                });
              });
          })
          .catch(function (error) {
            reject({
              err: STRING.server_is_not_reachable,
              errCode: 404,
            });
          });
      } catch (error) {
        Alert.alert(error);
      }
    });
  }

  /* Axios call for put methods */
  static putCall(url, params, token) {
    setAuthToken(token);
    let context = this;
    return new Promise(function (fulfill, reject) {
      try {
        context
          .isConnected()
          .then(() => {
            axiosInstance
              .put(url, params)
              .then(function (response) {
                console.log(response);
                if (response.data && response.status === 200) {
                  fulfill(response.data);
                } else {
                  reject(response.data);
                }
              })
              .catch(error => {
                reject(error.response.data);
              });
          })
          .catch(function (error) {
            reject(error.response);
          });
      } catch (error) {
        reject(error.response);
      }
    });
  }

  /* Put call methods that send formdata */
  static putCallFormdata(url, body, token) {
    setAuthToken(token);
    let context = this;
    return new Promise(function (fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          form_instance
            .put(url, body)
            .then(response => {
              console.log(response);
              if (response.data.status === 'Success') {
                fulfill(response.data);
              } else {
                reject(response.data);
              }
            })
            .catch(error => {
              reject(error?.response?.data);
            });
        })
        .catch(function (error) {
          reject({
            errCode: 404,
          });
        });
    });
  }
}

export default RestClient;
