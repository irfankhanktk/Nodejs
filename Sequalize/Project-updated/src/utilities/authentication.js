import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import jwt_decode from 'jwt-decode'
dotenv.config()

const generateAccessToken = async (_payload) => {
    const payload = {id: _payload.id}
    return jwt.sign({payload}, process.env.JWT_SECRET, {expiresIn: 999999999})
}
//5184000
const verifyAuthToken = () => {
    return (req, res, next) => {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(403).send({message: 'Token not found'})
        } else {
            const tokenBody = token.slice(7)
            jwt.verify(tokenBody, process.env.JWT_SECRET, (error) => {
                if (error) {
                    return res.status(401).send({message: 'Access denied, expire token'})
                }
                next()
            })
        }
    }
}

const getUserIdFromToken = async (req) => {
    try {
        const token = req.header('authorization')
        const tokenBody = token.slice(7)
        const decoded = jwt_decode(tokenBody)
        let u_id = decoded.payload.id
        return u_id
    } catch (error) {
        return false
    }
}

const emailValidator = ()=>{
    return (req, res, next) => {
        let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
        let checkEmail =  pattern.test(req.body.email)
        if(!checkEmail){
            return res.status(350).send({status:false,message: 'Invalid Email'})
        }
        next()
    }

  }

export {generateAccessToken, verifyAuthToken, getUserIdFromToken, emailValidator}
