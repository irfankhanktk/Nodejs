import { Item } from '../models/item-model.js';
import { Machine } from '../models/machine-model.js';
import loggerController from './logger-controller.js';

// create new user

export default {
    insertItem: (req, res) => {
        try {
            // if(req.user.role!=='vendor'){
            //     return res.status(403).json({
            //         success: 0,
            //         message: 'Your are not authorized for this action as you are not a vendor',
            //     });
            // }  
            let body = { ...req.body };
            Item.insert(body, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: 'Item added successfully',
                });
            });
        } catch (error) {

            loggerController.writeLog('controller : item =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    updateItem: (req, res) => {
        try {


            Item.updateItem(req.query.item_id, req.body, (error, result) => {
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
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : item =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    updateExpiryQty: (req, res) => {
        try {
                Item.updateExpiryQty({machine_id:req.query.machine_id,...req.body}, (error, result) => {
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
        } catch (error) {
            console.log('error:::', error);
            loggerController.writeLog('Controller : item =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    deleteItem: (req, res) => {
        try {
            Item.isItemExists(req.query.item_id, (error, eResult) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                if (eResult) {

                    console.log('eResult:', eResult);
                    Item.deleteItem(req.query.item_id, (error, result) => {
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
                            data: 'deleted successfully',
                        });
                    });
                } else {
                    console.log('eResult:', eResult);
                    return res.status(404).json({
                        success: 0,
                        message: `Item with id (${req.query.item_id}) not found`,
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
    getAllItems: (req, res, f) => {
        try {
            Item.selectAll(req.query, (error, result) => {
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
            loggerController.writeLog('controller : item =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getCounts: (req, res, f) => {
        try {
            
            Item.getCounts({ user_id: req.user.id, is_super: req.user.role === 'superadmin' ? 1 : 0 }, (error, result) => {
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
            loggerController.writeLog('controller : item =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getDispensedItems: (req, res, f) => {
        try {
            Item.getDispensedItems(req.query, (error, result) => {
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
            loggerController.writeLog('controller : item =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getDispensedCounts: (req, res, f) => {
        try {
            Item.getDispensedCounts(req.query?.machine_id, (error, result) => {
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
            loggerController.writeLog('controller : item =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },

}
