import connection from '../config/db-connection.js';

export class Notification {
    constructor(newNotification) {
    }
    static insert = (newNotification, callBack) => {
        connection.query(
            'INSERT INTO checkd.notification SET ?', newNotification, (error, results,) => {
            if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
 
    static selectNotificationById(id, callBack) {
        connection.query(
            `call checkd.sp_get_notifications('${id}')`,
            [id],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0]);
            }
        );
    }
    static selectNotification(query, callBack) {
        const {user_id_from,user_id_to,post_id,notification_type}=query;
        connection.query(
            `call checkd.sp_get_notification('${user_id_from}','${user_id_to}','${post_id}','${notification_type}')`,
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0][0]);
            }
        );
    }
}
