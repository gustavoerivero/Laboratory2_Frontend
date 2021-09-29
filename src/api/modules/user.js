import { apiHttp } from '../axiosApi.js'
import { userPath } from '../config/apiRoute.js'

export const createAdmin = (body) => apiHttp('POST', `${userPath}/add`, body)
export const createUser = (programCode, body) => apiHttp('POST', `/${userPath}/add/${programCode}`, body)
export const getAllUsers = () => apiHttp('GET', `${userPath}/get`)
export const getUserById = (id) => apiHttp('GET', `${userPath}/get/${id}`)
export const getUserByEmail = (email) => apiHttp('GET', `${userPath}/get/correo/${email}`)
export const getUserByUsername = (username) => apiHttp('GET', `${userPath}/get/username/${username}`)
export const login = (username, password) => apiHttp('GET', `${userPath}/login/${username}/${password}`)
export const getProgramByCode = (code) => apiHttp('GET', `${userPath}/get/codigo/${code}`)
export const updateAdmin = (username, body) => apiHttp('PUT', `${userPath}/update/${username}`, body)
export const updateUser = (username, programCode, body) => apiHttp('PUT', `${userPath}/update/${username}/${programCode}`, body)
export const deleteProgram = (id) => apiHttp('DELETE', `${userPath}/delete/${id}`)