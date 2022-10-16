import moment from 'moment';
import connection from '../config/db-connection.js';

export class Item {
    constructor(newItem) {

    }
    static insert = (newItem, callBack) => {
        const { machine_id, quantity, expired_at, refilled_at, name, vendor_id } = newItem;
        if (!machine_id || !expired_at || !vendor_id || !name) {
            return callBack('invalid data');
        }
        connection.query(
            `CALL  vending.sp_add_item ('${machine_id}', '${expired_at}','${quantity || 0}','${vendor_id}','${refilled_at || moment().format('YYYY-MM-DD HH:mm:ss')}','${name}')`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static selectAll = (params, callBack) => {
        const per_page = params.per_page || 10;
        const page = params.page || 1;
        const skip = (page - 1) * per_page;
        console.log('params.machine_id:::', params.machine_id);
        connection.query(
            `CALL vending.sp_get_items(${per_page},${skip},'${params.machine_id}')`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                connection.query(
                    `CALL vending.sp_get_items_pagination(${per_page},'${params.machine_id}')`, (error2, results2,) => {
                        if (error2) {
                            return callBack(error2);
                        }
                        return callBack(null, {
                            data: results[0],
                            pagination: { ...results2[0][0], current_page: page * 1, per_page: per_page * 1 },
                        });
                    }
                );
            }
        );
    }
    static getCounts = (params, callBack) => {
        const { user_id, is_super } = params;
        connection.query(
            `CALL vending.sp_get_counts('${user_id}','${is_super}')`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0][0]);
            }
        );
    }
    static deleteItem = (id, callBack) => {
        connection.query(
            `DELETE FROM vending.item where id=${id}`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
    static isItemExists = (item_id, callBack) => {
        connection.query(
            'select * from vending.item where id=?',
            [item_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    }
    static isMachineExists = (machine_id, callBack) => {
        connection.query(
            'select * from vending.item where machine_id=?',
            [machine_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    }
    static getDispensedItems = (params, callBack) => {
        const start_date = params.start_date ? params.start_date : moment().format('YYYY-MM-DD');
        const end_date = params.end_date ? params.end_date : moment().format('YYYY-MM-DD');
        console.log('start_date::', start_date);
        console.log('end_date::', end_date);

        // const query = `CALL vending.sp_get_dispensed_items('${start_date}','${end_date}')`;

        let start = new Date(start_date);
        let end = new Date(end_date);
        let loop = new Date(start);
        let str ='';
        while (loop <= end) {
            
            str+=`select count(*) as count , '${moment(loop).format('YYYY-MM-DD')}' as date from order_item oi where DATE(oi.created_at) = '${moment(loop).format('YYYY-MM-DD')}';`
            let newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);
        }
        connection.query(
            str, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                if(results.length===1){

                    return callBack(null, results);
                }
                let list =results.map(l=>l[0]);
                return callBack(null, list);

            }
        );
    }
    static getDispensedCounts = (machine_id, callBack) => {
        if (!machine_id) {

            return callBack('Invalid machine id');
        }
        const query = `CALL vending.sp_get_dispensed_counts('${machine_id}')`;
        connection.query(
            query, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
  
    static updateItem = (item_id, body, callBack) => {

        let data = Object.keys(body).map(key => {
            return `${key}='${body[key]}'`;
        }).join();
        console.log('data::', data);
        connection.query(
            `UPDATE  vending.item SET ${data} where  id=${item_id}`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static updateExpiryQty = (params, callBack) => {
        const { machine_id, quantity, expired_at, vendor_id } = params;
        if (!machine_id || !quantity || !expired_at || !vendor_id) {
            return callBack('invalid data');
        }

        connection.query(
            `CALL vending.sp_expiry_qty ('${machine_id}', '${expired_at}','${quantity}','${vendor_id}')`, (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

}
