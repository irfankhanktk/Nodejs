import jwt from 'jsonwebtoken';
let refreshTokens=[];
const verifyToken = (req, res, next) => {
    let token = req.body.token || req.query.token ||req.headers["authorization"] || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("unauthorized user");
    }
    try {
        token=token.split(' ')[1];
        const decoded = jwt.verify(token, 'irfankhanktk');
        req.user = decoded.result;
        // console.log('user: ',req.user);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    console.log('kskfdjsk');
    return next();
};
const refreshToken = (req, res, next) => {
    let token = req.body.refresh_token;
    console.log('token::',token);
    if (!token || !refreshTokens.includes(token)) {
        return res.status(403).send("unauthorized user");
    }
    try {
        // token=token.split(' ')[1];
        console.log('refresh token: ',token);
        const decoded = jwt.verify(token, 'irfankhanktk1234');
        req.user = decoded;
       return res.json(generateToken(decoded));
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};
const generateToken=(credentials)=>{
    const access_token = jwt.sign({ result: credentials },'irfankhanktk') //{ expiresIn: '1d' }
    const refresh_token = jwt.sign({ result: credentials }, 'irfankhanktk1234');
    refreshTokens.push(refresh_token);
    return ({
        access_token,
        refresh_token,
    })
}
const tokens= {
    verifyToken,
    generateToken,
    refreshToken,
};
export default tokens;