import db from '../models/index.js'
import fs from 'fs'
import {generateAccessToken, getUserIdFromToken} from '../utilities/authentication.js'
import {hashPassword, comparePassword} from '../utilities/passwordUtils.js'

const signup = async (req) => {
    try {
        const {email, password, name} = req.body
        console.log('req', req.body)
        let emailExist = await db.User.findOne({where: {email: email}})
        if (!emailExist) {
            let hashedPassword = await hashPassword(password)
            let createUser = await db.User.create({email: email, password: hashedPassword, name: name})
            if (createUser) {
                let token = await generateAccessToken(createUser)
                return {
                    status: true,
                    message: 'User created successfully',
                    data: {user: createUser, token: token}
                }
            }
        }
        return {
            status: false,
            message: 'Email already exist.Try another email'
        }
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: error.message
        }
    }
}

const login = async (req) => {
    try {
        const {email, password} = req.body
        let userExist = await db.User.findOne({where: {email: email}})
        if (userExist) {
            let checkPassword = await comparePassword(password, userExist.password)
            if (checkPassword) {
                let token = await generateAccessToken(userExist)
                return {
                    status: true,
                    message: 'User login successfully',
                    data: {user: userExist, token: token}
                }
            }
            return {
                status: false,
                message: 'Wrong password'
            }
        }
        return {
            status: false,
            message: 'Wrong email'
        }
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: error.message
        }
    }
}

const allUsers = async (req) => {
    try {
        let users = await db.sequelize.query(`SELECT users.id, users.email,users.name, userdetails.age, userdetails.height, userdetails.address, userdetails.profile FROM users, userdetails WHERE users.id = userdetails.user_id`, {type: db.QueryTypes.SELECT})
        return {
            status: true,
            message: 'All user',
            data: users
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

const searchUser = async (req) => {
    try {
        let terms = req.params.term
        terms = '%' + terms + '%'
        console.log('=======query', terms)
        //SELECT users.id, users.email,users.name, userdetails.age, userdetails.height, userdetails.address, userdetails.profile FROM users INNER JOIN userdetails ON users.id = userdetails.user_id WHERE users.name LIKE '%LAHO%' OR userdetails.address LIKE '%LAHO%'
        let matchedUsers = await db.sequelize.query(`SELECT users.id, users.email,users.name, userdetails.age, userdetails.height, userdetails.address, userdetails.profile FROM users INNER JOIN userdetails ON users.id = userdetails.user_id WHERE users.name LIKE :query OR userdetails.address LIKE :query`, {replacements: {query: `${terms}`}, type: db.QueryTypes.SELECT})
        if (matchedUsers) {
            console.log('mmmmm', matchedUsers)
            return {
                status: true,
                message: 'User Found',
                data: matchedUsers
            }
        }
        return {
            status: false,
            message: 'User not found'
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

const updateUser = async (req) => {
    try {
        let userId = await getUserIdFromToken(req)
        let user = await db.User.findOne({where: {id: userId}})
        if (user) {
            let {email, password, name, age, height, address, profile} = req.body
            if (email || password || name) {
                let hashedPassword = null
                if (password) {
                    hashedPassword = await hashPassword(password)
                }
                await db.User.update({password: hashedPassword ? hashedPassword : user.password, name: name ? name : user.name}, {where: {id: userId}})
            }
            let image = null

            if (age || height || address || profile) {
                if (profile) {
                    image = await addImageCB(profile)
                }
                let chk = await db.UserDetail.findOne({where: {user_id: userId}})
                chk ? await db.UserDetail.update({age: age ? age : user.age, height: height ? height : user.height, address: address ? address : user.address, profile: image}, {where: {user_id: userId}}) : await db.UserDetail.create({age: age, height: height, address: address, user_id: userId, profile: image})
            }
            let updatedUser = await db.sequelize.query(`SELECT users.id, users.email,users.name, userdetails.age, userdetails.height, userdetails.address, userdetails.profile FROM users, userdetails WHERE users.id = userdetails.user_id AND users.id = ${userId}`, {type: db.QueryTypes.SELECT})
            if (updatedUser) {
                return {
                    status: true,
                    message: 'User updated',
                    data: {user: updatedUser}
                }
            }
            return {
                status: false,
                message: 'User cannot be updated'
            }
        }
        return {
            status: false,
            message: 'User not found'
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

// Add images for user
const addImageCB = async (image) => {
    if (!fs.existsSync('src/uploads/users')) {
        fs.mkdir('src/uploads/users', {recursive: true}, (err) => {
            if (err) throw err
        })
    }
    var data = image.replace(/^data:image\/\w+;base64,/, '')
    var filename = Date.now() + '.png'
    fs.writeFile(`src/uploads/users/${filename}`, data, {encoding: 'base64'}, async function (err) {
        if (err) return err
    })
    return filename
}

// Remove images from  directory
const removeImageCB = async (image) => {
    const deleteImage = fs.unlink(`src/uploads/users/${image}`, (err) => {
        if (err) return err
    })
    return deleteImage
}

export {signup, login, allUsers, searchUser, updateUser}
