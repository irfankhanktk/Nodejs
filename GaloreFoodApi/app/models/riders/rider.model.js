const sql = require("../db.js");
const apiService = require("../../libraries/api.service");

// constructor
function Rider(rider) {
  this.phoneNumber = rider.phoneNumber;
  this.name = rider.name;
  this.email = rider.email;
  this.password = rider.password;
  this.lat = rider.lat;
  this.lng = rider.lng;
  this.balance = rider.balance;
  this.createdAt = rider.createdAt;
  this.lastUpdated = rider.lastUpdated;
  this.deviceToken = rider.deviceToken;
}

Rider.create = (newRider, result) => {
  try {
    sql.query("INSERT INTO riders SET ?", newRider, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      console.log("created rider: ", { id: res.insertId, ...newRider });
      result(null, { id: res.insertId, ...newRider });
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.findById = (riderId, result) => {
  try {
    let query = `CALL galorefood.sp_rider_findById("${riderId}")`;
    sql.query(query, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      // not found Rider with the id
      result({ kind: "not_found" }, null);
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.getAll = (params,result) => {
  try {
    let query = `CALL galorefood.sp_rider_selectAll ('${params.skip}')`;
    sql.query(query, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res[0]);
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.updateById = (id, rider, result) => {
  try {
    Rider.findById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found riders with id ${id}.`,
          });
        }
      } else {
        let _data = data[0];
        for (let f in rider) {
          _data[f] = rider[f];
        }
        sql.query(
          "UPDATE riders SET ? WHERE id = ?",
          [new Rider(_data), id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }

            if (res.affectedRows == 0) {
              // not found Rider with the id
              result({ kind: "not_found" }, null);
              return;
            }

            console.log("updated rider: ", { id: id, ...data });
            result(null, { id: id, ...data });
          }
        );
      }
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.remove = (riderId, result) => {
  try {
    let query = `CALL galorefood.sp_rider_removeById("${riderId}")`;
    sql.query(query, (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found rider with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

Rider.removeAll = (result) => {
  try {
    let query = `CALL galorefood.sp_rider_removeAll`;
    sql.query(query, (err, res) => {
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

Rider.login = (req, result) => {
  try {
    var email = req.body.phoneNumber;
    var password = req.body.password;
    let query = `CALL galorefood.sp_rider_authenticate("${email}", "${password}")`;
    sql.query(query, (err, _result, fields) => {
      if (err) {
        result(null, err);
      }
      const rider = Object.values(JSON.parse(JSON.stringify(_result[0])));
      result(null, { user: rider[0] });
    });
  } catch (err) {
    result(err, null);
  }
};


Rider.sendPushToNearbyRiders = (req, result) => {
  try {
    let query = `CALL sp_riders_token_nearby ("${req.body.lat}","${req.body.lng}")`
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res && res.length) {
        var deviceTokens = res[0].map((item) => {
          return item['deviceToken'];
        });

        if (deviceTokens && deviceTokens.length) {
          let data = {
            message: 'New order received',
            token: deviceTokens,
            pushData: JSON.stringify({ data: 'abc' })
          }
          apiService.get(`https://us-central1-galorefoods-2f032.cloudfunctions.net/sendPushNotification?dest=${JSON.stringify(data)}`, (res) => {
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
