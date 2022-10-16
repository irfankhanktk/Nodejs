const { getPagination, getPagingData } = require("../../services/pagination");
const { followers } = require("../models");


const db = require('../models');
getPagination
const User = db.users;
const Op = db.Sequelize.Op;


// Retrieve all users from the database.
const findAllUser = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  const { limit, offset } = getPagination(page, size);
  User.findAndCountAll({include:'followers', where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving users."
      });
    });
};
const getFollowers = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  const { limit, offset } = getPagination(page, size);
  User.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving users."
      });
    });
};
// Retrieve  user by id from the database.
const findUser = (req, res) => {
  const {  id } = req.query;
  var condition = { id: { [Op.eq]: `${id}` } } ;
  User.findOne({ where: condition})
    .then(data => {
      console.log('data::',data);
      
      if (!data) {
        res.status(404).send({
          success:0,
          message:"Id not found"
        });
      }else{

        res.send(data);
      }
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving user."
      });
    });
};

// insert user in database.
const createUser = async(req, res) => {
  // Create a new user
  try {
    console.log('req::',req.body);
    const newUser = await User.create(req.body);
    console.log("auto-generated ID:", newUser.id);
    newUser.save();
    return res.status(201).json(
      newUser
    );
  } catch (error) {
         res.status(500).send({
        message:
        error.message || "Some error occurred while creating user."
      });
  }
};
// delete user in database.
const removeUser = async(req, res) => {
  // Create a new user
  const {  id } = req.query;
  var condition = { id: { [Op.eq]: `${id}` } } ;
  User.destroy({ where: condition})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving user."
      });
    });
};

module.exports = {
  findAllUser,
  createUser,
  findUser,
  removeUser,
  getFollowers
}