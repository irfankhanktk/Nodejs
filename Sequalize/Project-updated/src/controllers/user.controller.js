import * as userService from '../services/user.service.js'

const signup = async (req, res) => {
    const response = await userService.signup(req)
    return res.send(response)
}

const login = async (req, res) => {
    const response = await userService.login(req)
    return res.send(response)
}

const allUsers = async (req, res) => {
    const response = await userService.allUsers(req)
    return res.send(response)
}
const searchUser = async (req, res) => {
    const response = await userService.searchUser(req)
    return res.send(response)
}
const updateUser = async (req, res) => {
    const response = await userService.updateUser(req)
    return res.send(response)
}

export {signup, login, allUsers, searchUser, updateUser}
