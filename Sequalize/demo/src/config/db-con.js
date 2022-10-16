const config={
 HOST:'localhost',
 USER:'root',
 PASSWORD:'Khan@1234',
 DB:'my-db',
 dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
 port: 3307,
 pool:{
    min:0,
    max:5,
    idle:10000
 }
};
module.exports =config;