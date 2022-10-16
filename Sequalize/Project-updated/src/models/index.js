import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()


import userModel from './user.model.js'
import userDetailModel from './user_detail.model.js'


const config = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    port: process.env.DBPORT
}

const db = {}
const {Op, QueryTypes} = Sequelize
let sequelize = new Sequelize(config.database, config.username, config.password, config)

db.Op = Op
db.QueryTypes = QueryTypes
db.sequelize = sequelize

db.User = userModel(sequelize, Sequelize.DataTypes)
db.UserDetail = userDetailModel(sequelize, Sequelize.DataTypes)



Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})


export default db
