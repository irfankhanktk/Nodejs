const ordersModel = require("../models/orders.model");
const srvAddOptions = require("../services/addOptions.js");
const logger = require("../libraries/loggerMiddleware");

exports.addNewOrders = (req, res) => {
    console.log("i am here fucked: " ,req.body);
    try {
      if (!req.body) {
        res.status(400).send({
          status: "ERROR",
          message: "Content can not be empty!",
        });
      }
      let data = req.body;
      const _order = new ordersModel({
        userId: data.userId,
        username: data.username,
        userEmail: data.userEmail,
        userPhoneNumber: data.userPhoneNumber,
        restaurantId: data.restaurantId,
        menuId: data.menuId,
        menu_options: data.menu_options,
        quantity: data.quantity,
        lat: data.lat,
        lng: data.lng,
        address: data.address,
        status: data.status,
        totalAmount: data.totalAmount,
        deliveryCharges: data.deliveryCharges,
        acceptedBy: data.acceptedBy,
        cancelReason: data.cancelReason,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      ordersModel.addNewOrders(_order, (err, data) => {
        if (err)
          res.status(200).send({
            status: "ERROR",
            data:
              err.message ||
              "Some error occurred while creating the ordersModel.",
          });
        else
          res.status(200).send({
            status: "OK",
            data: data,
          });
      });
    } catch (err) {
      logger.writeLog(err.message);
      res.status(500).send({
        status: "ERROR",
        message: err.message,
      });
    }
  };

// Find a single order with a orderId
exports.getByOrderId = (req, res) => {
    try {
        ordersModel.findById(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(200).send({
                        status: "ERROR",
                        message: `Not found order with id ${req.params.id}.`,
                    });
                } else {
                    res.status(200).send({
                        status: "ERROR",
                        message: "Error retrieving order with id " + req.params.id,
                    });
                }
            } else res.send({ status: "OK", data });
        });
    } catch (err) {
        logger.writeLog(err.message);
        res.status(500).send({
            status: "ERROR",
            message: err.message,
        });
    }
};


// get by resturent Id

exports.getOrdersByResturentId = (req, res) => {
    try {
        ordersModel.getOrdersByResturentId(req, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(200).send({
                        status: "ERROR",
                        message: `Not found order with id ${req}.`,
                    });
                } else {
                    res.status(200).send({
                        status: "ERROR",
                        message: "Error retrieving order with id " + req,
                    });
                }
            } else res.send({ status: "OK", data });
        });
    } catch (err) {
        logger.writeLog(err.message);
        res.status(500).send({
            status: "ERROR",
            message: err.message,
        });
    }
};


// get by user id

exports.getOrdersByUserId = (req, res) => {
    try {
        ordersModel.getOrdersByUserId(req, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(200).send({
                        status: "ERROR",
                        message: `Not found order with id ${req.params.id}.`,
                    });
                } else {
                    res.status(200).send({
                        status: "ERROR",
                        message: "Error retrieving order with id " + req,
                    });
                }
            } else res.send({ status: "OK", data });
        });
    } catch (err) {
        logger.writeLog(err.message);
        res.status(500).send({
            status: "ERROR",
            message: err.message,
        });
    }
};


exports.getNearbyPendingOrders = (req, res) => {
    try {
        // if (!req.body.lat || !req.body.lng) {
        //     res.status(200).send({
        //         status: "ERROR",
        //         message: "lat and lng is required",
        //     });
        //     return;
        // }
        ordersModel.getNearbyPendingOrders(req, (err, data) => { 
            if (err)
                res.status(500).send({
                    status: "ERROR",
                    message:
                        err.message || "Some error occurred while retrieving Cities.",
                });
            else res.send({ status: "OK", data });
        });
    } catch (err) {
        logger.writeLog(err.message);
        res.status(500).send({
            status: "ERROR",
            message: err.message,
        });
    }
};

// Update a customer identified by the customerId in the request
exports.update = (req, res) => {
    try {
        // Validate Request
        if (!req.body || !req.params.id) {
            res.status(200).send({
                status: "ERROR",
                message: "body and id can not be empty!",
            });
        }

        ordersModel.updateOrderByOrderId(req.params.id, req.body, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(200).send({
                        status: "ERROR",
                        message: `Not found people with id ${req.params.id}.`,
                    });
                } else {
                    res.status(200).send({
                        status: "ERROR",
                        message: "Error updating people with id " + req.params.id,
                    });
                }
            } else res.send({ status: "OK", data });
        });
    } catch (err) {
        logger.writeLog(err.message);
        res.status(500).send({
            status: "ERROR",
            message: err.message,
        });
    }
};

// Find a all delivered orders with a riderId
exports.findDeliveredOrders = (req, res) => {
    try {
        ordersModel.findDeliveredByRiderId(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(200).send({
                        status: "ERROR",
                        message: `Not found order with id ${req.params.id}.`,
                    });
                } else {
                    res.status(200).send({
                        status: "ERROR",
                        message: "Error retrieving order with id " + req.params.id,
                    });
                }
            } else res.send({ status: "OK", data });
        });
    } catch (err) {
        logger.writeLog(err.message);
        res.status(500).send({
            status: "ERROR",
            message: err.message,
        });
    }
};
