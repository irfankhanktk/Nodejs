const sql = require("../db.js");
const logger = require("../../libraries/loggerMiddleware");

// constructor
function CustomerOrder(order) {
  this.id = order.id;
  this.userId = order.userId;
  this.username = order.username;
  this.userEmail = order.userEmail;
  this.userPhoneNumber = order.userPhoneNumber;
  this.restaurantId = order.restaurantId;
  this.menuId = order.menuId;
  this.lat = order.lat;
  this.lng = order.lng;
  this.address = order.address;
  this.status = order.status;
  this.totalAmount = order.totalAmount;
  this.deliveryCharges = order.deliveryCharges;
  this.createdAt = order.createdAt;
  this.updatedAt = order.updateAt;
}

CustomerOrder.getPending = (req, result) => {
  try {
    let status = "'accepted'";
    let latLowerRange = req.lat - 5;
    let latUpperRange = req.lat + 5;
    let lngLowerRange = req.lng - 5;
    let lngUpperRange = req.lng + 5;

    sql.query(
      `SELECT * FROM customerorders WHERE status = "${status}" && lat BETWEEN ${latLowerRange} AND ${latUpperRange} && lng BETWEEN ${lngLowerRange} AND ${lngUpperRange} `,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        console.log("nearby pending orders: ", res);
        result(null, res);
      }
    );
  } catch (err) {
    result(err, null);
  }
};

CustomerOrder.findById = (itemId, result) => {
  try {
    let query = `CALL galorefood.sp_customerorders_getbyid("${itemId}")`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found customerorder findById: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found customerorder with the id
      result({ kind: "not_found" }, null);
    });
  } catch (err) {
    result(err, null);
  }
};

CustomerOrder.updateById = (id, customerOrder, result) => {
  try {
    CustomerOrder.findById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found customerOrder with id ${id}.`,
          });
        }
      } else {
        for (let prop in customerOrder) {
          if (data.hasOwnProperty(prop)) {
            data[prop] = customerOrder[prop];
          }
        }
        sql.query(
          "UPDATE customerorders SET ? WHERE id = ?",
          [new CustomerOrder(data), id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }

            if (res.affectedRows == 0) {
              // not found customerOrder with the id
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

CustomerOrder.findDeliveredByRiderId = (itemId, result) => {
  try {
    let status = "delivered";
    let query = `CALL galorefood.sp_customerorders_findDeliveryByRiderId("${itemId}","${status}")`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found customerorder findDeliveredByRiderId: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found delivered customerorder with the id
      result({ kind: "not_found" }, null);
    });
  } catch (err) {
    result(err, null);
  }
};

CustomerOrder.findActiveOrder = (itemId, result) => {
  try {
    console.log("what is item id", itemId);
    // let query = `CALL galorefood.sp_order_rideractiveorder("${itemId}")`;
    
    let query = `SELECT * FROM customerorders WHERE acceptedBy = ${itemId} AND status = 'rider_picked'`;
    
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found customerorder findActiveOrder: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found delivered customerorder with the id
      result({ kind: "not_found" }, null);
    });
  } catch (err) {
    result(err, null);
  }
};

module.exports = CustomerOrder;
