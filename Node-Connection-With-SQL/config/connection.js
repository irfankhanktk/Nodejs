var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "app_db",
    // port:3306
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  module.exports=con;