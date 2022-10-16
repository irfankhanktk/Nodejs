const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port:dbConfig.PORT,
  multipleStatements: true,
  connectionLimit: 10
});

connection.getConnection((err) => {
  if(err){
    console.log("errrrrr", err);
    return;
  }
  console.log("DB connected successfully");
});

module.exports = connection;
