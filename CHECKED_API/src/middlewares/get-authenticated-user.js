import jwt from 'jsonwebtoken';
export const get_authenticated_user = (req, res) => {
    const user={};
    let token = req.body.token || req.query.token ||req.headers["authorization"] || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("unauthorized user");
    }
    try {
        token=token.split(' ')[1];
        user = jwt.verify(token, 'irfankhanktk');
        console.log('user: ',user);
    } catch (err) {
        return res.status(401).send("Invalid Token from auth");
    }
    return user;
};