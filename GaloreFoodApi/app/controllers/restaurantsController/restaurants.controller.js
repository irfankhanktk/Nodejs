const Restaurant = require("../../models/restaurants/restaurants.model.js");
const logger = require("../../libraries/loggerMiddleware");

// Create and Save a new Restaurant
exports.create = (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }

    // Create a restaurant
    const restaurant = new Restaurant({
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      cityId: req.body.cityId,
      address: req.body.address,
      img: req.body.img,
      password: req.body.password,
      minCartValue: req.body.minCartValue,
      deliveryCharges: req.body.deliveryCharges,
      openingTime: req.body.openingTime,
      closingTime: req.body.closingTime,
      trending: req.body.trending,
      deliveryTime: req.body.deliveryTime,
      personCost: req.body.personCost,
      lat: req.body.lat,
      lng: req.body.lng,
      open: req.body.open,
      type: req.body.type,
      commissionType: req.body.commissionType,
      commissionValue: req.body.commissionValue,
      perKmCharge: req.body.perKmCharge,
      deviceToken: req.body.deviceToken || null,
      createdAt: new Date(),
      updatedAt: new Date()
    });


    console.log("cusrtomer", Restaurant);
    // Save Restaurant in the database
    Restaurant.create(restaurant, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          data:
            err.message || "Some error occurred while creating the restaurant.",
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

// Retrieve all Restaurants from the database.
exports.findAll = (req, res) => {
  try {
    Restaurant.getAll((err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message || "Some error occurred while retrieving restaurants.",
        });
      else res.send({status:"OK",data});
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};

// Find a single Restaurant with a RestaurantId
exports.findOne = (req, res) => {
  try {
    Restaurant.findById(req.params.id, (err, data) => {
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
      } else res.send({status:"OK",data});
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};

// Update a Restaurant identified by the RestaurantId in the request
exports.update = (req, res) => {
  try {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }
    Restaurant.updateById(req.params.id, req.body, (err, data) => {
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
      } else res.send(data);
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};

// Delete a Restaurant with the specified id in the request
exports.delete = (req, res) => {
  try {
    Restaurant.remove(req.params.id, (err, data) => {
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
      } else res.send({ message: `people was deleted successfully!` });
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};

// Delete all Restaurants from the database.
exports.deleteAll = (req, res) => {
  try {
    Restaurant.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message ||
            "Some error occurred while removing all restaurants.",
        });
      else res.send({ message: `All people were deleted successfully!` });
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
    console.log("i am here login");
    Restaurant.login(req, (err, data) => {
      if (err)
        res.status(404).send({
          status: "ERROR",
          data:
            err.message || "Some error occurred while creating the Restaurant.",
        });
      else
      {
        data.password = null;
        res.status(200).send({
          status: "OK",
          data: data,
        });
      }
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};

exports.getTrendingResturents = (req, res) => {
  try {
    if(!req.body.lat || !req.body.lng){
      res.status(200).send({
        status: "ERROR",
        message:
          err.message || "lat and lng is required",
      });
      return;
    }
    Restaurant.getTrendingResturents(req,(err, data) => {
      if (err)
        res.status(200).send({
          status: "ERROR",
          message:
            err.message || "Some error occurred while retrieving restaurants.",
        });
      else res.send({status:"OK",data});
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};
