import axios, { AxiosHeaders, type AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/models/request'
import { message } from 'ant-design-vue'

export const ServerURL = 'http://10.169.6.12:8123'

const requests = axios.create({
  baseURL: ServerURL,
  timeout: 5000,
  withCredentials: true,
})

requests.interceptors.request.use(
  (request) => {
    if (localStorage.token) {
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
    return response.data
  },
  (error) => {
    if (error.response.data.message) {
      message.error(error.response.data.message)
    } else {
      message.error('Server error')
    }
    return Promise.reject(error)
  },
)

const get = <T = null>(
  url: string,
  params?: Record<string, unknown>,
  headers?: AxiosHeaders,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  return requests.get(url, { params, headers, ...config })
}

const post = <T = null>(
  url: string,
  data?: Record<string, unknown>,
  headers?: AxiosHeaders,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  return requests.post(url, data, { headers, ...config })
}

const postForm = <T = null>(
  url: string,
  data?: Record<string, unknown>,
  headers?: AxiosHeaders,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  const form = new FormData()
  for (const key in data) {
    form.append(key, String(data[key]))
  }
  return requests.post(url, form, { headers, ...config })
}

const put = <T = null>(
  url: string,
  data?: Record<string, unknown>,
  headers?: AxiosHeaders,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  return requests.put(url, data, { headers, ...config })
}

const del = <T = null>(
  url: string,
  headers?: AxiosHeaders,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  return requests.delete(url, { headers, ...config })
}

export { get, post, postForm, put, del }
