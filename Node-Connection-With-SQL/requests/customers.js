var express = require('express');
var router = express.Router();
var con = require('../config/connection');
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});
// get customer by id
router.get('/customer_id/:id', function (req, res) {
  try {
    var sql = `select * from customer where id in (${req.params.id})`;
    con.query(sql, function (err, result) {
      if (err) {
        res.status(500).json(err)
      };
      res.json(result);
    });
  } catch (error) {
    throw error;
  }
})

// get all customers
router.get('/get_customers', function (req, res) {
  try {
    var sql = `select * from customer`;
    con.query(sql, function (err, result) {
      if (err) {
        res.status(500).json(err)
      };
      res.json(result);
    });
  } catch (error) {
    throw error;
  }
})
//add customer
router.post('/add_customer', function (req, res) {
  try {
    const {name,address}=req.body;
    var values =  [name,address]; 
    var sql = "INSERT INTO customer (name, address) VALUES (?,?)";
    con.query(sql,values, function (err, result) {
      if (err) throw err;
      res.status(201).json({...req.body,id:result?.insertId})
    });
  } catch (error) {
    throw error;
  }
});

// delete customer by id
router.get('/delete_customer/:id', function (req, res) {
  try {
    var sql = `delete from customer where id=${req.params.id}`;
    var response = [];
    con.query(sql, function (err, result) {
      if (err) {
        res.status(500).json(err)
      };
      console.log('result',result);
      if(result.affectedRows===0){
        res.status(204);
      }
      else{
        res.status(200).send('deleted successfully');
      }
    });
  } catch (error) {
   throw error;
  }
})
// update customer by id
router.put('/update_customer/:id', function (req, res) {
  try {
    const {address}=req.body;
    var sql = `UPDATE customer SET address =? WHERE id =?`;
    var response = [];
    con.query(sql,[address,req.params.id], function (err, result) {
      if (err) {
        res.status(500).json(err)
      };
      if(result.affectedRows===0){
        res.status(204);
      }
      else{
        res.status(200).send('updated successfully');
      }
    });
  } catch (error) {
   throw error;
  }
})
module.exports = router