const MenuItem = require("../../models/restaurants/menuItem.model.js");
const srvAddOptions = require("../../services/addOptions.js");
const logger = require("../../libraries/loggerMiddleware");

// Create and Save a new menu
exports.create = (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }

    // Create a menu
    const menu = new MenuItem({
      catId: req.body.catId,
      storeId: req.body.storeId,
      name: req.body.name,
      description: req.body.description,
      isVeg: req.body.isVeg,
      status: req.body.status,
      image: req.body.image,
      sort_no: req.body.sort_no,
      quantity: req.body.quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save menu in the database
    MenuItem.create(menu, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          data:
            err.message || "Some error occurred while creating the MenuItem.",
        });
      else {
        if (req.body.custom_options) {
          srvAddOptions
            .createMenuOptions(data.id, req.body.custom_options)
            .then(() => {
              res.status(200).send({
                status: "OK",
                data: data,
              });
            });
        } else {
          res.status(200).send({
            status: "OK",
            data: data,
          });
        }
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

// Retrieve all menus from the database.
exports.findAll = (req, res) => {
  try {
    MenuItem.getAll(req.params.id,(err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message: err.message || "Some error occurred while retrieving menus.",
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

// Find a single menus with a menuId
exports.findOne = (req, res) => {
  try {
    console.log(req.params.id);
    MenuItem.findById(req.params.id, (err, data) => {
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

// Update a menu identified by the menuId in the request
exports.update = (req, res) => {
  try {
    console.log("req id", req.params.id);
    console.log("req id", req.body);
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!",
      });
    }
    MenuItem.updateById(req.params.id, req.body, (err, data) => {
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

// Delete a menus with the specified id in the request
exports.delete = (req, res) => {
  try {
    MenuItem.remove(req.params.id, (err, data) => {
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

// Delete all menus from the database.
exports.deleteAll = (req, res) => {
  try {
    MenuItem.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message || "Some error occurred while removing all menus.",
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

exports.menuListByCat = (req, res) => {
  try {
    MenuItem.getByCat(req.params.id, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message: err.message || "Some error occurred while retrieving menus.",
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


exports.menuOptionById = (req, res) => {
  try {
    MenuItem.menuOptionById(req.params.id, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message: err.message || "Some error occurred while retrieving menus.",
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
