const sql = require('./db');
const moment = require('moment');

// constructor
const Logger = function (logData) {
    this.detail = logData.data;
};

Logger.saveLog = (log, callback) => {
    try {
        log.dateAdded = moment().format('llll');
        sql.query("INSERT INTO logs SET ?", log, (err, res) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, { id: res.insertId, ...log });
        });
    } catch (err) {
        callback(err, null);
    }
};

Logger.getLogs = (req,callback) => {
    try {
        let limit = parseInt(req.params.limit);
        let pNumber = parseInt(req.params.pNumber);
        pNumber = pNumber - 1;
        let query = `CALL galorefood.sp_get_logs(${limit},${pNumber})`;
        sql.query(query, (err, res) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, res);
        });
    } catch (err) {
        callback(err, null);
    }
};

module.exports = Logger;