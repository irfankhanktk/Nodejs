import connection from '../config/db-connection.js';

export class Order {
    constructor(newOrder) {

    }


    //     INSERT INTO 
    // 	projects(name, start_date, end_date)
    // VALUES
    // 	('AI for Marketing','2019-08-01','2019-12-31'),
    // 	('ML for Sales','2019-05-15','2019-11-20');
    // static insert = (newOrder, callBack) => {
    //     connection.query(
    //         'INSERT INTO vending.orders SET ?', newOrder, (error, results,) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     );
    // }
    static payment = (params, callBack) => {
                 const {bill_id,vendor_id,amount,action,paid_by_id}=params;
                 if(!bill_id||!vendor_id || !amount||!action){
                    return callBack('invalid data');
                 }
                    const query = `Call vending.sp_pay_bill('${bill_id}','${vendor_id}','${amount}','${action}','${paid_by_id}')`;
                    connection.query(
                        query, (error, results,) => {
                            if (error) {
                                return callBack(error);
                            }
                            return callBack(null, results);
                        }
                    );
    }
    static dispenseItem = (order_item, callBack) => {
                 const {item_id,machine_id}=order_item;
                    const query = `Call  sp_order_item('${machine_id}')`;
                    connection.query(
                        query, (error, results,) => {
                            if (error) {
                                return callBack(error);
                            }
                            return callBack(null, results);
                        }
                    );
    }
    static selectAll = (callBack) => {
        connection.query(
            'Select * from vending.orders', (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static getLogs = (vendor_id,callBack) => {
        connection.query(
            `Select (select role from vending.vendinguser v where v.id=b.paid_by_id) as paid_by_user_role,(select user_name from vending.vendinguser v where v.id=b.paid_by_id) as paid_by_user_name,b.*,u.user_name,u.email,u.phone_number,u.role,u.last_accessed_at,price,expiry,admin_id,manager_id
             from vending.billinglog b inner join vending.vendinguser u on b.vendor_id=u.id where vendor_id=${vendor_id}`, 
             (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static getBills = (vendor_id,callBack) => {
        console.log('vendor_id',vendor_id);
        connection.query(
            `Select b.*,u.user_name,u.email,u.phone_number,u.role,u.last_accessed_at,price,expiry,admin_id,manager_id
             from vending.billing b inner join vending.vendinguser u on b.vendor_id=u.id where vendor_id=${vendor_id}`, 
             (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

}
