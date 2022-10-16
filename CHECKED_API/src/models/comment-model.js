import connection from '../config/db-connection.js';

export class Comment {
    constructor(newComment) {
    }
    static insert = (params, callBack) => {
        let text=params.comment;
        if(text){
            const regex = /'/ig;
             text=params.comment.replace(regex, "\\'");
        }
        connection.query(
            `CALL checkd.sp_comment_post(${params.user_id},${params.post_id},'${text}','${params.post_owner_id}')`, (error, results,) => {
            if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0][0]);
            }
        );
    }
    //get-comments-post-id
    static selectByPostId = (params,callBack) => {
        connection.query(
            `CALL checkd.sp_get_comments (${params.post_id})`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
}
