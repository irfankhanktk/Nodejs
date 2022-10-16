import { Post } from '../models/post-model.js';
import loggerController from './logger-controller.js';


export default {
    createPost: (req, res) => {
        try {
            let body = { ...req.body, image: req.file ? req.file.filename : null };
            Post.insert(body, (error, result) => {
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
            loggerController.writeLog('Controller : Post => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },

    getAllPosts: (req, res, f) => {
        try {
            Post.selectAll(req.params,(error, result) => {
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
            loggerController.writeLog('Controller : Post => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getForumPosts: (req, res, f) => {
        try {
            Post.selectForumPosts(req.query,(error, result) => {
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
            loggerController.writeLog('Controller : Post => '+error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },

    getPostById(req, res, f) {
        try {
            Post.selectPostById(req.params.id, (error, result, fields) => {
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
    deletePostById(req, res, f) {
        try {
            console.log('req.query.post_id:',req.query.post_id);
            Post.deletePostById(req.query.post_id, (error, result, fields) => {
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
    }
}