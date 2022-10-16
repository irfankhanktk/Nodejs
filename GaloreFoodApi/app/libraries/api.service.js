const axios = require('axios');
const apiService = {};

apiService.get = (url, callback) => {
    axios.get(url)
        .then((response) => {
            // handle success
            console.log('response: '  ,response.data);
            if (callback) {
                callback({
                    status: 'ok',
                    data: response.data
                })
            }
        })
        .catch((error) => {
            // handle error
            if (callback) {
                callback({
                    status: 'error',
                    data: false
                })
            }
        })
        .then(() => { });
}

apiService.post = (url, params, callback) => {
    axios.post(url, params)
        .then(res => {
            if (callback) {
                callback({
                    status: 'ok',
                    data: res
                })
            }
        })
        .catch(error => {
            console.log(error)
            if (callback) {
                callback({
                    status: 'error',
                    data: error
                })
            }
        });
}

module.exports = apiService;