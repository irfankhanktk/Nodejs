import { createPool } from "mysql";

const connection = createPool({
  // host:'vending-db.ccwz9ypgfiti.us-west-2.rds.amazonaws.com',
  // user:'admin',
  // password:'Wh0isthis??',
  // port:3306,
  host:'localhost',
  user:'root',
  password:'Khan@1234',
  database:'vending',
  port:3307,
  multipleStatements:true,
  connectionLimit: process.env.LIMIT,
});

connection.getConnection((err) => {
  if(err){
    console.log("error: ", err);
    return;
  }
  console.log("DB connected successfully");
});

export default connection;
