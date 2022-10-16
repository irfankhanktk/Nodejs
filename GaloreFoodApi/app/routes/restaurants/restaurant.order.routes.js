module.exports = (app) => {
  const resturantsOrders = require("../../controllers/restaurantsController/resturents.orders.controller");

  app.get(
    "/api/resturants/orders/findAll/:resturantId",
    resturantsOrders.findAll
  );

  // Retrieve people with orderId
  app.get("/api/resturants/orders/:id", resturantsOrders.findOne);

  // Update people with orderId
  app.post("/api/resturants/orders/update/:orderId", resturantsOrders.update);

  // // Delete people with customerId
  // app.delete("/api/customer/orders/delete/:id", resturantsOrders.delete);

  // // delete all people
  // app.delete("/api/customer/orders/deleteAll", resturantsOrders.deleteAll);
};
