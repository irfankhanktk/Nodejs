"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sql = require("./db"); // constructor


function addressModel(addressData) {
  this.user_id = addressData.user_id;
  this.address = addressData.address;
  this.name = addressData.name;
  this.location_details = addressData.location_details;
  this.note_to_rider = addressData.note_to_rider;
  this.dateAdded = addressData.dateAdded;
}

;

addressModel.addNewAddress = function (newAddress, result) {
  try {
    sql.query("INSERT INTO addresses SET ?", newAddress, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, _objectSpread({
        id: res.insertId
      }, newAddress));
    });
  } catch (err) {
    result(err, null);
  }
};

addressModel.getAddressByUserId = function (req, result) {
  try {
    var limit = parseInt(req.params.limit);
    var pNumber = parseInt(req.params.pNumber);
    pNumber = pNumber - 1;
    var query = "CALL galorefood.sp_address_getByUserId(\"".concat(req.params.userId, "\",").concat(limit, ",").concat(pNumber, ")");
    sql.query(query, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found order: ", res[0]);
        result(null, res[0]);
        return;
      } // not found order with the id


      result({
        kind: "not_found"
      }, null);
    });
  } catch (err) {
    result(err, null);
  }
};

addressModel.findbyAddressId = function (id, result) {
  console.log("i am here 3 orderId: ", id);

  try {
    var query = "CALL galorefood.sp_address_getByAddressId(\"".concat(id, "\")");
    sql.query(query, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("i am here 3 res.length: ", res.length);

      if (res.length) {
        result(null, res[0]);
        return;
      } // not found order with the id


      result({
        kind: "not_found"
      }, null);
    });
  } catch (err) {
    result(err, null);
  }
};

addressModel.updateAddress = function (id, order, result) {
  try {
    addressModel.findbyAddressId(id, function (err, data) {
      console.log('i am here :  ', data);

      if (err || !data[0]) {
        result(err || "no result found", null);
        return;
      } else {
        var _data = data[0];

        if (_data) {
          for (var prop in order) {
            if (_data.hasOwnProperty(prop)) {
              _data[prop] = order[prop];
            }
          }

          sql.query("UPDATE addresses SET ? WHERE id = ?", [new addressModel(_data), id], function (err, res) {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }

            result(null, _objectSpread({
              id: id
            }, data));
          });
        }
      }
    });
  } catch (err) {
    result(err, null);
  }
};

addressModel.deleteAddress = function (req, result) {
  try {
    console.log("req.params.addrssId: ", req.params.addrssId);
    var query = "delete from galorefood.addresses where id = ".concat(req.params.addrssId);
    console.log("query: ", query);
    sql.query(query, function (err, res) {
      console.log("error: ", err);

      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("deleted addressModel with id: ", req.params.addrssId);
      result(null, res);
    });
  } catch (err) {
    console.log("in catch: ", err);
    result(err, null);
  }
};

module.exports = addressModel;