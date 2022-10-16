import connection from '../config/db-connection.js';

export class Like {
    constructor(newLike) {
    }
    static likeDislike = (params, callBack) => {
        connection.query(
            `CALL checkd.sp_like_dislike(${params.user_id_from},${params.user_id_to},${params.post_id})`, (error, results,) => {
            if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0][0]);
            }
        );
    }
    static selectAll = (callBack) => {
        connection.query(
            'SELECT * FROM checkd.postlikes', [], (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}
