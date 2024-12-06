import axios, { AxiosHeaders, type AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/models/request'
const ServerURL = 'http://localhost:8123'

const requests = axios.create({
  baseURL: ServerURL,
  timeout: 5000,
  withCredentials: true,
})

requests.interceptors.request.use(
  (request) => {
    if (localStorage.getItem('token')) {
      request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }

    return request
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

requests.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('Response error:', error)
    return Promise.reject(error)
  },
)

const get = <T = null>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  return requests.get(url, { params, ...config })
}

const post = <T = null>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  return requests.post(url, data, { ...config })
}

const postForm = <T = null>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  let form = new FormData()
  for (let key in data) {
    form.append(key, String(data[key]))
  }
  return requests.post(url, data, { ...config })
}

export { get, post, postForm }
