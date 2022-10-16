const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        name: {type:DataTypes.STRING, required:true},
        email: {type:DataTypes.STRING, required:true},
        password: {type:DataTypes.STRING, required:true},
    })
    return User
}

export default userModel