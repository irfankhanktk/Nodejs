

module.exports = app => {
  const ordersController = require("../controllers/orders.controller");

  // Create new order
  app.post("/api/orders/addNewOrders", ordersController.addNewOrders);

  // get order by rest id
  app.get("/api/orders/getOrdersByResturentId/:id/:limit/:pNumber", ordersController.getOrdersByResturentId);

  // get order by user id
  app.get("/api/orders/getOrdersByUserId/:id/:limit/:pNumber", ordersController.getOrdersByUserId);

  // get nearby orders
  // /:riderId/:limit/:pNumber
  app.get("/api/orders/getNearbyPendingOrders", ordersController.getNearbyPendingOrders);

  // update order by order id
  app.post("/api/orders/updateOrder/:id", ordersController.update);


};
