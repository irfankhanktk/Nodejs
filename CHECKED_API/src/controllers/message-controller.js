import { Message } from '../models/message-model.js';
import loggerController from './logger-controller.js';


export default {
    createMessage: (req, res) => {
        try {
            let body = { ...req.body, image: req.file ? req.file.filename : null };
            console.log('req.file::',body);
        
            Message.insert(body, (error, result) => {
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
            console.log('errr:',error)
            loggerController.writeLog('Controller : Message => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },

    getMessages: (req, res, f) => {
        try {
            Message.selectAll(req.params, (error, result) => {
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
            loggerController.writeLog('Controller : Message => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getLastMessage: (req, res, f) => {
        try {
            Message.selectLast(req.params, (error, result) => {
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
            loggerController.writeLog('Controller : Message => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    updateMessageIsSeenStatus: (req, res, f) => {
        try {
            console.log('req query:',req.query);
            Message.updateMessageIsSeenStatus(req.query, (error, result) => {
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
                    data: 'read message successfully',
                });
            });
        } catch (error) {
            loggerController.writeLog('Controller : Message => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },

    deleteMessages: (req, res, f) => {
        try {
            Message.deleteMessages(req.params, (error, result) => {
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
            loggerController.writeLog('Controller : Message => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getChats: (req, res, f) => {
        try {
            Message.selectChats(req.params, (error, result) => {
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
            loggerController.writeLog('Controller : Message => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },

    getMessageById(req, res, f) {
        try {
            Message.selectMessageById(req.params.id, (error, result, fields) => {
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
        } catch (error) {
            loggerController.writeLog('Controller : Message => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    }


}