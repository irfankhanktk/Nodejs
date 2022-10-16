var express = require('express');
var router = express.Router();
var con = require('../config/connection');
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

// get all employees
router.get('/get_employees', function (req, res) {
  try {
    var sql = `call Get_Employees ('2020-06-15', '2020-09-15');`;
    con.query(sql, function (err, result) {
      if (err) {
        res.status(500).json(err)
      };
      res.json(result);
    });
  } catch (error) {
    throw error;
  }
})
//add customer

module.exports = router