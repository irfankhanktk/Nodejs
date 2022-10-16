var express = require('express');
var customers = require('./requests/customers')
var employees = require('./requests/procedure-demo')
var con = require('./config/connection')
var app = express();
app.use(
  express.urlencoded({
    extended: true,
  }));
app.use('/customer', customers);
app.use('/employee', employees);

// server is listening here
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("server is running: ", host, port)
})
