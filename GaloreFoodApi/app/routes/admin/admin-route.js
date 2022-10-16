module.exports = app => {
    const customerOrders = require("../../controllers/admin-controller/admin-controller.js");
    // get weekly orders
    app.get("/api/admin/orders/getCustomerOrdersWeekly/:from_date/:to_date/:rider_id", customerOrders.CustomerOrdersByWeekly);
    // get count and sum of orders
    app.get("/api/admin/orders/getOrdersCountSum", customerOrders.CustomerOrdersCountSum);
    // for riders in home screen
    app.get("/api/admin/rider/findAll/:skip", customerOrders.findAll);
};
