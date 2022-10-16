import connection from '../config/db-connection.js';

export class Machine {
    constructor(newMachine) {

    }
    static insertMachine = (created_by_id, newMachine, callBack) => {
        console.log('newMachine::', newMachine);
        connection.query(
            'INSERT INTO vending.machine SET ?', { ...newMachine, created_by_id: created_by_id }, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static getAllMachines = (params, callBack) => {
        const { is_super = 0, user_id, } = params;

        const status = params.status == 1 ? 1 : 0;
        let is_all = 1;
        if (params.status == 0 || params.status == 1) {
            is_all = 0;
        }

        let query = `select m.*,case when (m.image is not null) then CONCAT("http://localhost:5000/", m.image) else null end as image ,vendor_id,manager_id,admin_id,created_by_id,
         last_order_date,
         (select i.expired_at from item i where i.machine_id=m.id)as expired_at,
         (select i.quantity from item i where i.machine_id=m.id) as quantity,
         (select u.expiry from vendinguser u where u.id=m.vendor_id)as expiry,
         case when (exists(select * from item i where i.machine_id=m.id  )) then true else false end as has_item
        from machine m
        WHERE (${is_super==1} OR admin_id='${user_id}' OR manager_id='${user_id}' OR vendor_id='${user_id}')`;
        if (!is_all) {
            query = `select m.*,case when (m.image is not null) then CONCAT("http://localhost:5000/", m.image) else null end  as image ,vendor_id,manager_id,admin_id,created_by_id,
             last_order_date,
             (select i.expired_at from item i where i.machine_id=m.id)as expired_at,
             (select i.quantity from item i where i.machine_id=m.id) as quantity,
             (select u.expiry from vendinguser u where u.id=m.vendor_id)as expiry,
             case when (exists(select * from item i where i.machine_id=m.id  )) then true else false end as has_item from machine m
            where is_active='${status}' AND (${is_super==1} OR admin_id='${user_id}' OR manager_id='${user_id}' OR vendor_id='${user_id}')`
        }
        connection.query(
            query, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static getPopularMachines = (callBack) => {
      
        const query = `select m.address,m.location,m.machine_id,(select count(*) from order_item oi where oi.machine_id=m.id) as dispensed_items from machine m order by dispensed_items desc limit 5`;
        connection.query(
            query, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static getLocations = (params, callBack) => {

        connection.query(
            `select id,is_active,address,location from vending.machine`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static getMachines = (params, callBack) => {
        const per_page = params.per_page || 10;
        const page = params.page || 1;
        const skip = (page - 1) * per_page;
        const is_super = params.is_super == 1 ? 1 : 0;
        const status = params.status == 1 ? 1 : 0;
        let is_all = 1;
        console.log('params::', params);
        if (params.status == 0 || params.status == 1) {
            is_all = 0;
        }
        connection.query(
            `CALL vending.sp_get_Machines(${per_page},${skip},${status},'${params.user_id}',${is_all},${is_super})`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }

                connection.query(
                    `CALL vending.sp_get_Machines_pagination(${per_page},${status},'${params.user_id}',${is_all},${is_super})`, (error2, results2,) => {
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
    static selectMachineById(id, callBack) {
        connection.query(
            'select * from vending.machine where id=? limit 1',
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    }
    static deleteMachineById(id, callBack) {
        connection.query(
            `CALL vending.sp_delete_machine('${id}')`,
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error.sqlMessage || error);
                }
                return callBack(null, 'deleted successfully');
            }
        );
    }
    static isMachineExists = (Machine_id, callBack) => {
        connection.query(
            'select * from vending.machine where id=?',
            [Machine_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    }
    static updateMachineById = (body, callBack) => {
        connection.query(
            'update vending.machine set password=? where id=?',
            [body.new_password, body.Machine_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    }
    static updateMachine = (machine_id, body, callBack) => {


        let data = Object.keys(body).map(key => {
            return `${key}='${body[key]}'`;
        }).join();
        connection.query(
            `UPDATE  vending.machine SET ${data} where  id=${machine_id}`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

    static isIdExists = (Machine_id, callBack) => {
        connection.query(
            'select * from vending.machine where id=?',
            [Machine_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    }
}
