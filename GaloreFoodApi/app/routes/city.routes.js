module.exports = app => {
    const city = require("../controllers/cities.controller.js");

    // Create new user
    app.post("/api/cities/add", city.create);

    // Retrieve all people
    app.get("/api/cities/findAll", city.findAll);

    // Retrieve people with cityId
    app.get("/api/cities/:id", city.findOne);

    // Update people with cityId
    app.post("/api/cities/update/:id", city.update);

    // Delete people with cityId
    app.delete("/api/cities/delete/:id", city.delete);

    // delete all people
    app.delete("/api/cities/deleteAll", city.deleteAll);

};
