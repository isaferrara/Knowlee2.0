import axios from 'axios'

const baseURL = '/api/topic'

const pathService = axios.create({ baseURL })

export const getAllTopic = () => pathService.get('')

export const getSingleTopic = id => pathService.get(`/${id}`)
    
export const createTopic =  path => pathService.post(`/create`, path)
    
export const updateTopic = (id, topic) => pathService.put(`/${id}`, topic)

export const updateContent = (id, topic) => pathService.put(`/${id}`, topic)
    
 export const deleteTopic = id => pathService.delete(`/${id}`) 