const { verify } = require('jsonwebtoken')

module.exports = {
    checkToken:(req, res, next) => {
        let token = req.get('authorization')
        if (token) {
            token = token.slice(7);
            verify(token,'irfan1234',(error,decoded)=>{
                if(error){
                    res.status(403).json({
                        success: 0,
                        message: 'invalid token'
                    })
                }else{
                    next();
                }
            })
        } else {
            res.status(403).json({
                success: 0,
                message: 'access denied for un-authorized user'
            })
        }
    }
}