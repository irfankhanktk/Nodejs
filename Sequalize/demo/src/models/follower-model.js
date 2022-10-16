
module.exports = (sequelize, DataTypes) => {

  const Follower = sequelize.define("Follower", {

  },{
    updatedAt:false,
    createdAt:false,
    // updated_at:false,
    // updated_at:false,
    // timestamp:false,
  }
  );
 
  return Follower;
};


// sequelize.define('Follower', {
//     // ... (attributes)
//   }, {
//     freezeTableName: true
//   });

 // db.sync() //- This creates the table if it doesn't exist (and does nothing if it already exists)
  //or
  //Follower.sync();//sync one table only

//Follower.sync({ force: true }) //- This creates the table, dropping it first if it already existed
//Follower.sync({ alter: true }) //- This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.



// You can also extend model to create table

// class Follower extends Model {
//     otherPublicField;
//   }
  
//   Follower.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     }
//   }, { sequelize });
  
//   const Follower = new Follower({ id: 1 });
//   Follower.id; // 1




//drop queries

// This will run .sync() only if database name ends with '_test'
//sequelize.sync({ force: true, match: /_test$/ });