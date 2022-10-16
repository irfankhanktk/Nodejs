module.exports = app => {
    const customerOrders = require("../../controllers/users/orders.module.js");
    // get weekly orders
    app.get("/api/customer/orders/getCustomerOrdersWeekly/:from_date/:to_date/:rider_id", customerOrders.CustomerOrdersByWeekly);
    // get count and sum of orders
    app.get("/api/customer/orders/getOrdersCountSum", customerOrders.CustomerOrdersCountSum);

    // Create new user
    app.post("/api/customer/orders/add", customerOrders.create);

    // Retrieve all people
    app.get("/api/customer/orders/findAll", customerOrders.findAll);

    // Retrieve people with customerId
    app.get("/api/customer/orders/:id", customerOrders.CustomerOrdersById);

    // Update people with customerId
    app.post("/api/customer/orders/update/:id", customerOrders.update);

    // Delete people with customerId
    app.delete("/api/customer/orders/delete/:id", customerOrders.delete);


    // Delete people with customerId
    app.get("/api/customer/orders/getActiveOrder/:id", customerOrders.getActiveOrder);
    
    // app.delete("/api/customer/orders/deleteAll", customerOrders.deleteAll);
};
