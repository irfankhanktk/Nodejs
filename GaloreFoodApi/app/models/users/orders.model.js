const sql = require("../db.js");
const Customer = require("./customer.model.js");

// constructor
function CustomerOrder(customerOrder) {
  this.userId = customerOrder.userId;
  this.username = customerOrder.username;
  this.userEmail = customerOrder.userEmail;
  this.userPhoneNumber = customerOrder.userPhoneNumber;
  this.restaurantId = customerOrder.restaurantId;
  this.menuId = customerOrder.menuId;
  this.lat = customerOrder.lat;
  this.lng = customerOrder.lng;
  this.address = customerOrder.address;
  this.status = customerOrder.status;
  this.totalAmount = customerOrder.totalAmount;
  this.deliveryCharges = customerOrder.deliveryCharges;
  this.menu_options = customerOrder.menu_options;
  this.quantity = parseInt(customerOrder.quantity);
  this.updatedAt = customerOrder.updatedAt;
  this.createdAt = customerOrder.createdAt;
  this.restaurantInfo = customerOrder.restaurantInfo;
  this.menuInfo = customerOrder.menuInfo;
  
};

CustomerOrder.create = (newCustomerOrder, result) => {
  try {
    sql.query(
      "INSERT INTO CustomerOrders SET ?",
      newCustomerOrder,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created CustomerOrders: ", {
          id: res.insertId,
          ...newCustomerOrder,
        });
        result(null, { id: res.insertId, ...newCustomerOrder });
      }
    );
  } catch (err) {
    result(err, null);
  }
};

CustomerOrder.findById = (customerId, result) => {
  try {
    let query = `CALL galorefood.sp_orders_getByUserId("${customerId}")`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found order: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found order with the id
      result({ kind: "not_found" }, null);
    });
  } catch (err) {
    result(err, null);
  }
};

CustomerOrder.getAll = (result) => {
  try {
    let query = `CALL galorefood.sp_orders_getAll("${orderId}")`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("CustomerOrders: ", res);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

CustomerOrder.updateById = (id, order, result) => {
  try {
    CustomerOrder.findById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found CustomerOrders with id ${id}.`,
          });
        }
      } else {
        for (let prop in order) {
          if (data.hasOwnProperty(prop)) {
            data[prop] = order[prop];
          }
        }
        sql.query(
          "UPDATE CustomerOrders SET ? WHERE id = ?",
          [new CustomerOrder(data), id],
          (err, res) => {
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

            console.log("updated order: ", { id: id, ...data });
            result(null, { id: id, ...data });
          }
        );
      }
    });
  } catch (err) {
    result(err, null);
  }
};

CustomerOrder.remove = (id, result) => {
  try {
    let query = `CALL galorefood.sp_orders_removeById("${id}")`;
    sql.query(query, id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found order with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted CustomerOrders with id: ", id);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

CustomerOrder.removeAll = (result) => {
  try {
    let query = `CALL galorefood.sp_orders_removeAll`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} CustomerOrders`);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

CustomerOrder.getCustomerOrders= (id,result) => {
  try {
    let query = `SELECT * FROM galorefood.customerorders where userId = ${id}`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} CustomerOrders`);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};
CustomerOrder.getCustomerOrdersWeekly= (params,result) => {
  try {
    // let limit = parseInt(params.limit);
    // let pNumber = parseInt(params.pNumber);
    // pNumber = pNumber - 1;
    let query = `CALL galorefood.sp_get_weekly_orders("${params.from_date}","${params.to_date}","${params.rider_id}")`;
    // let query = `SELECT * FROM customerorders WHERE createdAt>= DATE_SUB(DATE('${filterDate}'), INTERVAL 7 DAY);`;
    // let query = `call galorefood.sp_get_weekly_orders ${filterDate}`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res[0]);
    });
  } catch (err) {
    result(err, null);
  }
};
CustomerOrder.getCountOfOriginalAmount= (result) => {
  try {
    // let limit = parseInt(params.limit);
    // let pNumber = parseInt(params.pNumber);
    // pNumber = pNumber - 1;
    let query = `CALL galorefood.sp_count_sum_org_amt`;
    // let query = `SELECT * FROM customerorders WHERE createdAt>= DATE_SUB(DATE('${filterDate}'), INTERVAL 7 DAY);`;
    // let query = `call galorefood.sp_get_weekly_orders ${filterDate}`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res[0][0]);
    });
  } catch (err) {
    result(err, null);
  }
};

CustomerOrder.getCustomerActiveOrder= (id,result) => {
  try {
    let query = `SELECT * FROM customerorders WHERE userId = ${id} AND status != 'delivered' AND status != 'cancelled'`;
   
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} CustomerOrders`);
      result(null, res);
    });
  } catch (err) {
    result(err, null);
  }
};

module.exports = CustomerOrder;
