import connection from '../config/db-connection.js';

export class CheckedUser {
    constructor(newUser) {
      
    }
    static insert = (newUser, callBack) => {
        connection.query(
            'INSERT INTO checkd.checkeduser SET ?', newUser, (error, results,) => {
                if (error) {
                    return callBack(error?.sqlMessage);
                }
                console.log('results::',results);
                return callBack(null, results);
            }
        );
    }
    static isUserExists = (email, callBack) => {
        connection.query(
            'select * from checkd.checkeduser where email=?',
            [email],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    }
    static isIdExists = (user_id, callBack) => {
        connection.query(
            'select * from checkd.checkeduser where id=?',
            [user_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    }
}
