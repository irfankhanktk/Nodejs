const userDetailModel = (sequelize, DataTypes) => {
    const UserDetail = sequelize.define('userdetails', {
        user_id: DataTypes.STRING,
        profile : DataTypes.STRING,
        age: DataTypes.STRING,
        height: DataTypes.STRING,
        address: DataTypes.STRING,

    })
    return UserDetail
}

export default userDetailModel