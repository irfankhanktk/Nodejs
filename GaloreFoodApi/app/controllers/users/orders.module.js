const CustomerOrders = require("../../models/users/orders.model.js");
const logger = require("../../libraries/loggerMiddleware");

exports.create = (req, res) => {
  console.log("i am here fucked: " ,req.body);
  try {
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }
    let data = req.body;
    const _order = new CustomerOrders({
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
      restaurantInfo:data.restaurantInfo,
      menuInfo : data.menuInfo,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("_order: " , _order);

    CustomerOrders.create(_order, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          data:
            err.message ||
            "Some error occurred while creating the CustomerOrders.",
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

// Retrieve all CustomerOrders from the database.
exports.findAll = (req, res) => {
  try {
    CustomerOrders.getAll((err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message ||
            "Some error occurred while retrieving CustomerOrders.",
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

// Find a single CustomerOrders with a orderId
exports.findOne = (req, res) => {
  try {
    CustomerOrders.findById(req.params.id, (err, data) => {
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
  try {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }

    console.log(req.body);

    CustomerOrders.updateById(req.params.id, req.body, (err, data) => {
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

// Delete a CustomerOrders with the specified id in the request
exports.delete = (req, res) => {
  try {
    CustomerOrders.remove(req.params.id, (err, data) => {
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

// Delete all CustomerOrders from the database.
exports.deleteAll = (req, res) => {
  try {
    CustomerOrders.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message ||
            "Some error occurred while removing all CustomerOrders.",
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

exports.login = (req, res) => {
  try {
    CustomerOrders.login(req, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          data:
            err.message ||
            "Some error occurred while creating the CustomerOrders.",
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


// Find a single CustomerOrders with a orderId
exports.CustomerOrdersById = (req, res) => {
  try {
    CustomerOrders.getCustomerOrders(req.params.id, (err, data) => {
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

// Get Weekly CustomerOrders 
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



exports.getActiveOrder = (req, res) => {
  try {
    CustomerOrders.getCustomerActiveOrder(req.params.id, (err, data) => {
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