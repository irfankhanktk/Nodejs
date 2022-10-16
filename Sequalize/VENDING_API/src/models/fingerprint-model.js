import connection from '../config/db-connection.js';

export class Fingerprint {
    constructor(newfingerprint) {
      
    }
    static insert = (newFingerprint, callBack) => {
        connection.query(
            'INSERT INTO vending.fingerprint SET ?', newFingerprint, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
    static getAllFingerprints = (params,callBack) => {
     
        const status =params.is_primary==1?1:0;
        connection.query(
            `select * from fingerprint where is_primary=${status}`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );

    }
    static getFingerprints = (params,callBack) => {
        const per_page = params.per_page || 10;
        const page = params.page || 1;
        const skip=(page-1)*per_page;
        const status =params.is_primary==1?1:0;
        connection.query(
            `CALL vending.sp_get_fingerprints(${per_page},${skip},${status})`, (error, results,) => {
                if (error) {
                    return callBack(error);
                }
                connection.query(
                    `CALL vending.sp_get_fingerprints_pagination(${per_page},${status})`, (error2, results2,) => {
                        if (error2) {
                            return callBack(error2);
                        }
                        console.log('results2[0][0]:::',results2[0][0]);
                        return callBack(null, {
                            data: results[0],
                            pagination: {...results2[0][0],current_page:page*1,per_page:per_page*1},
                        });
                    }
                );
            }
        );
    }
   
}
