module.exports = app => {
  const customers = require("../../controllers/users/customer.controller.js");

  // Create new user
  app.post("/api/customer/add", customers.create);

  // Retrieve all people
  app.get("/api/customer/findAll", customers.findAll);

  // Retrieve people with customerId
  app.get("/api/customer/:id", customers.findOne);

  // Update people with customerId
  app.post("/api/customer/update/:id", customers.update);

  // Delete people with customerId
  // app.delete("/api/customer/delete/:id", customers.delete);

  // delete all users
  // app.delete("/api/customer/deleteAll", customers.deleteAll);

  app.post('/api/customer/login', customers.login)



};
