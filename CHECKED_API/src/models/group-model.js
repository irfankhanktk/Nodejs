import connection from '../config/db-connection.js';

export class Group {
    constructor(newgroup) {
        // this.first_name = newUser.first_name;
        // this.last_name = newUser.last_name;
        // this.email = newUser.email;
        // this.phone = newUser.phone;
        // this.address = newUser.address;
        // this.password = newUser.password;
        // this.occupation = newUser.occupation;
        // this.area_expertise = newUser.area_expertise;
        // this.experience_year = newUser.experience_year;
        // this.degree_id = newUser.degree_id;
        // this.major = newUser.major;
        // this.school = newUser.school;
        // this.year = newUser.year;
        // this.certificates = newUser.certificates;
        // this.title = newUser.title;
        // this.publication_date = newUser.publication_date;
    }
    static insert = (newgroup, callBack) => {
        connection.query(
            `CALL checkd.sp_create_group ('${newgroup.name}','${newgroup.description}',${newgroup.created_by},'${newgroup.image}','${newgroup.member_ids}','${newgroup.is_private?1:0}')`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static addUser = (params, callBack) => {
        const {user_id,group_id}=params;
        connection.query(
            `INSERT INTO checkd.groupmembers (group_id,user_id) values(${group_id},${user_id});`, (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static updateGroup = (group_id,body, callBack) => {
        console.log('body::',body);
    
        let data =Object.keys(body).map(key=>{
            return `${key}='${body[key]}'`;
        }).join();
        connection.query(
            `UPDATE  checkd.checkedgroup SET ${data} where  id=${group_id}`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
}
    static joinGroup = (params, callBack) => {
        connection.query(
            `CALL checkd.sp_join_group (${params.group_id},${params.user_id})`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0][0]);
            }
        );
    }
    static leaveGroup = (params, callBack) => {
        connection.query(
            `CALL checkd.sp_leave_group (${params.group_id},${params.user_id})`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0][0]);
            }
        );
    }
    static selectAll = (callBack) => {
        connection.query(
            `SELECT * FROM checkd.checkedgroup g`,(error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static selectJoinedGroupsById(params, callBack) {
        connection.query(
            `CALL checkd.sp_joined_groups (${params.id},${(params.page-1)*10})`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                connection.query(
                    `CALL checkd.sp_groups_pagination(${params.id},1)`,(error2, results2,) => {
                        if (error2) {
                            return callBack(error2);
                        }
                        return callBack(null, {
                            data:results[0],
                            pagination:results2[0][0],
                        });
                    }
                );
            }
        );
    }
    static selectUnJoinedGroupsById(params, callBack) {
        connection.query(
            `CALL checkd.sp_un_joined_groups (${params.id},${(params.page-1)*10});`,
            [params.id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                connection.query(
                    `CALL checkd.sp_groups_pagination(${params.id},0)`,(error2, results2,) => {
                        if (error2) {
                            return callBack(error2);
                        }
                        return callBack(null, {
                            data:results[0],
                            pagination:results2[0][0],
                        });
                    }
                );
            }
        );
    }
    static updateGroupById=(data, callBack)=> {
        connection.query(
            'update checkd.checkedgroup set user_name=? where id=?',
            [data.user_name, data.id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    }
    static deleteGroupById(id, callBack) {
        connection.query(
            'DELETE from checkd.checkedgroup where id=?',
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    }
}
