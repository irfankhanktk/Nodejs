module.exports = (app) => {
  const HomePageRequests = require("../../controllers/users/homepage.controller.js");
  
  app.post(
    "/api/customer/homePageData/:limit/:pNumber",
    HomePageRequests.homePageData
  );

  app.get(
    "/api/customer/getRestaurantsItems/:id/:limit/:pNumber",
    HomePageRequests.getRestaurantsItems
  );


  app.get(
    "/api/customer/getResturentCategories/:resturentId",
    HomePageRequests.getResturentCategories
  );


};
