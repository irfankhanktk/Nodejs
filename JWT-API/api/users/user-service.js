const pool = require('../../config/database');



module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO users (user_name,user_password,created_date) VALUES(?,?,?)',
            [data.user_name, data.user_password, data.created_date],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(undefined,results);
            }
        )
    },
    isUserExists: (user_name,callBack) => {
        pool.query(
            'select * from users where user_name=?',
            [user_name],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return  callBack(null,result[0]);
            }
        )
    },
    getUserById: (id,callBack) => {
        pool.query(
            'select * from users where id=?',
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return  callBack(null,result);
            }
        )
    },
    updateUserById: (data,callBack) => {
        pool.query(
            'update users set user_name=? where id=?',
            [data.user_name,data.id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return  callBack(null,result);
            }
        )
    },
    getAllUsers: (callBack) => {
        pool.query(
            'select * from users',
            [],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return  callBack(null,result);
            }
        )
    }
}