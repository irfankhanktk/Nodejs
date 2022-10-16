
const sql = require("./db");

// constructor
function addressModel(addressData) {
    this.user_id = addressData.user_id;
    this.address = addressData.address;
    this.name = addressData.name;
    this.location_details = addressData.location_details;
    this.note_to_rider = addressData.note_to_rider;
    this.dateAdded = addressData.dateAdded;
};

addressModel.addNewAddress = (newAddress, result) => {
    try {
        sql.query(
            "INSERT INTO addresses SET ?",
            newAddress,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, { id: res.insertId, ...newAddress });
            }
        );
    } catch (err) {
        result(err, null);
    }
};

addressModel.getAddressByUserId = (req, result) => {
    try {
        let limit = parseInt(req.params.limit);
        let pNumber = parseInt(req.params.pNumber);
        pNumber = pNumber - 1;
        let query = `CALL galorefood.sp_address_getByUserId("${req.params.userId}",${limit},${pNumber})`;
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found order: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found order with the id
            result({ kind: "not_found" }, null);
        });
    } catch (err) {
        result(err, null);
    }
};


addressModel.findbyAddressId = (id, result) => {
    console.log("i am here 3 orderId: ", id);
    try {
        let query = `CALL galorefood.sp_address_getByAddressId("${id}")`;
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("i am here 3 res.length: ", res.length);
            if (res.length) {
                result(null, res[0]);
                return;
            }

            // not found order with the id
            result({ kind: "not_found" }, null);
        });
    } catch (err) {
        result(err, null);
    }
};

addressModel.updateAddress = (id, order, result) => {
    try {
        addressModel.findbyAddressId(id, (err, data) => {
            console.log('i am here :  ', data);
            if (err || !data[0]) {
                result(err || "no result found", null);
                return;
            } else {
                let _data = data[0];
                if (_data) {
                    for (let prop in order) {
                        if (_data.hasOwnProperty(prop)) {
                            _data[prop] = order[prop];
                        }
                    }


                    sql.query(
                        "UPDATE addresses SET ? WHERE id = ?",
                        [new addressModel(_data), id],
                        (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(null, err);
                                return;
                            }
                            result(null, { id: id, ...data });
                        }
                    );
                }
            }
        });
    } catch (err) {
        result(err, null);
    }
};

addressModel.deleteAddress = (req, result) => {
    try {
        console.log("req.params.addrssId: ", req.params.addrssId);
        let query = `delete from galorefood.addresses where id = ${req.params.addrssId}`;
        console.log("query: " , query);
        sql.query(query, (err, res) => {
            console.log("error: " , err);
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("deleted addressModel with id: ", req.params.addrssId);
            result(null, res);
        });
    } catch (err) {
        console.log("in catch: "  ,err)
        result(err, null);
    }
};

module.exports = addressModel;
