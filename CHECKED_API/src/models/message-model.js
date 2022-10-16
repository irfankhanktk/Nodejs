import connection from '../config/db-connection.js';

export class Message {
    constructor(newMessage) {
    }
    static insert = (newMessage, callBack) => {
        let text = newMessage.message_text;
        if (text) {
            const regex = /'/ig;
            text = text.replace(regex, "\\'");
        }
        connection.query(
            `SELECT EXISTS(SELECT * from follower WHERE (from_id=${newMessage.from_id} AND to_id=${newMessage.to_id} and is_from=1 and is_to=1)
            OR (from_id=${newMessage.to_id} AND to_id=${newMessage.from_id} and is_from=1 and is_to=1) ) as is_followed_each_other;`,
            (error, results,) => {
                if (error) {
                    return callBack(error);
                } else if (!results[0].is_followed_each_other) {
                    return callBack('You have not followed each other');
                }
                connection.query(
                    `CALL checkd.sp_insert_message (${newMessage.from_id},${newMessage.to_id},'${newMessage.message_type}','${text}','${newMessage.image}',${newMessage.is_group})`, (error, results,) => {
                        if (error) {
                            return callBack(error);
                        }
                        return callBack(null, results[0][0]);
                    }
                );
            }
        );
    }
    static selectAll = (params, callBack) => {
        console.log('parmas:', params);
        connection.query(
            `CALL checkd.sp_get_messages (${params.from_id},${params.to_id},${params.is_group})`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
    static selectLast = (params, callBack) => {
        console.log('parmas:', params);
        connection.query(
            `CALL checkd.sp_get_last_message (${params.from_id},${params.to_id},${params.is_group})`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
    static updateMessageIsSeenStatus = (params, callBack) => {
        console.log('parmas in updateMessageIsSeenStatus:', params);
        connection.query(
            `CALL checkd.sp_update_message_is_seen_status (${params.message_id})`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static deleteMessages = (params, callBack) => {
        connection.query(
            `CALL checkd.sp_delete_messages ('${params.mids}',${params.is_last_msg ? 1 : 0},'${params.from_id}','${params.to_id}')`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

    static selectChats = (params, callBack) => {
        connection.query(
            `CALL checkd.sp_get_chats (${params.user_id})`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }

    static selectMessageById(id, callBack) {
        connection.query(
            'select * from checkd.messages where id=?',
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result);
            }
        );
    }
    static updateMessageById = (data, callBack) => {
        connection.query(
            'update checkd.messages set user_name=? where id=?',
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
