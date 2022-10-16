const City = require("../models/cities.model.js");
const logger = require("../libraries/loggerMiddleware");

// Create and Save a new City
exports.create = (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }

    // Create a City
    const city = new City({
      name: req.body.name,
      status: req.body.status,
      createdAt: new Date(),
      lastUpdated: new Date(),
    });

    console.log("cusrtomer", city);
    // Save City in the database
    City.create(city, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          data: err.message || "Some error occurred while creating the City.",
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

// Retrieve all City from the database.
exports.findAll = (req, res) => {
  try {
    City.getAll((err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message || "Some error occurred while retrieving Cities.",
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

// Find a single City with a cityId
exports.findOne = (req, res) => {
  try {
    City.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Not found city with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            status: "ERROR",
            message: "Error retrieving city with id " + req.params.id,
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

// Update a City identified by the cityId in the request
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

    City.updateById(req.params.id, req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Not found city with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            status: "ERROR",
            message: "Error updating city with id " + req.params.id,
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

// Delete a City with the specified id in the request
exports.delete = (req, res) => {
  try {
    City.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Not found city with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            status: "ERROR",
            message: "Could not delete city with id " + req.params.id,
          });
        }
      } else res.send({ status: "OK",data: `Cities was deleted successfully!` });
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};

// Delete all cities from the database.
exports.deleteAll = (req, res) => {
  try {
    City.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message || "Some error occurred while removing all cities.",
        });
      else res.send({ status: "OK",data: `All city were deleted successfully!` });
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};
