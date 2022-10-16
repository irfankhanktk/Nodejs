const sql = require("../db.js");
const logger = require("../../libraries/loggerMiddleware");

// constructor
function Category (cat) {
  this.name = cat.name;
  this.createdAt = cat.createdAt;
  this.updatedAt = cat.updatedAt;
  this.isActive = cat.isActive;
  this.restaurant_id = cat.restaurant_id;
};

Category.create = (newCat, result) => {
  try {
    sql.query("INSERT INTO MenuCategories SET ?", newCat, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created MenuCategories: ", { id: res.insertId, ...newCat });
      result(null, { id: res.insertId, ...newCat });
    });
  } catch (err) {
    result(err, null);
  }
};

Category.findById = (itemId, result) => {
  try {
    let query = `CALL galorefood.sp_menucategories_getByIdl("${itemId}")`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found MenuCategories: ", res[0]);
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


Category.findByResId = (itemId, result) => {
  try {
    let query = `CALL galorefood.sp_menucategories_getByRestId("${itemId}")`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found MenuCategories: ", res[0]);
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

Category.getAll = (result) => {
  try {
    let query = "CALL galorefood.sp_menucategories_getall";
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

Category.updateById = (id, restaurant, result) => {
  try {
    Category.findById(id, (err, data) => {
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
          "UPDATE MenuCategories SET ? WHERE id = ?",
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

Category.remove = (id, result) => {
  try {
    let query = "CALL galorefood.sp_menucategories_deletebyid";
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

      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

Category.removeAll = (result) => {
  try {
    let query = "CALL galorefood.sp_menucategories_deleteall";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      // console.log(`deleted ${res.affectedRows} ca`);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

module.exports = Category;
