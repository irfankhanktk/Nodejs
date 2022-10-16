module.exports = app => {
  const riders = require("../../controllers/ridersController/rider.controller.js");

  // Create new user
  app.post("/api/rider/add", riders.create);

  // Retrieve all people
  app.get("/api/rider/findAll/:skip", riders.findAll); 

  // Retrieve people with customerId
  app.get("/api/rider/:id", riders.findOne);

  // Update people with customerId
  app.post("/api/rider/update/:id", riders.update);

  // Delete people with customerId
  // app.delete("/api/rider/delete/:id", riders.delete);

  // delete all people
  // app.delete("/api/rider/deleteAll", riders.deleteAll);

  app.post('/api/rider/login', riders.login)


  app.post('/api/rider/sendPushNearbyRiders', riders.sendPushToNearbyRiders)



};
