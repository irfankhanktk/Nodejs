import connection from '../config/db-connection.js';

export class Logger {
    constructor(newLogger) {
    }
    //insert error occurred
    static insert = (message, callBack) => {
        connection.query(
            'INSERT INTO checkd.logger SET ?', {message}, (error, results,) => {
            if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
    //get-Loggers
    static selectLogs = (callBack) => {
        connection.query(
            'SELECT * FROM checkd.logger', (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}
