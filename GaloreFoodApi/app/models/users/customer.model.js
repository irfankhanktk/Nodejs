const sql = require("../db.js");

// constructor
function Customer(customer) {
  this.name = customer.name;
  this.phoneNumber = customer.phoneNumber;
  this.isPhoneVerified = customer.isPhoneVerified || false;
  this.profileUrl = customer.profileUrl;
  this.password = customer.password;
  this.createdAt = customer.createdAt;
  this.lastUpdated = customer.lastUpdated;
  this.deviceToken = customer.deviceToken;
};

Customer.create = (newCustomer, result) => {
  try {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created customer: ", { id: res.insertId, ...newCustomer });
      result(null, { id: res.insertId, ...newCustomer });
    });
  } catch (err) {
    result(err, null);
  }
};

Customer.findById = (customerId, result) => {
  try {
    let query = `CALL galorefood.sp_customer_findById("${customerId}")`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  } catch (err) {
    result(err, null);
  }
};

Customer.getAll = (result) => {
  try {
    let query = `CALL galorefood.sp_customer_getAll`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("customers: ", res);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

Customer.updateById = (id, customer, result) => {
  try {
    Customer.findById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found customers with id ${id}.`,
          });
        }
      } else {
        let _data = data[0];
        for (let prop in customer) {
          if (_data.hasOwnProperty(prop)) {
            _data[prop] = customer[prop];
          }
        }
        console.log("what is updating?",new Customer(_data));
        sql.query(
          "UPDATE customers SET ? WHERE id = ?",
          [new Customer(_data), id],
          (err, res) => {
            if (err) {
              result(null, err);
              return;
            }

            if (res.affectedRows == 0) {
              // not found Customer with the id
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

Customer.remove = (id, result) => {
  try {
    let query = `CALL galorefood.sp_customer_removeById("${id}")`;
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

      console.log("deleted customers with id: ", id);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

Customer.removeAll = (result) => {
  let query = `CALL galorefood.sp_customer_removeAll`;
  try {
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

Customer.login = (req, result) => {
  try {
    var email = req.body.email;
    var password = req.body.password;

    let query = `CALL galorefood.sp_customer_authenticate("${email}", "${password}")`;
    sql.query(query, (err, _result, fields) => {
      if (err) {
        result(null, err);
      }
      result(null, _result[0]);
    });
  } catch (err) {
    result(err, null);
  }
};

module.exports = Customer;
