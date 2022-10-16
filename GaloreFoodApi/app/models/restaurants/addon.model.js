const sql = require("../db.js");
const logger = require("../../libraries/loggerMiddleware");
const moment = require('moment');

// constructor
function AddOn (cat) {
  this.name = cat.name;
  this.createdAt = moment().format('llll');
  this.updatedAt = moment().format('llll');
  this.price = cat.price;
  this.restaurant_id = cat.restaurant_id;
};

AddOn.create = (newCat, result) => {
  try {
    sql.query("INSERT INTO RestaurantAddons SET ?", newCat, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created RestaurantAddons: ", {
        id: res.insertId,
        ...newCat,
      });
      result(null, { id: res.insertId, ...newCat });
    });
  } catch (err) {
    result(err, null);
  }
};

AddOn.findById = (itemId, result) => {
  try {
    let query = `CALL galorefood.sp_resturents_addons_get_byId(${itemId})`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found RestaurantAddons: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found restaurant with the id
      result({ kind: "not_found" }, null);
    });
  } catch (err) {
    result(err, null);
  }
};

AddOn.getAll = (req, result) => {
  try {
    let limit = parseInt(req.params.limit || 100);
    let pNumber = parseInt(req.params.pNumber);
    pNumber = pNumber - 1;
    let query = `CALL galorefood.sp_resturents_addons_get_all(${limit},${pNumber})`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

AddOn.updateById = (id, restaurant, result) => {
  try {
    AddOn.findById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found restaurant with id ${id}.`,
          });
        }
      } else {
        for (let prop in restaurant) {
          if (data.hasOwnProperty(prop)) {
            data[prop] = restaurant[prop];
          }
        }
        sql.query(
          "UPDATE RestaurantAddons SET ? WHERE id = ?",
          [new Restaurant(data), id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
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

AddOn.remove = (id, result) => {
  try {
    let query = `CALL sp_resturents_addons_delete_byid(${id})`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted RestaurantAddons with id: ", id);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

AddOn.removeAll = (result) => {
  try {
    sql.query("DELETE FROM RestaurantAddons", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

module.exports = AddOn;
