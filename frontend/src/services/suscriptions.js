import axios from 'axios'

const baseURL = 'http://localhost:3000/api/subs'

const pathService = axios.create({ baseURL })

export const getAllSuscribers = () => pathService.get('')

export const getSingleSuscriber = id => pathService.get(`/${id}`)
    
export const createSuscriber =  path => pathService.post(`/create`, path)
    
 export const deleteSuscriber = id => pathService.delete(`/${id}`) 