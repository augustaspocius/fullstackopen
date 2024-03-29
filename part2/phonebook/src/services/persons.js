import axios from 'axios'
const baseUrl = 'http://localhost:3003/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deleteObj = (id, newObject) => {
  return axios.delete(`${baseUrl}/${id}`, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll: getAll, 
  create: create,
  delete: deleteObj,
  update: update 
}