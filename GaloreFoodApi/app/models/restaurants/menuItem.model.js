const sql = require("../db.js");
const logger = require("../../libraries/loggerMiddleware");

// constructor
function MenuItem (menu) {
  this.catId = menu.catId;
  this.storeId = menu.storeId;
  this.name = menu.name;
  this.description = menu.description;
  this.isVeg = menu.isVeg;
  this.status = menu.status;
  this.image = menu.image;
  this.sort_no = menu.sort_no;
  this.quantity = menu.quantity;
  this.createdAt = menu.createdAt;
  this.updatedAt = menu.updatedAt;
};

MenuItem.create = (newItem, result) => {
  try {
    sql.query("INSERT INTO menuitems SET ?", newItem, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, { id: res.insertId, ...newItem });
    });
  } catch (err) {
    result(err, null);
  }
};

MenuItem.findById = (itemId, result) => {
  try {
    let query = `CALL galorefood.sp_menuitems_getbyid(${itemId})`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found menuitems: ", res[0]);
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

MenuItem.getAll = (resId,result) => {
  try {
    let query = `CALL galorefood.sp_menuitems_getall(${resId})`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("menus: ", res);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

MenuItem.updateById = (id, restaurant, result) => {
  try {
    MenuItem.findById(id, (err, data) => {
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
        console.log("what is menu", restaurant);
        
        console.log("what is menu", restaurant);
        let _data = data[0];
        for (let f in restaurant) {
          console.log("what is f?",f);
          _data[f] = restaurant[f];
        }
        console.log("data",_data);
        sql.query(
          "UPDATE menuitems SET ? WHERE id = ?",
          [new MenuItem(_data), id],
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

MenuItem.remove = (id, result) => {
  try {
    let query = `CALL galorefood.sp_menuitems_deletebyid ("${id}")`;
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

      console.log("deleted menuitems with id: ", id);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

MenuItem.removeAll = (result) => {
  try {
    let query = `CALL galorefood.sp_menuitems_deleteall`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} menu`);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

MenuItem.getByCat = (id, result) => {
  try {
    sql.query(
      `SELECT DISTINCT menucategories.name, menuitems.description FROM menucategories JOIN menuitems on menucategories.id = menuitems.catId Where menucategories.restaurant_id = ${id}`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        console.log(`got ${res.affectedRows} menu`);
        result(null, res);
      }
    );
  } catch (err) {
    result(err, null);
  }
};

MenuItem.menuOptionById = (id, result) => {
  try {
    let query = `CALL galorefood.sp_menuoptions_getById(${id})`;
    sql.query(query,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        console.log(`got ${res.affectedRows} menu`);
        result(null, res && res[0] ? res[0] : []);
      }
    );
  } catch (err) {
    result(err, null);
  }
};

module.exports = MenuItem;
