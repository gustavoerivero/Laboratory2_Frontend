import { apiHttp } from '../axiosApi.js'
import { pensumPath } from '../config/apiRoute.js'

export const createPensum = (programCode, body) => apiHttp('POST', `${pensumPath}/add/${programCode}`, body)
export const getAllPensums = () => apiHttp('GET', `${pensumPath}/get`)
export const getPensumById = (id) => apiHttp('GET', `${pensumPath}/get/${id}`)
export const getPensumByCode = (code) => apiHttp('GET', `${pensumPath}/get/codigo/${code}`)
export const getPensumByProgram = (programCode) => apiHttp('GET', `${pensumPath}/get/programa/${programCode}`)
export const updatePensum = (code, programCode, body) => apiHttp('PUT', `${pensumPath}/update/${code}/${programCode}`, body)
export const deletePensum = (id) => apiHttp('DELETE', `${pensumPath}/delete/${id}`)