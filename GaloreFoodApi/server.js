const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');



let app = express();

let server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Galore Food." });
});

require("./app/routes/users/homepage.routes.js")(app);
require("./app/routes/users/customer.routes.js")(app);
require("./app/routes/users/orders.routes.js")(app);
require("./app/routes/restaurants/restaurant.routes.js")(app);
require("./app/routes/restaurants/menuItem.routes.js")(app);
require("./app/routes/restaurants/categories.routes.js")(app);
require("./app/routes/restaurants/addon.routes.js")(app);
require("./app/routes/city.routes.js")(app);
require("./app/routes/riders/rider.routes")(app);
require("./app/routes/riders/customerOrders.routes")(app);

//admin route
require("./app/routes/admin/admin-route.js")(app);



// set port, listen for requests
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
