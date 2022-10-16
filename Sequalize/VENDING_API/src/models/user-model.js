import connection from '../config/db-connection.js';

export class User {
    constructor(newUser) {

    }
    static selectAll = (params, callBack) => {
        const search = params.search_term ? `%${params.search_term}%` : '%%';
        const per_page = params.per_page || 10;
        const role = params.role || '0';
        const page = params.page || 1;
        console.log('role:::', role);
        connection.query(
            `CALL vending.sp_get_users(${per_page},${(page - 1) * per_page},'${search}','${role}')`, (error, results,) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                connection.query(
                    `CALL vending.sp_get_users_pagination (${per_page},'${search}','${role}')`, (error2, results2,) => {
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
    static selectManagers = (params, callBack) => {

        const per_page = params.per_page || 10;
        const page = params.page || 1;
        const skip = (page - 1) * per_page;
        const created_by_id = params.created_by_id;
        connection.query(
            `CALL vending.sp_get_managers(${per_page},${skip},${created_by_id})`, (error, results,) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                connection.query(
                    `CALL vending.sp_get_managers_pagination(${per_page},${created_by_id})`, (error2, results2,) => {
                        if (error2) {
                            return callBack(error2);
                        }
                        console.log('results2[0][0]:::', results2[0][0]);
                        return callBack(null, {
                            data: results[0],
                            pagination: { ...results2[0][0], current_page: page * 1, per_page: per_page * 1 },
                        });
                    }
                );
            }
        );
    }
    static getAllManagers = (params, callBack) => {


        const {user_id,is_super} = params;
        let query = `select id,user_name,email,phone_number,last_accessed_at,role,created_by_id from vending.vendinguser u 
        where role='manager' and (manager_id = ${user_id} || admin_id = ${user_id} || ${is_super})`;
        connection.query(
            query, (error, results,) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                return callBack(null, results);

            }
        );
    }
    static selectVendors = (params, callBack) => {

        const per_page = params.per_page || 10;
        const page = params.page || 1;
        const skip = (page - 1) * per_page;

        connection.query(
            `CALL vending.sp_get_vendors(${per_page},${skip},${params.manager_id || 0})`, (error, results,) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                connection.query(
                    `CALL vending.sp_get_vendors_pagination(${per_page},${params.manager_id || 0})`, (error2, results2,) => {
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
    static getAllVendors = (params, callBack) => {
        console.log({params});
        const {user_id,is_super} = params;
        let query = `select id,user_name,email,phone_number,manager_id,admin_id,last_accessed_at,role,created_by_id from vending.vendinguser u 
        where role='vendor' and (manager_id = ${user_id} || admin_id = ${user_id} || ${is_super})`;

        connection.query(
            query, (error, results,) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                return callBack(null, results);
            }
        );
    }
    static selectAdmins = (params, callBack) => {

        const per_page = params.per_page || 10;
        const page = params.page || 1;
        const skip = (page - 1) * per_page;

        connection.query(
            `CALL vending.sp_get_admins(${per_page},${skip},'admin')`, (error, results,) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                connection.query(
                    `CALL vending.sp_get_admins_pagination(${per_page},'admin')`, (error2, results2,) => {
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
    static getAllAdmins = (params, callBack) => {


        connection.query(
            `select id,user_name,email,phone_number,last_accessed_at,role,created_by_id from vending.vendinguser u 
            where role='admin'`, (error, results,) => {
            if (error) {
                return callBack(error.sqlMessage);
            }
            return callBack(null, results);
        }
        );
    }
    static selectSuperAdmins = (params, callBack) => {

        const per_page = params.per_page || 10;
        const page = params.page || 1;
        const skip = (page - 1) * per_page;

        connection.query(
            `CALL vending.sp_get_admins(${per_page},${skip},'superadmin')`, (error, results,) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                connection.query(
                    `CALL vending.sp_get_admins_pagination(${per_page},'superadmin')`, (error2, results2,) => {
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
    // static getUsersById = (params, callBack) => {
    //     const {role,user_id}=params;

    //     let query =`SELECT u.id,user_name,email,phone_number,last_accessed_at,role,created_by_id,manager_id,admin_id FROM vendinguser u 
    //     where created_by_id='${user_id}' and  role='${role}';`
    //    if(role==='manager'){
    //     query =`SELECT u.id,user_name,email,phone_number,last_accessed_at,role,created_by_id,manager_id,admin_id FROM vendinguser u 
    //     where  role='${role}' and admin_id='${user_id}';`
    //    }else if(role==='vendor'){
    //     query =`SELECT u.id,user_name,email,phone_number,last_accessed_at,role,created_by_id,manager_id,admin_id FROM vendinguser u 
    //     where  role='${role}' and manager_id='${user_id}';`
    //    }

    //     connection.query(
    //         query, (error, results,) => {
    //             if (error) {
    //                 return callBack(error.sqlMessage);
    //             }
    //             return callBack(null,results);
    //         }
    //     );
    // }
    static getUsersById = (params, callBack) => {
        const { role, user_id, is_super } = params;
        let query = '';
        // if (is_super) {
        //     query = `SELECT u.id,user_name,email,phone_number,last_accessed_at,role,created_by_id,manager_id,admin_id FROM vendinguser u 
        //    where created_by_id='${user_id}' and  role='${role}';`
        // } else
         if (role === 'manager') {
            query = `SELECT u.id,user_name,email,phone_number,last_accessed_at,role,created_by_id,manager_id,admin_id FROM vendinguser u 
        where  role='${role}' and admin_id='${user_id}';`
        } else if (role === 'vendor') {
            query = `SELECT u.id,user_name,email,phone_number,last_accessed_at,role,created_by_id,manager_id,admin_id FROM vendinguser u 
        where  role='${role}' and (manager_id='${user_id}' OR admin_id='${user_id}');`
        }

        connection.query(
            query, (error, results,) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                return callBack(null, results);
            }
        );
    }
    static getUsersByRole = (params, callBack) => {
        const { role, user_id, is_super } = params;
        let query = '';
        if (is_super) {
            query = `SELECT u.id,user_name,email,phone_number,last_accessed_at,role,created_by_id,manager_id,admin_id FROM vendinguser u 
           where created_by_id='${user_id}' and  role='${role}';`
        } else if (role === 'manager') {
            query = `SELECT u.id,user_name,email,phone_number,last_accessed_at,role,created_by_id,manager_id,admin_id FROM vendinguser u 
        where  role='${role}' and admin_id='${user_id}';`
        } else if (role === 'vendor') {
            query = `SELECT u.id,user_name,email,phone_number,last_accessed_at,role,created_by_id,manager_id,admin_id FROM vendinguser u 
        where  role='${role}' and (manager_id='${user_id}' OR admin_id='${user_id}');`
        }

        connection.query(
            query, (error, results,) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                return callBack(null, results);
            }
        );
    }
    static assignVendors(data, callBack) {
        console.log('data::', data);

        if (!data.vendor_ids) {
            return callBack('missing vendor-ids');
        }
        const vendor_ids = data.vendor_ids.split(',');
        console.log('vendor_ids::', vendor_ids);
        if (vendor_ids.length < 1) {
            return callBack('missing vendor-ids');
        }
        let values = vendor_ids.map(ele => {
            return (`(${ele}, ${data.manager_id}, ${data.assigned_by_id})`);
        }).join();

        const query = `INSERT INTO assignvendor(vendor_id, manager_id, assigned_by_id) VALUES ${values}`;

        connection.query(
            query,
            (error, result, fields) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                return callBack(null, 'added successfully');
            }
        );
    }
    static assignMachines(data, callBack) {
        console.log('data::', data);

        if (!data.machine_ids) {
            return callBack('missing machine-ids');
        }
        const machine_ids = data.machine_ids.split(',');
        if (machine_ids.length < 1) {
            return callBack('missing machine-ids');
        }
        let values = machine_ids.map(ele => {
            return (`(${ele}, ${data.vendor_id}, ${data.assigned_by_id})`);
        }).join();

        const query = `INSERT INTO assignmachine(machine_id, vendor_id, assigned_by_id) VALUES ${values}`;

        connection.query(
            query,
            (error, result, fields) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                return callBack(null, 'added successfully');
            }
        );
    }
    static selectUserById(id, callBack) {
        connection.query(
            'select * from vending.vendinguser where id=? limit 1',
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                return callBack(null, result[0]);
            }
        );
    }
    static deleteUserById(id, callBack) {
        connection.query(
            `CALL vending.sp_delete_user('${id}')`,
            (error, result, fields) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                return callBack(null, 'deleted successfully');
            }
        );
    }
    static isUserExists = (user_id, callBack) => {
        connection.query(
            'select * from vending.vendinguser where id=?',
            [user_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                return callBack(null, result[0]);
            }
        );
    }
    static updateUserById = (body, callBack) => {
        connection.query(
            'update vending.vendinguser set password=? where id=?',
            [body.new_password, body.user_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                return callBack(null, result);
            }
        );
    }
    static updateInfo = (user_id, body, callBack) => {

        let data = Object.keys(body).map(key => {
            return `${key}='${body[key]}'`;
        }).join();
        console.log('data::', data);
        connection.query(
            `UPDATE  vending.vendinguser SET ${data} where  id=${user_id}`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

    static isIdExists = (user_id, callBack) => {
        connection.query(
            'select * from vending.vendinguser where id=?',
            [user_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error.sqlMessage);
                }
                return callBack(null, result[0]);
            }
        );
    }
}
