

module.exports = app => {
    const addressController = require("../controllers/address.controller");
  
    // Create new Address
    app.post("/api/address/addNewAddress", addressController.addNewAddress);
  
    // get address by user id
    app.get("/api/address/getAddressByUserId/:userId/:limit/:pNumber", addressController.getAddressByUserId);
    
    // update order by address id
    app.post("/api/address/updateAddress/:addrssId", addressController.updateAddress);
  
        // delete by id
    app.get("/api/address/deleteAddress/:addrssId", addressController.deleteAddress);


  
  };
  