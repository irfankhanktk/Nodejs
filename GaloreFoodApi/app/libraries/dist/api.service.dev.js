"use strict";

var axios = require('axios');

var apiService = {};

apiService.get = function (url, callback) {
  axios.get(url).then(function (response) {
    // handle success
    console.log('response: ', response.data);

    if (callback) {
      callback({
        status: 'ok',
        data: response.data
      });
    }
  })["catch"](function (error) {
    // handle error
    if (callback) {
      callback({
        status: 'error',
        data: false
      });
    }
  }).then(function () {});
};

apiService.post = function (url, params, callback) {
  axios.post(url, params).then(function (res) {
    if (callback) {
      callback({
        status: 'ok',
        data: res
      });
    }
  })["catch"](function (error) {
    console.log(error);

    if (callback) {
      callback({
        status: 'error',
        data: error
      });
    }
  });
};

module.exports = apiService;