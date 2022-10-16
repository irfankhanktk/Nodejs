import { Group } from '../models/group-model.js';
import loggerController from './logger-controller.js';


export default {
    createGroup: (req, res) => {
        try {
            if (!req.file) {
                return res.json({
                    success: 0,
                    message: `You must select a file.`,
                })
            }
            let body = { ...req.body, image: req.file.filename };
            console.log('bodybody:::', body);
            Group.insert(body, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                return res.status(201).json({
                    success: 1,
                    data: 'Successfully created',
                });
            });
        } catch (error) {
            loggerController.writeLog('Controller : Group => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    addUser: (req, res) => {
        try {
           
            
            Group.addUser(req.body, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: 'added Successfully',
                });
            });
        } catch (error) {
            loggerController.writeLog('Controller : Group => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    deleteGroup(req, res, f) {
        try {
            console.log('req.query.group_id:',req.query.group_id);
            Group.deleteGroupById(req.query.group_id, (error, result, fields) => {
                if (error) {
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
        } catch (error) {
            loggerController.writeLog('Controller : Post => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    update_group: (req, res) => {
        try {
            Group.updateGroup(req.query.group_id,req.body, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: 'updated Successfully',
                });
            });
        } catch (error) {
            loggerController.writeLog('Controller : Group => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },


    getAllGroups: (req, res, f) => {
        try {
            Group.selectAll((error, result) => {
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
            loggerController.writeLog('Controller : Group => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },

    getJoinedGroupsById(req, res, f) {
        try {
            Group.selectJoinedGroupsById(req.params, (error, result, fields) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                return res.status(200).json(result);
            });
        } catch (error) {
            loggerController.writeLog('Controller : Group => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getUnJoinedGroupsById(req, res, f) {
        try {
            Group.selectUnJoinedGroupsById(req.params, (error, result, fields) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                return res.status(200).json(result);
            });
        } catch (error) {
            loggerController.writeLog('Controller : Group => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    joinGroup(req, res, f) {
        try {
            Group.joinGroup(req.params, (error, result, fields) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                return res.status(200).json(result);
            });
        } catch (error) {
            loggerController.writeLog('Controller : Group => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    leaveGroup(req, res, f) {
        try {
            Group.leaveGroup(req.params, (error, result, fields) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                return res.status(200).json(result);
            });
        } catch (error) {
            loggerController.writeLog('Controller : Group => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    }
}
