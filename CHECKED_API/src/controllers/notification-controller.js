import { Notification } from '../models/notification-model.js';
import loggerController from './logger-controller.js';


export default {
    createNotification: (req, res) => {
        try {
            let body = req.body;
            Notification.insert(body, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        Notification: error,
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: result,
                });
            });
        } catch (error) {
            loggerController.writeLog('Controller : Notification => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },

    getNotificationsById(req, res, f) {
        try {
            Notification.selectNotificationById(req.params.id, (error, result, fields) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        Notification: error,
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: result,
                });
            });
        } catch (error) {
            loggerController.writeLog('Controller : Notification => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getNotification(req, res, f) {
        try {
            console.log('hiiiiii',req.query);
            Notification.selectNotification(req.query, (error, result, fields) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                console.log('hahhahah', error);
                return res.status(200).json({data:result});
            });
        } catch (error) {
            console.log('catch', error);
            loggerController.writeLog('Controller : Notification => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    }


}