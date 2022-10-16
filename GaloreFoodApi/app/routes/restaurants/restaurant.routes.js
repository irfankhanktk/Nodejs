module.exports = app => {
    const restaurant = require("../../controllers/restaurantsController/restaurants.controller.js");

    // Create new resturents
    app.post("/api/restaurant/add", restaurant.create);

    // Retrieve all people
    app.get("/api/restaurant/findAll", restaurant.findAll);

    // Retrieve people with customerId
    app.get("/api/restaurant/:id", restaurant.findOne);

    // Update people with customerId
    app.post("/api/restaurant/update/:id", restaurant.update);

    // Delete people with customerId
    // app.delete("/api/restaurant/delete/:id", restaurant.delete);

    // delete all people
    // app.delete("/api/restaurant/deleteAll", restaurant.deleteAll);

    app.post('/api/restaurant/login', restaurant.login);


    // get nearby trending rest
    app.post("/api/restaurant/trending/:limit/:pNumber", restaurant.getTrendingResturents);

};
