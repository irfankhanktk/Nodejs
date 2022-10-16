import { User } from "../models/user-model.js";
import loggerController from "./logger-controller.js";
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { VendingUser } from "../models/auth-model.js";

// create new user
export default {
    assignVendors: (req, res) => {
        console.log('req.body', req.body);
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    success: 0,
                    message: 'Your are not authorized for this action',
                });
            }
            User.assignVendors({ ...req.body, assigned_by_id: req.user.id }, (error, result) => {
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
    assignMachines: (req, res) => {
        try {
            // if (req.user.role !== 'manager') {
            //     return res.status(403).json({
            //         success: 0,
            //         message: 'Your are not authorized for this action as you are not a manager',
            //     });
            // }
            User.assignMachines({ ...req.body, assigned_by_id: req.user.id }, (error, result) => {
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
    getUser: (req, res) => {
        try {

            User.isIdExists(req.params.user_id, (error, eResult) => {
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
                        message: `user_id not found`,
                    });
                }
                User.selectUserById(req.params.user_id, (error, result) => {
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
    deleteUser: (req, res) => {
        try {
            User.isUserExists(req.params.user_id, (error, eResult) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                if (eResult) {

                    console.log('eResult:', eResult);
                    User.deleteUserById(req.params.user_id, (error, result) => {
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
                } else {
                    console.log('eResult:', eResult);
                    return res.status(404).json({
                        success: 0,
                        message: `User with id (${req.params.user_id}) not found`,
                    });
                }
            })
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : User =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getUsers: (req, res) => {
        try {
            console.log('req.user:::', req.user);
            User.selectAll(req.query, (error, result) => {
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
    getManagers: (req, res) => {
        try {
            console.log('req.user:::', req.user);
            // if(req.user.role!=='admin'&&req.user.role!=='superadmin'){
            //     return res.status(403).json({
            //         success: 0,
            //         message: 'Your are not authorized for this action as you are not a manager',
            //     });
            // }
            User.selectManagers({ ...req.query, created_by_id: req.user.role === 'superadmin' ? 0 : req.user.id }, (error, result) => {
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
    getAllManagers: (req, res) => {
        try {
            // if(req.user.role!=='admin'&&req.user.role!=='superadmin'){
            //     return res.status(403).json({
            //         success: 0,
            //         message: 'Your are not authorized for this action as you are not a manager',
            //     });
            // }
            User.getAllManagers({ ...req.query, user_id: req.user.id,is_super:req.user.role==='superadmin'}, (error, result) => {
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
    getVendors: (req, res) => {
        try {
            console.log('req.user:::', req.user);
            User.selectVendors({ ...req.query, manager_id: req.user.role === 'superadmin' ? 0 : req.user.id }, (error, result) => {
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
    getAllVendors: (req, res) => {
        try {
            
            User.getAllVendors({ ...req.query, user_id: req.user.id,is_super:req.user.role==='superadmin' }, (error, result) => {
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
    getAdmins: (req, res) => {
        try {
            console.log('req.user:::', req.user);
            User.selectAdmins({ ...req.query, user_id: req.user.id }, (error, result) => {
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
    getAllAdmins: (req, res) => {
        try {
            console.log('req.user:::', req.user);
            User.getAllAdmins({ ...req.query, user_id: req.user.id }, (error, result) => {
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
    getSuperAdmins: (req, res) => {
        try {
            console.log('req.user:::', req.user);
            User.selectSuperAdmins({ ...req.query, user_id: req.user.id }, (error, result) => {
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
    getUsersById: (req, res) => {
        try {
            User.getUsersById(req.query, (error, result) => {
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
    getUsersByRole: (req, res) => {
        try {

            User.getUsersByRole({ ...req.query, is_super: req.user.role === 'superadmin' ? 1 : 0, user_id: req.user.id }, (error, result) => {
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
    updateInfo: (req, res) => {
        try {
            let body = { ...req.body, image: !req.file ? null : req.file.filename };
            if (!req.file) {
                delete body.image;
            }
            User.updateInfo(req.query.user_id, body, (error, result) => {
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
                    data: 'Updated successfully',
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

                    return res.json({
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
}

