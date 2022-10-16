const sql = require("../db.js");

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

CustomerOrder.getAll = (params,result) => {
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







CustomerOrder.getCustomerOrdersWeekly= (params,result) => {
  try {
    let query = `CALL galorefood.sp_get_weekly_orders("${params.from_date}","${params.to_date}","${params.rider_id}")`;
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


// sum of original amount and count of orders
CustomerOrder.getCountOfOriginalAmount= (result) => {
  try {
  
    let query = `CALL galorefood.sp_count_sum_org_amt`;
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


// get all riders for home screen
CustomerOrder.getAll = (params,result) => {
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

module.exports = CustomerOrder;
