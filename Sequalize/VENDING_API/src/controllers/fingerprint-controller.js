import { Fingerprint } from '../models/fingerprint-model.js';
import loggerController from './logger-controller.js';

// create new user

export default {
    insertFingerprint: (req, res) => {
        try {
            let body = { ...req.body };
                    Fingerprint.insert(body, (error, result) => {
                        if (error) {
                            console.log('error', error);
                            return res.status(500).json({
                                success: 0,
                                message: error,
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: 'Fingerprint added successfully',
                        });
                    });
        } catch (error) {

            loggerController.writeLog('controller : Fingerprint =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getFingerprints: (req, res, f) => {
        try {
            Fingerprint.getFingerprints(req.query,(error, result) => {
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
            loggerController.writeLog('controller : Fingerprint =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getAllFingerprints: (req, res, f) => {
        try {
            Fingerprint.getAllFingerprints(req.query,(error, result) => {
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
            loggerController.writeLog('controller : Fingerprint =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
  
}
