const CustomerOrder = require("../../models/riders/customerOrders.model");
const srvAddOptions = require("../../services/addOptions.js");
const logger = require("../../libraries/loggerMiddleware");

// Retrieve near pending orders from the database.
exports.findNearByPending = (req, res) => {
  try {
    const currentLocation = {
      lat: req.body.lat,
      lng: req.body.lng,
    };
    CustomerOrder.getPending(currentLocation, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message ||
            "Some error occurred while retrieving pending orders.",
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

// Find a single order with a orderId
exports.findOne = (req, res) => {
  try {
    CustomerOrder.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Not found order with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
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

// Update a customer identified by the customerId in the request
exports.update = (req, res) => {
  try {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }

    CustomerOrder.updateById(req.params.id, req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Not found people with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
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
exports.findDeliveredByRiderId = (req, res) => {
  try {
    CustomerOrder.findDeliveredByRiderId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Not found order with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
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

// Find a all delivered orders with a riderId
exports.findActiveOrder = (req, res) => {
  try {
    CustomerOrder.findActiveOrder(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Not found order with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
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
