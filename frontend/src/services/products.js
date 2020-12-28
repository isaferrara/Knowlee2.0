import axios from 'axios'
import isProd from '../utils/isProd'

const baseURL = isProd ? '/api/product' : 'http://localhost:3000/api/product'



const productsService = axios.create({ baseURL })

export const getProduct100 = () => productsService.get('/100')
export const getProduct200 = () => productsService.get('/200')
export const getProduct300 = () => productsService.get('/300')
export const getProduct400 = () => productsService.get('/400')