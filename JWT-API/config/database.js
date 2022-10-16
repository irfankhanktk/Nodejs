const { createPool } = require('mysql');
const pool = createPool({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATEBASE,
    connectionLimit: process.env.LIMIT,
    //   ssl: config.mysql.ssl
});
module.exports=pool;