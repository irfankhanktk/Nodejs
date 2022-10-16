import { get_authenticated_user } from '../middlewares/get-authenticated-user.js';
import { Like } from '../models/like-model.js';
import loggerController from './logger-controller.js';


export default {
    likeDislike: (req, res) => {
        try {
            Like.likeDislike(req.params, (error, result) => {
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
        } catch (error) {
            loggerController.writeLog('Controller : Like => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },

    getAllLikes: (req, res, f) => {
        try {
            Like.selectAll((error, result) => {
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
            loggerController.writeLog('Controller : Like => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },

}