const Rider = require("../../models/riders/rider.model.js");
const logger = require("../../libraries/loggerMiddleware");

// Create and Save a new rider
exports.create = (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }

    // Create a rider
    const rider = new Rider({
      phoneNumber: req.body.phoneNumber,
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      deviceToken: req.body.deviceToken,
      lat: req.body.lat || null,
      lng: req.body.lng || null,
      balance: req.body.balance || 0,
      createdAt: new Date(),
      lastUpdated: new Date(),
    });

    console.log("rider", rider);
    // Save rider in the database
    Rider.create(rider, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          data: err.message || "Some error occurred while creating the rider.",
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

// Retrieve all riders from the database.
exports.findAll = (req, res) => {
  try {
    Rider.getAll(req.params,(err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message || "Some error occurred while retrieving riders.",
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

// Find a single rider with a RiderId
exports.findOne = (req, res) => {
  try {
    Rider.findById(req.params.id, (err, data) => {
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

// Update a Rider identified by the RiderId in the request
exports.update = (req, res) => {
  try {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }

    Rider.updateById(req.params.id, req.body, (err, data) => {
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

// Delete a rider with the specified id in the request
// exports.delete = (req, res) => {
//   try {
//     Rider.remove(req.params.id, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             status: "ERROR",
//             message: `Not found people with id ${req.params.id}.`,
//           });
//         } else {
//           res.status(500).send({
//             status: "ERROR",
//             message: "Could not delete people with id " + req.params.id,
//           });
//         }
//       } else res.send({ status: "OK",data: `people was deleted successfully!` });
//     });
//   } catch (err) {
//     logger.writeLog(err.message);
//     res.status(500).send({
//       status: "ERROR",
//       message: err.message,
//     });
//   }
// };

// Delete all riders from the database.
// exports.deleteAll = (req, res) => {
//   try {
//     Rider.removeAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           status: "ERROR",
//           message:
//             err.message || "Some error occurred while removing all Riders.",
//         });
//       else res.send({ status: "OK",data: `All people were deleted successfully!` });
//     });
//   } catch (err) {
//     logger.writeLog(err.message);
//     res.status(500).send({
//       status: "ERROR",
//       message: err.message,
//     });
//   }
// };

exports.login = (req, res) => {
  try {
    Rider.login(req, (err, data) => {
      console.log("data ", data);
      if (err)
        res.status(200).send({
          status: "ERROR",
          data: err.message || "Some error occurred while creating the Rider.",
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

exports.sendPushToNearbyRiders = (req, res) => {
  try {
    Rider.sendPushToNearbyRiders(req, (err, data) => {
      if (err)
        res.status(200).send({
          status: "ERROR",
          data: err.message || "Some error occurred while creating the Rider.",
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
