import connection from '../config/db-connection.js';

export class User {
    constructor(newUser) {
        this.first_name = newUser.first_name;
        this.last_name = newUser.last_name;
        this.email = newUser.email;
        this.phone = newUser.phone;
        this.address = newUser.address;
        this.password = newUser.password;
        this.occupation = newUser.occupation;
        this.area_expertise = newUser.area_expertise;
        this.experience_year = newUser.experience_year;
        this.degree = newUser.degree;
        this.major = newUser.major;
        this.school = newUser.school;
        this.year = newUser.year;
        this.certificates = newUser.certificates;
        this.title = newUser.title;
        this.publication_date = newUser.publication_date;
    }
    static selectAll = (params, callBack) => {
        console.log('params', params);
        const search = params.search_term ? `%${params.search_term}%` : '%%';
        connection.query(
            `CALL checkd.sp_get_users(${params.user_id},${(params.page - 1) * 10},'${search}')`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                connection.query(
                    `CALL checkd.sp_get_users_pagination (${params.user_id},'${search}')`, (error2, results2,) => {
                        if (error2) {
                            return callBack(error2);
                        }
                        return callBack(null, {
                            data: results[0],
                            pagination: results2[0][0],
                        });
                    }
                );
            }
        );
    }
    static addPublication = (user_id,publications, callBack) => {
        const data = publications.map((row) => {
            return `('${user_id}','${row.title}','${row.publication_date}')`
        }).join();
        console.log('data:::', data);

        connection.query(
            `INSERT INTO checkd.publication (user_id,title,publication_date) VALUES  ${data}`, (error, results) => {
                if (error) {
                    return callBack(error?.sqlMessage);
                }
                return callBack(null, results);
            }
        );
    }
    static getPublication = (params, callBack) => {
        const {user_id} = params;
        connection.query(
            `Select * from checkd.publication where user_id=${user_id}`, (error, results) => {
                if (error) {
                    return callBack(error?.sqlMessage);
                }
                return callBack(null, results);
            }
        );
    }
    static inviteUsers = (params, callBack) => {
        const { group_id, user_id, search_term } = params;
        const search = search_term ? `%${search_term}%` : '%%';
        connection.query(
            `CALL checkd.sp_invite_users(${user_id},${group_id},'${search}');`,
            (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
    static selectUserById(params, callBack) {
        const { user_id, my_id } = params;
        console.log('params::', params);
        console.log('my::', my_id);
        connection.query(
            `call checkd.sp_get_user_details(${user_id || my_id},'${my_id}')`,
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0][0]);
            }
        );
    }
    static isUserExists = (user_name, callBack) => {
        connection.query(
            'select * from checkd.checkeduser where user_name=?',
            [user_name],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    }
    static getFollowersFollowing = (user_id, is_follower, callBack) => {
        connection.query(
            `CALL checkd.sp_get_followers_followings('${user_id}',${is_follower})`,
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    }
    static updateUserById = (body, callBack) => {
        connection.query(
            'update checkd.checkeduser set password=? where id=?',
            [body.new_password, body.user_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    }
    static toggleFollow = (body, callBack) => {
        console.log('body.is_followed::', body.is_followed);
        let query = `CALL checkd.sp_follow_user('${body.user_id}','${body.to_id}')`;
        if (body.is_followed == 1) {
            query = `CALL checkd.sp_unfollow_user('${body.user_id}','${body.to_id}')`;
        }
        console.log('query: ', query);
        connection.query(query, (error, result, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, result[0][0]);
        }
        );
    }
    static updateInfo = (body, callBack) => {
        const { first_name, last_name, image, user_id } = body;
        let query = `update checkd.checkeduser set first_name='${first_name}',last_name='${last_name}' where id=?`;
        if (image) {
            query = `update checkd.checkeduser set first_name='${first_name}', last_name='${last_name}', image='${image}'  where id=?`;
        }
        connection.query(
            query,
            [user_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    }

    static isIdExists = (user_id, callBack) => {
        connection.query(
            'select * from checkd.checkeduser where id=?',
            [user_id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    }
}
