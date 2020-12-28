import axios from 'axios'

const baseURL = '/api/favs'

const pathService = axios.create({ baseURL })

export const getAllFavs = () => pathService.get('')

export const getSingleFav = id => pathService.get(`/${id}`)
    
export const createFav =  path => pathService.post(`/create`, path)
    
 export const deleteFav = id => pathService.delete(`/${id}`) 