import connection from '../config/db-connection.js';

export class Post {
    constructor(newPost) {
    }
    static insert = (newPost, callBack) => {
        let text = newPost.post_text;
        if (text) {
            const regex = /'/ig;
            text = text.replace(regex, "\\'");
        }
        connection.query(
            `CALL checkd.sp_create_post('${newPost.user_id}','${newPost.group_id}','${text}','${newPost.image}','${newPost.audio}','${newPost.post_type}')`, newPost, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0][0]);
            }
        );
    }
    static selectAll = (params, callBack) => {
        connection.query(
            `CALL checkd.sp_get_home_posts (${params.user_id},${(params.page - 1) * 10})`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }

                connection.query(
                    `CALL checkd.sp_home_pagination (${params.user_id})`, (error2, results2,) => {
                        if (error2) {
                            return callBack(error2);
                        }
                        return callBack(null, {
                            data: results[0],
                            pagination: results2[0][0],
                        });
                    }
                );
                // return callBack(null, results);
            }
        );
    }
    static selectForumPosts = (params, callBack) => {
        connection.query(
            `CALL checkd.sp_get_forum_posts (${params.user_id},${params.group_id},${(params.page - 1) * 10})`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }

                connection.query(
                    `CALL checkd.sp_forum_pagination (${params.group_id},${params.user_id})`, (error2, results2,) => {
                        if (error2) {
                            return callBack(error2);
                        }
                        return callBack(null, {
                            data: results[0],
                            pagination: results2[0][0],
                        });
                    }
                );
                // return callBack(null, results);
            }
        );
    }
    static selectPostById(id, callBack) {
        connection.query(
            'select * from checkd.post where id=?',
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    }
    static deletePostById(id, callBack) {
        connection.query(
            'DELETE from checkd.post where id=?',
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    }
    static updatePostById = (data, callBack) => {
        connection.query(
            'update checkd.post set user_name=? where id=?',
            [data.user_name, data.id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    }
}
