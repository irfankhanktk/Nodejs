const Customer = require("../../models/users/customer.model.js");
const logger = require("../../libraries/loggerMiddleware");

// Create and Save a new Customer
exports.create = (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }

    // Create a Customer
    const customer = new Customer({
      phoneNumber: req.body.phoneNumber,
      name: req.body.name,
      password: req.body.password,
      deviceToken: req.body.deviceToken,
      createdAt: new Date(),
      lastUpdated: new Date(),

      // this.name = customer.name;
      // this.phoneNumber = customer.phoneNumber;
      // this.isPhoneVerified = customer.isPhoneVerified || false;
      // this.profileUrl = customer.profileUrl;
      // this.password = customer.password;
      // this.createdAt = customer.createdAt;
      // this.lastUpdated = customer.lastUpdated;
      // this.deviceToken = customer.deviceToken;
    });

    console.log("cusrtomer", customer);
    // Save Customer in the database
    Customer.create(customer, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          data:
            err.message || "Some error occurred while creating the Customer.",
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

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  try {
    Customer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message || "Some error occurred while retrieving customers.",
        });
      else res.send({
        status: "OK",
        data
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

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  try {
    Customer.findById(req.params.id, (err, data) => {
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

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  try {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }

    Customer.updateById(req.params.id, req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Not found people with id ${req.params.customerId}.`,
          });
        } else {
          res.status(500).send({
            status: "ERROR",
            message: "Error updating people with id " + req.params.customerId,
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

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  try {
    Customer.remove(req.params.id, (err, data) => {
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

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  // try {
  //   Customer.removeAll((err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         status: "ERROR",
  //         message:
  //           err.message || "Some error occurred while removing all customers.",
  //       });
  //     else res.send({ status: "OK",data: `All people were deleted successfully!` });
  //   });
  // } catch (err) {
  //   logger.writeLog(err.message);
  //   res.status(500).send({
  //     status: "ERROR",
  //     message: err.message,
  //   });
  // }
};

exports.login = (req, res) => {
  try {
    Customer.login(req, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          data:
            err.message || "Some error occurred while creating the Customer.",
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
