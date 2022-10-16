module.exports = app => {
    const customerOrders = require("../../controllers/ridersController/customerOrders.controller");

    // Retrieve nearby pending orders
    app.get("/api/riders/customerOrders/findNearByPending", customerOrders.findNearByPending);

    // Retrieve customerorder with orderId
    app.get("/api/riders/customerOrders/:id", customerOrders.findOne);

    // Update customerorder with orderId
    app.post("/api/riders/customerOrders/update/:id", customerOrders.update);

    // Retrieve delivered customerorder with riderId
    app.get("/api/riders/customerOrders/findDeliveredByRiderId/:id", customerOrders.findDeliveredByRiderId);

    
    // Retrieve active customerorder with orderId
    app.get("/api/riders/customerOrders/activeOrder/:id", customerOrders.findActiveOrder);
}