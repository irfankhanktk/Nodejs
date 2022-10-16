import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { VendingUser } from '../models/auth-model.js';

import token from '../middlewares/token.js'
import loggerController from './logger-controller.js';
import { transporter } from '../services/node-email.js';
// create new user

export default {
    registerSuper: (req, res) => {
        try {

           
            let body = { ...req.body,role:'superadmin' };

            const salt = genSaltSync(10);
            VendingUser.isUserExists(req.body.email, (error1, eResult) => {
                if (error1) {
                    console.log('error1', error1);
                    return res.status(500).json({
                        success: 0,
                        message: error1,
                    });
                }
                else if (!eResult) {


                    body.password = hashSync(body.password, salt);


                    VendingUser.insert(body, (error, result) => {
                        if (error) {
                            console.log('error', error);
                            return res.status(500).json({
                                success: 0,
                                message: error,
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message:'Account created succesfully',
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

            loggerController.writeLog('controller : auth =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    register: (req, res) => {
        try {
            const role=req.body.role;
            // if(((req.user.role==='admin'||req.user.role==='manager')&&(role==='admin'||role==='superadmin')) ||
            //  (req.user.role==='manager'&&(role==='admin'||role==='superadmin'||role==='manager')) ||
            //   (req.user.role==='vendor')
            //  ){
            //     return res.status(403).json({
            //         success: 0,
            //         message: 'You are not Authorized for this action',
            //     });
            // }
           
            let body = { ...req.body };

            const salt = genSaltSync(10);
            VendingUser.isUserExists(req.body.email, (error1, eResult) => {
                if (error1) {
                    console.log('error1', error1);
                    return res.status(500).json({
                        success: 0,
                        message: error1,
                    });
                }
                else if (!eResult) {


                    body.password = hashSync(body.password, salt);

                    VendingUser.insert({...body,created_by_email:body.created_by_email?body.created_by_email:req.user.email,created_by_id:req.user.id}, (error, result) => {
                        if (error) {
                            console.log('error', error);
                            return res.status(500).json({
                                success: 0,
                                message: error,
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message:'Account created succesfully',
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

            loggerController.writeLog('controller : auth =>' + error);
            return res.status(500).json({
                success: 0,
                message: error,
            });
        }
    },
    getAllUsers: (req, res, f) => {
        try {
            VendingUser.selectAll((error, result) => {
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
            VendingUser.isUserExists(body.email, (error, eResult) => {
                if (error) {
                    console.log('error', error);
                    return res.status(500).json({
                        success: 0,
                        message: error,
                    });
                }
                if (!eResult) {
                    console.log('eResult:', eResult);
                    return res.status(401).json({
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
                        // expiresIn: '2h'
                    });
                }
                return res.status(401).json({
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
            VendingUser.isUserExists(req.body.email, (error1, eResult) => {
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
                    // send mail with defined transport object
                    var mailOptions = {
                        from: `CHECKD <'vending.io9'>`,
                        to: req.body.email,
                        subject: "Otp for registration is: ",
                        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {

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
