module.exports = app => {
    const addOn = require("../../controllers/restaurantsController/resturent.addon.controller.js");

    // Create new user
    app.post("/api/restaurant/addOn/add", addOn.create);

    // Retrieve all adone
    app.get("/api/restaurant/addOn/findAll", addOn.findAll);

    // Retrieve people with resturnt id
    app.get("/api/restaurant/addOn/:id", addOn.findOne);

    // Update people with adon id
    app.post("/api/restaurant/addOn/update/:id", addOn.update);

    // // Delete people with adon id
    app.delete("/api/restaurant/addOn/delete/:id", addOn.delete);

    // // delete all people
    // app.delete("/api/restaurant/addOn/deleteAll", addOn.deleteAll);

};
