import { Logger } from '../models/logger-model.js';
export default {
    writeLog: (message) => {
        Logger.insert(message.toString(),(error,success) => {
            if (error) {
                  console.log('error in insertion log: ',error);
            }else{
                console.log('success: ',success);
            }
        });
    },
    getLogs: (req, res) => {
        try {
            Logger.selectLogs((error, result) => {
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
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
}