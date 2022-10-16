module.exports = app => {
    const menuItem = require("../../controllers/restaurantsController/resturent.menuItem.controller.js");

    // Create new user
    app.post("/api/restaurant/menuItem/add", menuItem.create);

    // Retrieve all people
    // app.get("/api/restaurant/menuItem/findAll/:id", menuItem.findAll);

      // Retrieve all people
      app.get("/api/restaurant/menuItem/findByResId/:id", menuItem.findAll);

    // Retrieve people with menu id
    app.get("/api/restaurant/menuItem/:id", menuItem.findOne);

    // Update people with customerId
    app.post("/api/restaurant/menuItem/update/:id", menuItem.update);

    // Delete people with customerId
    app.delete("/api/restaurant/menuItem/delete/:id", menuItem.delete);

    // delete all people
    app.delete("/api/restaurant/menuItem/deleteAll", menuItem.deleteAll);
    
    // get menu by cat with restaurantId
    app.get("/api/restaurant/menuItem/getByCat/:id", menuItem.menuListByCat);

    // get menu option by menuID
    app.get("/api/restaurant/menuOption/getById/:id", menuItem.menuOptionById);

};
