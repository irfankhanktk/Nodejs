module.exports = app => {
    const categories = require("../../controllers/restaurantsController/resturent.category.controller.js");

    // Create new user
    app.post("/api/restaurant/categories/add", categories.create);

    // Retrieve all people
    app.get("/api/restaurant/categories/findAll", categories.findAll);

    // Retrieve people with customerId
    app.get("/api/restaurant/categories/:id", categories.findOne);

    
    // Retrieve categories with restaurant Id
    app.get("/api/restaurant/getRescategories/:id", categories.findResCats);

    // Update people with customerId
    app.post("/api/restaurant/categories/update/:id", categories.update);

    // Delete people with customerId
    app.delete("/api/restaurant/categories/delete/:id", categories.delete);

    // delete all people
    app.delete("/api/restaurant/categories/deleteAll", categories.deleteAll);

};
