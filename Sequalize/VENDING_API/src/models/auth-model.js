import connection from '../config/db-connection.js';

export class VendingUser {
    constructor(newUser) {
      
    }
    static insert = (newUser, callBack) => {
        connection.query(
            'INSERT INTO vending.vendinguser SET ?', newUser, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static isUserExists = (email, callBack) => {
        connection.query(
            'select * from vending.vendinguser where email=?',
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
            'select * from vending.vendinguser where id=?',
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
