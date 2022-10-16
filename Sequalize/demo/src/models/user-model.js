
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
    
    },
    description: {
      type: DataTypes.STRING
    }
  },{
    // updated_at:false,
    timestamp:true,
  }
  );

 
  return User;
};


// sequelize.define('User', {
//     // ... (attributes)
//   }, {
//     freezeTableName: true
//   });

 // db.sync() //- This creates the table if it doesn't exist (and does nothing if it already exists)
  //or
  //User.sync();//sync one table only

//User.sync({ force: true }) //- This creates the table, dropping it first if it already existed
//User.sync({ alter: true }) //- This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.



// You can also extend model to create table

// class User extends Model {
//     otherPublicField;
//   }
  
//   User.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     }
//   }, { sequelize });
  
//   const user = new User({ id: 1 });
//   user.id; // 1




//drop queries

// This will run .sync() only if database name ends with '_test'
//sequelize.sync({ force: true, match: /_test$/ });