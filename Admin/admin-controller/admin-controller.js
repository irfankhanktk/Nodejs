const CustomerOrders = require("../../models/admin/admin-model.js");
const logger = require("../../libraries/loggerMiddleware");

exports.CustomerOrdersByWeekly = (req, res) => {
  try {
    CustomerOrders.getCustomerOrdersWeekly(req.params,(err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Found No Orders`,
          });
        } else {
          res.status(500).send({
            status: "ERROR",
            message: "Error retrieving Orders ",
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

// Get count of original amount of CustomerOrders
exports.CustomerOrdersCountSum = (req, res) => {
  try {
    CustomerOrders.getCountOfOriginalAmount((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: "ERROR",
            message: `Found No Orders`,
          });
        } else {
          res.status(500).send({
            status: "ERROR",
            message: "Error retrieving Orders ",
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



// Retrieve all riders from the database.
exports.findAll = (req, res) => {
    try {
        CustomerOrders.getAll(req.params,(err, data) => {
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