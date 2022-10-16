import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Machine } from "../models/machine-model.js";
import loggerController from "./logger-controller.js";

// create new machine
export default {
    insertMachine: (req, res) => {
        try {
            // if(req.user.role==='vendor'){
            //     return res.status(403).json({
            //         success: 0,
            //         message: 'Vendor is not authorized for this action',
            //     });
            // }
            let body = { ...req.body, image: req.file && req.file.filename ? req.file.filename : null };
            Machine.insertMachine(req.user.id, body, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error.sqlMessage || error,
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: 'added successfully',
                });
            })
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : machine =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getMachine: (req, res) => {
        try {
            Machine.selectMachineById(req.params.machine_id, (error, result) => {
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
            loggerController.writeLog('Controller : machine =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    deleteMachine: (req, res) => {
        try {
            Machine.isMachineExists(req.params.machine_id, (error, eResult) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                if (eResult) {

                    console.log('eResult:', eResult);
                    Machine.deleteMachineById(req.params.machine_id, (error, result) => {
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
                        message: `machine with id (${req.params.machine_id}) not found`,
                    });
                }
            })
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : machine =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getMachines: (req, res) => {
        try {

            Machine.getMachines({ ...req.query, user_id: req.user.id, is_super: req.user.role === 'superadmin' ? 1 : 0 }, (error, result) => {
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
                    data: result
                });
            });
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : machine =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getAllMachines: (req, res) => {
        try {

            Machine.getAllMachines({ ...req.query, user_id: req.user.id, is_super: req.user.role === 'superadmin' ? 1 : 0 }, (error, result) => {
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
                    data: result
                });
            });
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : machine =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getLocations: (req, res) => {
        try {

            Machine.getLocations(req.query, (error, result) => {
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
                    data: result
                });
            });
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : machine =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getPopularMachines: (req, res) => {
        try {

            Machine.getPopularMachines((error, result) => {
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
                    data: result
                });
            });
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : machine =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    updateInfo: (req, res) => {
        try {
            let body = { ...req.body, image: !req.file ? null : req.file.filename };
            Machine.updateInfo(body, (error, result) => {
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
            loggerController.writeLog('Controller : machine =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    updateMachine: (req, res) => {
        try {
            let body = { ...req.body, image: !req.file ? null : req.file.filename };
            if (!req.file) {
                delete body.image;
            }

            Machine.isMachineExists(req.query.machine_id, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                if (!result)
                    return res.status(200).json({
                        success: 0,
                        message: `Machine not found with id (${req.query.machine_id})`,
                    });

                Machine.updateMachine(req.query.machine_id, body, (error, result) => {
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
            });
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : machine =>' + error);
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
            Machine.isIdExists(body.machine_id, (error, eResult) => {
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
                        message: 'machine_id not found',
                    });
                }
                const bool = compareSync(body.old_password, eResult.password);
                if (bool) {
                    const salt = genSaltSync(10);
                    body.new_password = hashSync(body.new_password, salt);

                    Machine.updateMachineById(body, (err, result) => {
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

