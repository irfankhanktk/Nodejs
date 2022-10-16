const Sequelize = require("sequelize");
const config = require("../config/db-con");


const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    // acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  port:3307,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user-model")(sequelize, Sequelize);
db.followers = require("./follower-model")(sequelize, Sequelize);
db.users.hasMany(db.followers, { as: "followers" });
db.followers.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "followers",
  foreignKey: "follower_id",
  as: "followerd",
});
module.exports = db;