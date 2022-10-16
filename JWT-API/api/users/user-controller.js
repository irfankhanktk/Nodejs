const { create, getAllUsers, getUserById, updateUserById, signin, isUserExists } = require('./user-service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.user_password = hashSync(body.user_password, salt);
        create(body, (error, result, fields) => {
            if (error) {
                console.log('error', error);
                return res.status(500).json({
                    success: 0,
                    message: error,
                });
            }
            return res.status(200).json({
                success: 1,
                data: result,
            });
        })
    },
    signin: (req, res) => {
        const body = req.body;
        isUserExists(body.user_name, (error, eResult) => {
            if (error) {
                console.log('error', error);
                return res.status(500).json({
                    success: 0,
                    message: error,
                });
            }
            if (!eResult) {
                return res.json({
                    success: 0,
                    message: 'invalid email or password',
                });
            }

            const bool = compareSync(body.user_password, eResult.user_password);
            console.log('bool:',bool);
            if (bool) {
                eResult.user_password = undefined;
                const jsonToken = sign({ result: eResult }, 'irfan1234', { expiresIn: '1h' })
                return res.status(200).json({
                    success: 1,
                    message: 'login successfully',
                    token: jsonToken,
                });

            }
            return res.json({
                success: 0,
                message: 'invalid email or password',
            });
        })
    },
    getUserById: (req, res, f) => {
        getUserById(req.params.id, (error, result, fields) => {
            if (error) {
                console.log('error', error);
                return res.status(500).json({
                    success: 0,
                    message: error,
                });
            }
            return res.status(200).json({
                success: 1,
                data: result[0],
            });
        });
    },
    updateUserById: (req, res, f) => {
        const body = req.body;
        body.id = req.params.id;
        updateUserById(body, (error, result, fields) => {
            if (error) {
                console.log('error', error);
                return res.status(500).json({
                    success: 0,
                    message: error,
                });
            }
            return res.status(200).json({
                success: 1,
                data: 'updated succesfully',
            });
        });
    },
    getUsers: (req, res, f) => {
        getAllUsers((error, result, fields) => {
            if (error) {
                console.log('error', error);
                return res.status(500).json({
                    success: 0,
                    message: error,
                });
            }
            console.log('successs');
            return res.status(200).json({
                success: 1,
                data: result,
            });
        });
    }
}