import { apiHttp } from '../axiosApi.js'
import { programPath } from '../config/apiRoute.js'

export const createProgram = (body) => apiHttp('POST', `${programPath}/add`, body)
export const getAllPrograms = () => apiHttp('GET', `${programPath}/get`)
export const getProgramById = (id) => apiHttp('GET', `${programPath}/get/${id}`)
export const getProgramByCode = (code) => apiHttp('GET', `${programPath}/get/codigo/${code}`)
export const updateProgram = (code, body) => apiHttp('PUT', `${programPath}/update/${code}`, body)
export const deleteProgram = (id) => apiHttp('DELETE', `${programPath}/delete/${id}`)