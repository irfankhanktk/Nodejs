const sql = require("../db.js");

function ResturantOrder(customerOrder) {
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
  this.updatedAt = customerOrder.updatedAt;
  this.createdAt = customerOrder.createdAt;
}

exports.findById = (id, result) => {
  console.log("i am here 3 orderId: ", id);
  try {
    let query = `CALL galorefood.sp_orders_getByOrderId("${id}")`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("i am here 3 res.length: ", res.length);
      if (res.length) {
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

exports.getAll = (req, result) => {
  try {
    let query = `CALL galorefood.sp_orders_getAl_by_resturendId("${req.params.resturantId}")`;
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

exports.updateById = (id, order, result) => {
  try {
    this.findById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found CustomerOrders with id ${id}.`,
          });
        }
      } else {
        for (let f in data) {
          if (order.hasOwnProperty(f)) {
            data[f] = order[f];
          }
        }
        sql.query(
          "UPDATE CustomerOrders SET ? WHERE id = ?",
          [new ResturantOrder(data), id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }

            if (res.affectedRows == 0) {
              // not found Resturant with the id
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

// exports.remove = (id, result) => {
//   try {
//     let query = `CALL galorefood.sp_orders_removeById("${id}")`;
//     sql.query(query, id, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found order with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("deleted CustomerOrders with id: ", id);
//       result(null, res);
//     });
//   } catch (err) {
//     result(err, null);
//   }
// };

// exports.removeAll = (result) => {
//   try {
//     let query = `CALL galorefood.sp_orders_removeAll`;
//     sql.query(query, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       console.log(`deleted ${res.affectedRows} CustomerOrders`);
//       result(null, res);
//     });
//   } catch (err) {
//     result(err, null);
//   }
// };
