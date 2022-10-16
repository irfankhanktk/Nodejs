const sql = require("../db.js");
const logger = require("../../libraries/loggerMiddleware");

// constructor
function Restaurant(rest) {
  this.email = rest.email;
  this.name = rest.name;
  this.phone = rest.phone;
  this.cityId = rest.cityId;
  this.address = rest.address;
  this.img = rest.img;
  this.password = rest.password;
  this.minCartValue = rest.minCartValue;
  this.deliveryCharges = rest.deliveryCharges;
  this.openingTime = rest.openingTime;
  this.closingTime = rest.closingTime;
  this.trending = rest.trending;
  this.deliveryTime = rest.deliveryTime;
  this.personCost = rest.personCost;
  this.lat = rest.lat;
  this.lng = rest.lng;
  this.open = rest.open;
  this.type = rest.type;
  this.commissionType = rest.commissionType;
  this.commissionValue = rest.commissionValue;
  this.createdAt = rest.createdAt;
  this.updatedAt = rest.updatedAt;
  this.perKmCharge = rest.perKmCharge;
  this.deviceToken = rest.deviceToken;
};

Restaurant.create = (newRestaurant, result) => {
  try {
    sql.query("INSERT INTO restaurants SET ?", newRestaurant, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created restaurants: ", {
        id: res.insertId,
        ...newRestaurant,
      });
      result(null, { id: res.insertId, ...newRestaurant });
    });
  } catch (err) {
    result(err, null);
  }
};

Restaurant.findById = (restaurantId, result) => {
  try {
    sql.query(
      `SELECT * FROM restaurants WHERE id = ${restaurantId}`,
      (err, res) => {
        if (err) {
          console.log("error get by id: ", err);
          console.log("error: ", err);
          result(err, null);
          return;
        }

        // console.log("res[0] get by id: ", res[0]);

        if (res.length) {
          // console.log("found restaurants: ", res[0]);
          result(null, res[0]);
          return;
        }

        // not found restaurant with the id
        result({ kind: "not_found" }, null);
      }
    );
  } catch (err) {
    result(err, null);
  }
};

Restaurant.getAll = (result) => {
  try {
    sql.query("SELECT * FROM restaurants", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("restaurants: ", res);
      result(null, res[0]);
    });
  } catch (err) {
    result(err, null);
  }
};

Restaurant.updateById = (id, restaurant, result) => {
  try {
    Restaurant.findById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found restaurant with id ${id}.`,
          });
        }
      } else {
        // let _data = data[0];
        // for (let prop in restaurant) {
        //   if (_data.hasOwnProperty(prop)) {
        //     _data[prop] = restaurant[prop];
        //   }
        // }
        let _data = data;
        for (let f in restaurant) {
          _data[f] = restaurant[f];
        }
        sql.query(
          "UPDATE restaurants SET ? WHERE id = ?",
          [new Restaurant(_data), id],
          (err, res) => {
            if (err) {
              result(null, err);
              return;
            }

            if (res.affectedRows == 0) {
              // not found restaurant with the id
              result({ kind: "not_found" }, null);
              return;
            }
            result(null, { id: id, ...data });
          }
        );
      }
    });
  } catch (err) {
    result(err, null);
  }
};

Restaurant.remove = (id, result) => {
  // try {
  //   sql.query("DELETE FROM restaurants WHERE id = ?", id, (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }

  //     if (res.affectedRows == 0) {
  //       // not found Customer with the id
  //       result({ kind: "not_found" }, null);
  //       return;
  //     }

  //     console.log("deleted restaurants with id: ", id);
  //     result(null, res);
  //   });
  // } catch (err) {
  //   result(err, null);
  // }
};

Restaurant.removeAll = (result) => {
  // try {
  //   sql.query("DELETE FROM restaurants", (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }

  //     console.log(`deleted ${res.affectedRows} restaurants`);
  //     result(null, res);
  //   });
  // } catch (err) {
  //   result(err, null);
  // }
};

Restaurant.login = (req, result) => {
  try {
    var email = req.body.email;
    var password = req.body.password;
    var query = `SELECT * FROM restaurants WHERE email = '${email}' AND password = '${password}'`;

    sql.query(query, (err, _result) => {
      console.log("err: ", err);
      if (err) {
        result(err, null);
        return;
      } else if (_result.length == 0) {
        result({ message: "NOT_FOUND" }, null);
        return;
      }
      result(null, _result[0]);
    });
  } catch (err) {
    result(err, null);
  }
};


Restaurant.getTrendingResturents = (req, result) => {
  try {
    let limit = parseInt(req.params.limit);
    let pNumber = parseInt(req.params.pNumber);
    pNumber = pNumber - 1;
    let query = `CALL sp_trending_get_all ("${req.body.lat}","${req.body.lng}",${limit},${pNumber})`
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("restaurants: ", res);
      result(null, res[0]);
    });
  } catch (err) {
    result(err, null);
  }
};

module.exports = Restaurant;
