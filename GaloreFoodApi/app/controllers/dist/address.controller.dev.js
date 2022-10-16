"use strict";

var addressModel = require("../models/address.model");

var logger = require("../libraries/loggerMiddleware");

exports.addNewAddress = function (req, res) {
  try {
    if (!req.body) {
      res.status(400).send({
        status: "ERROR",
        message: "Content can not be empty!"
      });
    }

    var addressData = req.body;
    var newAddress = new addressModel({
      user_id: addressData.user_id,
      address: addressData.address,
      name: addressData.name,
      location_details: addressData.location_details,
      note_to_rider: addressData.note_to_rider,
      dateAdded: new Date()
    });
    addressModel.addNewAddress(newAddress, function (err, data) {
      if (err) res.status(200).send({
        status: "ERROR",
        data: err.message || "Some error occurred while creating the addressModel."
      });else res.status(200).send({
        status: "OK",
        data: data
      });
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message
    });
  }
}; // get by resturent Id


exports.deleteAddress = function (req, res) {
  try {
    if (!req.params.addrssId) {
      res.status(400).send({
        status: "ERROR",
        message: "addrssId required"
      });
    }

    addressModel.deleteAddress(req, function (err, data) {
      if (err) {
        res.status(200).send({
          status: "ERROR",
          message: "Error retrieving address with id " + req.params.addrssId
        });
      } else res.send({
        status: "OK",
        data: data
      });
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message
    });
  }
};

exports.getAddressByUserId = function (req, res) {
  try {
    if (!req.params.userId) {
      res.status(400).send({
        status: "ERROR",
        message: "userId required"
      });
    }

    addressModel.getAddressByUserId(req, function (err, data) {
      if (err) {
        if (err.kind === "not_found") {
          res.status(200).send({
            status: "ERROR",
            message: "Not found order with id ".concat(req.params.id, ".")
          });
        } else {
          res.status(200).send({
            status: "ERROR",
            message: "Error retrieving order with id " + req
          });
        }
      } else res.send({
        status: "OK",
        data: data
      });
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message
    });
  }
}; // Update a customer identified by the customerId in the request


exports.updateAddress = function (req, res) {
  try {
    // Validate Request
    if (!req.body || !req.params.addrssId) {
      res.status(200).send({
        status: "ERROR",
        message: "body and addrssId can not be empty!"
      });
    }

    addressModel.updateAddress(req.params.addrssId, req.body, function (err, data) {
      if (err) {
        if (err.kind === "not_found") {
          res.status(200).send({
            status: "ERROR",
            message: "Not found with id ".concat(req.params.addrssId, ".")
          });
        } else {
          res.status(200).send({
            status: "ERROR",
            message: "Error updating people with id " + req.params.addrssId
          });
        }
      } else res.send({
        status: "OK",
        data: data
      });
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message
    });
  }
};