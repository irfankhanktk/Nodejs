const HomePage = require("../../models/users/homepage.model.js");
const logger = require("../../libraries/loggerMiddleware");

exports.homePageData = (req, res) => {
  try {
    if(!req.body.lat || !req.body.lng){
      res.status(200).send({
        status: "ERROR",
        message:"lat and lng is required",
      });
      return;
    }
    HomePage.getRestaurants(req, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message || "Some error occurred while retrieving Cities.",
        });
      else res.send({status: "OK",data});
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};

exports.getRestaurantsItems = (req, res) => {
  try {
    console.log("i am here 1");
    HomePage.getRestaurantsItems(req, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message || "Some error occurred while retrieving Cities.",
        });
      else res.send({status: "OK",data});
    });
  } catch (err) {
    console.log(err.message);
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};


exports.getResturentCategories = (req, res) => {
  try {
    HomePage.getResturentCategories(req, (err, data) => {
      if (err)
        res.status(500).send({
          status: "ERROR",
          message:
            err.message || "Some error occurred while retrieving Cities.",
        });
      else res.send({status: "OK",data});
    });
  } catch (err) {
    logger.writeLog(err.message);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
    });
  }
};
