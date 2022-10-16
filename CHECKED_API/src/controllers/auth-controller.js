import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { CheckedUser } from '../models/auth-model.js';

// import tokens from '../middlewares/token.js';
import token from '../middlewares/token.js'
import loggerController from './logger-controller.js';
import { transporter } from '../services/node-email.js';
// create new user

export default {
    register: (req, res) => {
        try {
            // if (!req.file) {
            //     res.status(500).json({
            //         success: 0,
            //         message: `You must select a file.`,
            //     })
            // }
            let body = { ...req.body, image:req.file&&req.file.filename? req.file.filename:null };
            // let body = { ...req.body, image: null };

            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);


            CheckedUser.insert(body, (error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: result,
                });
            });

        } catch (error) {

            loggerController.writeLog('controller : auth =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getAllUsers: (req, res, f) => {
        try {
            CheckedUser.selectAll((error, result) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                console.log('successs');
                return res.status(200).json({
                    success: 1,
                    data: result,
                });
            });
        } catch (error) {
            loggerController.writeLog('controller : auth =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    //login
    login: (req, res) => {
        const body = req.body;
        console.log('body', body);
        try {
            CheckedUser.isUserExists(body.email, (error, eResult) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                if (!eResult) {
                    console.log('eResult:', eResult);
                    return res.status(403).json({
                        success: 0,
                        message: 'invalid email or password',
                    });
                }
                const bool = compareSync(body.password, eResult.password);
                if (bool) {
                    delete eResult.password;

                    const jsonTokens = token.generateToken(eResult);
                    return res.status(200).json({
                        // success: 1,
                        // message: 'login successfully',
                        user: eResult,
                        access_token: jsonTokens.access_token,
                        refresh_token: jsonTokens.refresh_token,
                        expiresIn: '2h'
                    });
                }
                return res.json({
                    success: 0,
                    message: 'invalid email or password',
                });

            });
        } catch (error) {
            loggerController.writeLog('controller : auth =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getRefreshToken: (token.refreshToken),
    getOtp: (req, res) => {

        try {
            CheckedUser.isUserExists(req.body.email, (error1, eResult) => {
                if (error1) {
                    console.log('error1', error1);
                    return res.status(500).json({
                        success: 0,
                        message: error1,
                    });
                }
                else if (!eResult) {
                    var otp = Math.floor(100000 + Math.random() * 900000);
                    otp = parseInt(otp);
                    console.log('otp::',otp);
                    // send mail with defined transport object
                    var mailOptions = {
                        from: `CHECKD <'checkd.io9'>`,
                        to: req.body.email,
                        subject: "Otp for registration is: ",
                        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log('error::',error);
                            return res.status(500).json({
                                success: 0,
                                message: error,
                            });
                        }
                        console.log('Message sent: %s', info.messageId);
                        // console.log('Preview URL: %s', nodemaile.getTestMessageUrl(info));

                        return res.status(200).json({
                            success: 1,
                            otp: otp,
                        });
                    });
                } else {
                    res.status(422).json({
                        success: 0,
                        message: 'Email is already registered'
                    })
                }
            })
        } catch (error) {
            console.log(error);
            loggerController.writeLog('controller : auth =>' + error);
            return res.status(500).json({
                success: 0,
                message: { ...error },
            });
        }
    },
}

//         const bool = compareSync(body.user_password, eResult.user_password);
//         console.log('bool:', bool);
//         if (bool) {
//             eResult.user_password = undefined;
//             const jsonToken = sign({ result: eResult }, 'irfan1234', { expiresIn: '1h' });
//             return res.status(200).json({
//                 success: 1,
//                 message: 'login successfully',
//                 token: jsonToken,
//             });

//         }
//         return res.json({
//             success: 0,
//             message: 'invalid email or password',
//         });
//     });
// }
// export function getUserById(req, res, f) {
//     getUser(req.params.id, (error, result, fields) => {
//         if (error) {
//             console.log('error', error);
//             return res.status(500).json({
//                 success: 0,
//                 message: error,
//             });
//         }
//         return res.status(200).json({
//             success: 1,
//             data: result[0],
//         });
//     });
// }
// export function updateUserById(req, res, f) {
//     const body = req.body;
//     body.id = req.params.id;
//     updateUser(body, (error, result, fields) => {
//         if (error) {
//             console.log('error', error);
//             return res.status(500).json({
//                 success: 0,
//                 message: error,
//             });
//         }
//         return res.status(200).json({
//             success: 1,
//             data: 'updated succesfully',
//         });
//     });
// }
