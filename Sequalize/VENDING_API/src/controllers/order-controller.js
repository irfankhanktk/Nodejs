import { Order } from '../models/order-model.js';
import loggerController from './logger-controller.js';

// create new user

export default {
    payment: (req, res) => {
        try {
                    Order.payment({...req.body,paid_by_id:req.user.id}, (error, result) => {
                        if (error) {
                            console.log('error', error);
                            return res.status(500).json({
                                success: 0,
                                message: error,
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: 'transaction proceeded successfully',
                        });
                    });
        } catch (error) {

            loggerController.writeLog('controller : order =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    dispenseItem: (req, res) => {
        try {
                    Order.dispenseItem(req.body, (error, result) => {
                        if (error) {
                            console.log('error', error);
                            return res.status(500).json({
                                success: 0,
                                message: error,
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: 'Item dispensed successfully',
                        });
                    });
        } catch (error) {

            loggerController.writeLog('controller : order =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getAllOrders: (req, res, f) => {
        try {
            Order.selectAll((error, result) => {
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
            loggerController.writeLog('controller : order =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getLogs: (req, res, f) => {
        try {
            Order.getLogs(req.query.vendor_id,(error, result) => {
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
            loggerController.writeLog('controller : order =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getBills: (req, res, f) => {
        try {
            Order.getBills(req.query.vendor_id,(error, result) => {
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
            loggerController.writeLog('controller : order =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
  
}
