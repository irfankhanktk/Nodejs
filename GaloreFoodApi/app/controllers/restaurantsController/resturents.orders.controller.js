const ResturantOrders = require("../../models/restaurants/restaurantOrders.model");
const logger = require("../../libraries/loggerMiddleware");


// Retrieve all ResturantOrders from the database.
exports.findAll = (req, res) => {
  try {
    ResturantOrders.getAll(req,(err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message ||
            "Some error occurred while retrieving ResturantOrders.",
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

// Find a single ResturantOrders with a orderId
exports.findOne = (req, res) => {
  try {
    ResturantOrders.findById(req.params.id, (err, data) => {
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

// Update a CustomerOrder identified by the orderId in the request
exports.update = (req, res) => {

  console.log("i am here, " , req.params.orderId);

  try {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }
    console.log("i am here 2");
    ResturantOrders.updateById(req.params.orderId, req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Not found people with id ${req.params.orderId}.`,
          });
        } else {
          res.status(500).send({
            status: "ERROR",
            message: "Error updating people with id " + req.params.orderId,
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

// // Delete a ResturantOrders with the specified id in the request
// exports.delete = (req, res) => {
//   try {
//     ResturantOrders.remove(req.params.id, (err, data) => {
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

// // Delete all ResturantOrders from the database.
// exports.deleteAll = (req, res) => {
//   try {
//     ResturantOrders.removeAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           status: "ERROR",
//           message:
//             err.message ||
//             "Some error occurred while removing all ResturantOrders.",
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