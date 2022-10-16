require('dotenv').config();
var express = require('express');
var employeeRouter = require('./api/users/user-router')
const {sign}=require('jsonwebtoken');
// var employees = require('./requests/procedure-demo')
// var con = require('./config/connection')
var app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }));

// app.get('/', function (req, res) {
//     try {
//       var sql = `select * from users`;
//       con.query(sql, function (err, result) {
//         if (err) {
//           res.status(500).json(err)
//         };
//         res.json(result);
//       });
//     } catch (error) {
//       throw error;
//     }
//   })
// app.use('/customer', customers);
app.use('/api/users', employeeRouter);

// server is listening here
var server = app.listen(process.env.APP_PORT, function () {
  console.log("server is running: ",process.env.APP_PORT);
})
