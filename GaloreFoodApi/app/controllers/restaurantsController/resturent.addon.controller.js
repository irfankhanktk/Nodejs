const addOn = require("../../models/restaurants/addon.model.js");
const logger = require("../../libraries/loggerMiddleware");
const moment = require('moment');

// Create and Save a new cats
exports.create = (req, res) => {
  try {

    console.log('i am here');
    // Validate request

    console.log(JSON.stringify(req.body));
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }

    // Create a cats
    const _addOn = new addOn({
      name: req.body.name,
      createdAt: moment().format('llll'),
      updatedAt: moment().format('llll'),
      price: req.body.price,
      restaurant_id: req.body.restaurant_id,
    });

    console.log("addOn", _addOn);
    // Save cats in the database
    addOn.create(_addOn, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          data: err.message || "Some error occurred while creating the addOn.",
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

// Retrieve all cats from the database.
exports.findAll = (req, res) => {
  try {
    addOn.getAll(req,(err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message: err.message || "Some error occurred while retrieving cats.",
        });
      else res.send({status: "OK",data});
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};

// Find a single cats with a catId
exports.findOne = (req, res) => {
  try {
    console.log(req.params.id);
    addOn.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Not found people with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            status: "ERROR",
            message: "Error retrieving people with id " + req.params.id,
          });
        }
      } else res.send({status: "OK",data});
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};

// Update a cat identified by the catId in the request
exports.update = (req, res) => {
  try {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }
    console.log(req.body);
    addOn.updateById(req.params.id, req.body, (err, data) => {
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
      } else res.send({status: "OK",data});
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};

// Delete a cats with the specified id in the request
exports.delete = (req, res) => {
  try {
    addOn.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Not found people with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            status: "ERROR",
            message: "Could not delete people with id " + req.params.id,
          });
        }
      } else res.send({ status: "OK",data: `people was deleted successfully!` });
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};

// Delete all cats from the database.
exports.deleteAll = (req, res) => {
  try {
    addOn.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message || "Some error occurred while removing all cats.",
        });
      else res.send({ status: "OK",data: `All people were deleted successfully!` });
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};
