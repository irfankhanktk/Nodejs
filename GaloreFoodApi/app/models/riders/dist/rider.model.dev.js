"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sql = require("../db.js");

var apiService = require("../../libraries/api.service"); // constructor


function Rider(rider) {
  this.phoneNumber = rider.phoneNumber;
  this.name = rider.name;
  this.email = rider.email;
  this.password = rider.password;
  this.lat = rider.lat, this.lng = rider.lng, this.createdAt = rider.createdAt;
  this.lastUpdated = rider.lastUpdated;
}

Rider.create = function (newRider, result) {
  try {
    sql.query("INSERT INTO riders SET ?", newRider, function (err, res) {
      if (err) {
        result(err, null);
        return;
      }

      console.log("created rider: ", _objectSpread({
        id: res.insertId
      }, newRider));
      result(null, _objectSpread({
        id: res.insertId
      }, newRider));
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.findById = function (riderId, result) {
  try {
    var query = "CALL galorefood.sp_rider_findById(\"".concat(riderId, "\")");
    sql.query(query, function (err, res) {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      } // not found Rider with the id


      result({
        kind: "not_found"
      }, null);
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.getAll = function (result) {
  try {
    var query = "CALL galorefood.sp_rider_selectAll";
    sql.query(query, function (err, res) {
      if (err) {
        result(null, err);
        return;
      }

      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.updateById = function (id, rider, result) {
  try {
    Rider.findById(id, function (err, data) {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Not found riders with id ".concat(id, ".")
          });
        }
      } else {
        var _data = data[0];

        for (var f in rider) {
          _data[f] = rider[f];
        }

        sql.query("UPDATE riders SET ? WHERE id = ?", [new Rider(_data), id], function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }

          if (res.affectedRows == 0) {
            // not found Rider with the id
            result({
              kind: "not_found"
            }, null);
            return;
          }

          console.log("updated rider: ", _objectSpread({
            id: id
          }, data));
          result(null, _objectSpread({
            id: id
          }, data));
        });
      }
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.remove = function (riderId, result) {
  try {
    var query = "CALL galorefood.sp_rider_removeById(\"".concat(riderId, "\")");
    sql.query(query, function (err, res) {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found rider with the id
        result({
          kind: "not_found"
        }, null);
        return;
      }

      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.removeAll = function (result) {
  try {
    var query = "CALL galorefood.sp_rider_removeAll";
    sql.query(query, function (err, res) {
      if (err) {
        result(null, err);
        return;
      }

      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.login = function (req, result) {
  try {
    var email = req.body.phoneNumber;
    var password = req.body.password;
    var query = "CALL galorefood.sp_rider_authenticate(\"".concat(email, "\", \"").concat(password, "\")");
    sql.query(query, function (err, _result, fields) {
      if (err) {
        result(null, err);
      }

      var rider = Object.values(JSON.parse(JSON.stringify(_result[0])));
      result(null, {
        user: rider[0]
      });
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.sendPushToNearbyRiders = function (req, result) {
  try {
    var query = "CALL sp_riders_token_nearby (\"".concat(req.body.lat, "\",\"").concat(req.body.lng, "\")");
    sql.query(query, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res && res.length) {
        var deviceTokens = res[0].map(function (item) {
          return item['deviceToken'];
        });

        if (deviceTokens && deviceTokens.length) {
          var data = {
            message: 'New order received',
            token: deviceTokens,
            pushData: JSON.stringify({
              data: 'abc'
            })
          };
          apiService.get("https://us-central1-galorefoods-2f032.cloudfunctions.net/sendPushNotification?dest=".concat(JSON.stringify(data)), function (res) {
            result(null, res);
          });
          return;
        }

        result(null, deviceTokens);
        return;
      }

      result(null, []);
    });
  } catch (err) {
    result(err, null);
  }
};

module.exports = Rider;