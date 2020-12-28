import axios from 'axios'

const baseURL = '/auth'



const authService = axios.create({
  baseURL,
  withCredentials: true
})

export const signupFn = userInfo =>
  authService.post('/signup', userInfo)

export const loginFn = userInfo =>
  authService.post('/login', userInfo)

export const currentUserFn = () =>
  authService.get('/current-user')

export const logoutFn = () =>
  authService.get('/logout')

export const updateFn = (id, user) =>
authService.put(`/edit/${id}`, user)

export const profile = () => 
authService.get("/profile")

export const getAllUsers = () => 
authService.get('/user')

export const getSingleUser = id =>
authService.get(`/user/${id}`)