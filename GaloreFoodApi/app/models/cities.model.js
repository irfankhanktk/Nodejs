const sql = require("./db.js");
const logger = require("../libraries/loggerMiddleware");

// constructor
function City (city) {
  this.name = city.name;
  this.status = city.status;
  this.createdAt = city.createdAt;
  this.lastUpdated = city.lastUpdated;
};

City.create = (newCity, result) => {
  try {
    sql.query("INSERT INTO cities SET ?", newCity, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created cities: ", { id: res.insertId, ...newCity });
      result(null, { id: res.insertId, ...newCity });
    });
  } catch (err) {
    result(err, null);
  }
};

City.findById = (citiesId, result) => {
  try {
    let query = `CALL galorefood.sp_cities_findById("${citiesId}")`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found cities: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found city with the id
      result({ kind: "not_found" }, null);
    });
  } catch (err) {
    result(err, null);
  }
};

City.getAll = (result) => {
  try {
    let query = `CALL galorefood.sp_cities_getAll`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("cities: ", res);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

City.updateById = (id, city, result) => {
  try {
    City.findById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found cities with id ${id}.`,
          });
        }
      } else {
        for (let prop in city) {
          if (data.hasOwnProperty(prop)) {
            data[prop] = city[prop];
          }
        }
        sql.query(
          "UPDATE cities SET ? WHERE id = ?",
          [new City(data), id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }

            if (res.affectedRows == 0) {
              // not found cities with the id
              result({ kind: "not_found" }, null);
              return;
            }

            console.log("updated cities: ", { id: id, ...data });
            result(null, { id: id, ...data });
          }
        );
      }
    });
  } catch (err) {
    result(err, null);
  }
};

City.remove = (id, result) => {
  try {
    let query = `CALL galorefood.sp_cities_removeById("${id}")`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found cities with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted cities with id: ", id);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

City.removeAll = (result) => {
  try {
    let query = `CALL galorefood.sp_cities_removeAll("${id}")`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} citiess`);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

module.exports = City;
