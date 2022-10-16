import { createPool } from "mysql";

const connection = createPool({
  // host:'localhost',
  // user:'root',
  // password:'Khan@1234',
  // database:process.env.DB,
  // port:3307,
  host:'demo.cgrljcpte41q.us-east-2.rds.amazonaws.com',
  user:'admin',
  password:'CHEKD297986!',
  database:'checkd',
  port:3306,
  multipleStatements:true,
  connectionLimit: process.env.LIMIT
});

connection.getConnection((err) => {
  if(err){
    console.log("error: ", err);
    return;
  }
  console.log("DB connected successfully");
});

export default connection;
