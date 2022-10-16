const Rider = require("../models/riders/rider.model.js");
const logger = require("../libraries/loggerMiddleware");

const sql = require("./db");

// constructor
function ordersModel(orderData) {
    this.userId = orderData.userId;
    this.username = orderData.username;
    this.userEmail = orderData.userEmail;
    this.userPhoneNumber = orderData.userPhoneNumber;
    this.restaurantId = orderData.restaurantId;
    this.menuId = orderData.menuId;
    this.lat = orderData.lat;
    this.lng = orderData.lng;
    this.address = orderData.address;
    this.status = orderData.status;
    this.totalAmount = orderData.totalAmount;
    this.deliveryCharges = orderData.deliveryCharges;
    this.menu_options = orderData.menu_options;
    this.quantity = parseInt(orderData.quantity);
    this.acceptedBy = orderData.acceptedBy;
    this.cancelReason = orderData.cancelReason;
    this.updatedAt = orderData.updatedAt;
    this.createdAt = orderData.createdAt;
};

ordersModel.addNewOrders = (newOrder, result) => {
    try {
        sql.query(
            "INSERT INTO CustomerOrders SET ?",
            newOrder,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, { id: res.insertId, ...newOrder });
            }
        );
    } catch (err) {
        result(err, null);
    }
};

ordersModel.getOrdersByUserId = (req, result) => {
    try {
        let limit = parseInt(req.params.limit);
        let pNumber = parseInt(req.params.pNumber);
        pNumber = pNumber - 1;
        let query = `CALL galorefood.sp_orders_getByUserId("${req.params.id}",${limit},${pNumber})`;
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

ordersModel.getOrdersByResturentId = (req, result) => {
    try {
        let limit = parseInt(req.params.limit);
        let pNumber = parseInt(req.params.pNumber);
        pNumber = pNumber - 1;
        let query = `CALL galorefood.sp_orders_getByResturentId("${req.params.id}",${limit},${pNumber})`;
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


ordersModel.getNearbyPendingOrders = (req, result) => {
    try {
        // let limit = parseInt(req.params.limit);
        // let pNumber = parseInt(req.params.pNumber);
        // pNumber = pNumber - 1;
        // "${req.params.riderId}","${req.body.lat}","${req.body.lng}",${limit},${pNumber}
        let query = `CALL galorefood.sp_orders_getNearByPendingl()`;

        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("restaurants: ", res);
            result(null, res);
        });
    } catch (err) {
        result(err, null);
    }
};

ordersModel.getAllOrders = (result) => {
    try {
        let query = `CALL galorefood.sp_orders_getAll()`;
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


ordersModel.findById = (id, result) => {
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

ordersModel.updateOrderByOrderId = (id, order, result) => {
    try {
        ordersModel.findById(id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ordersModel with id ${id}.`,
                    });
                }
            } else {
                let _data = data[0];
                for (let prop in order) {
                    if (_data.hasOwnProperty(prop)) {
                        _data[prop] = order[prop];
                    }
                }

                sql.query(
                    "UPDATE CustomerOrders SET ? WHERE id = ?",
                    [new ordersModel(_data), id],
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
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

ordersModel.deleteOrder = (id, result) => {
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

            console.log("deleted ordersModel with id: ", id);
            result(null, res);
        });
    } catch (err) {
        result(err, null);
    }
};

module.exports = ordersModel;
