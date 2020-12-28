import axios from 'axios'

const baseURL = '/api/subs'

const pathService = axios.create({ baseURL })

export const getAllSuscribers = () => pathService.get('')

export const getSingleSuscriber = id => pathService.get(`/${id}`)
    
export const createSubscription =  path => pathService.post(`/create`, path)

export const deleteSuscriber = id => pathService.delete(`/${id}`) 