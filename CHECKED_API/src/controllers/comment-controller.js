import { Comment } from '../models/comment-model.js';
import loggerController from './logger-controller.js';


export default {
    create: (req, res) => {
        try {
            Comment.insert(req.body, (error, result) => {
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
            loggerController.writeLog('Controller : Comment => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    //get-comments-post-id
    getCommentsByPostId: (req, res, f) => {
        try {
            Comment.selectByPostId(req.params, (error, result) => {
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
            loggerController.writeLog('Controller : Comment => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
}