import { User } from "../models/user-model.js";
import loggerController from "./logger-controller.js";
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

// create new user
export default {
    getUser: (req, res) => {

        console.log('req.user::', req.user);
        try {
            User.selectUserById({ ...req.params, my_id: req.user.id }, (error, result) => {
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
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : User =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    addPublication: (req, res) => {
        try {
            console.log('body:::', req.body);
            User.addPublication(req.user.id,req.body.publications, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                return res.status(201).json({
                    success: 1,
                    data: result,
                });
            });

        } catch (error) {

            loggerController.writeLog('controller : auth =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getPublication: (req, res) => {
        try {
            User.getPublication(req.query, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                return res.status(201).json({
                    success: 1,
                    data: result,
                });
            });

        } catch (error) {

            loggerController.writeLog('controller : auth =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getUsers: (req, res) => {
        try {

            User.selectAll(req.query, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                console.log('successs');
                return res.status(200).json(result);
            });
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : User =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getFollowers: (req, res) => {
        try {
            console.log('req.query::', req.query);
            User.getFollowersFollowing(req.query?.user_id, '1', (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                console.log('successs');
                return res.status(200).json(result);
            });
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : User =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getFollowings: (req, res) => {
        try {
            console.log('req.query followings::', req.query);

            User.getFollowersFollowing(req.query?.user_id, '0', (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                console.log('successs');
                return res.status(200).json(result);
            });
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : User =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    inviteUsers: (req, res) => {
        try {
            User.inviteUsers(req.query, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                console.log('successs');
                return res.status(200).json(result);
            });
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : User =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    updateInfo: (req, res) => {
        try {
            let body = { ...req.body, image: !req.file ? null : req.file.filename };
            User.updateInfo(body, (error, result) => {
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
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : User =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    updatePassword: (req, res) => {
        let body = req.body;
        console.log('body::::', body);
        try {
            User.isIdExists(body.user_id, (error, eResult) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                if (!eResult) {
                    console.log('eResult:', eResult);
                    return res.status(401).json({
                        success: 0,
                        message: 'user_id not found',
                    });
                }
                const bool = compareSync(body.old_password, eResult.password);
                if (bool) {
                    const salt = genSaltSync(10);
                    body.new_password = hashSync(body.new_password, salt);

                    User.updateUserById(body, (err, result) => {
                        if (err) {
                            console.log('error', err);
                            return res.status(500).json({
                                success: 0,
                                message: err,
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            data: 'updated successfully',
                        });

                    })
                } else {

                    return res.status(500).json({
                        success: 0,
                        message: 'old password did not match',
                    });
                }

            });
        } catch (error) {
            loggerController.writeLog('controller : auth =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    toggleFollow: (req, res) => {
        let body = req.body;
        console.log('body::::', body);
        try {

            User.toggleFollow({ ...body, user_id: req.user.id }, (err, result) => {
                if (err) {
                    console.log('error', err);
                    return res.status(500).json({
                        success: 0,
                        message: err,
                    });
                }
                return res.status(200).json(result);

            })
        } catch (error) {
            loggerController.writeLog('controller : auth =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
}

