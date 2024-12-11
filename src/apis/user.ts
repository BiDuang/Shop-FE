import type { ApiResponse } from '@/models/request'
import type {
  AddressRequest,
  LoginForm,
  RecoverForm,
  RegisterForm,
  UpdateProfile,
  User,
  UserAddress,
} from '@/models/user'
import { del, get, post, postForm, put } from '@/apis/index'
import { ElMessage } from 'element-plus'
import type { UserToken } from '@/models/user'
import { AxiosHeaders } from 'axios'

const login = async (loginForm: LoginForm): Promise<ApiResponse<UserToken>> => {
  const response = await postForm<UserToken>('/user/login', loginForm)
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }
  return response
}

const register = async (regForm: RegisterForm, request_id: string): Promise<ApiResponse> => {
  const headers = new AxiosHeaders()
  headers.set('request-id', request_id)
  const response = await postForm('/user/register', regForm, headers)
  if (response.status_code != 201) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

const recover = async (recForm: RecoverForm): Promise<ApiResponse> => {
  const response = await postForm('/user/recover', recForm)
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

const registerCaptcha = async (email: string): Promise<ApiResponse<string>> => {
  const response = await get<string>('/user/captcha/register', { email })
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

const recoverCaptcha = async (email: string): Promise<ApiResponse<string>> => {
  const response = await get<string>('/user/captcha/recover', { email })
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

const getProfile = async (): Promise<ApiResponse<User>> => {
  const response = await get<User>('/profile')
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

const updateProfile = async (profile: UpdateProfile, user_id: string): Promise<ApiResponse> => {
  const response = await put(`/user/profile/${user_id}`, profile)
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

const getAddress = async (): Promise<ApiResponse<UserAddress>> => {
  const response = await get<UserAddress>('/user/address')
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

const addAddress = async (address: AddressRequest): Promise<ApiResponse> => {
  const response = await post('/user/address', address)
  if (response.status_code != 201) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

const updateAddress = async (address: AddressRequest, aid: string): Promise<ApiResponse> => {
  const response = await put(`/user/address/${aid}`, address)
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

const deleteAddress = async (aid: string): Promise<ApiResponse> => {
  const response = await del(`/user/address/${aid}`)
  if (response.status_code != 20) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}
export default {
  login,
  register,
  recover,
  registerCaptcha,
  recoverCaptcha,
  getProfile,
  updateProfile,
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
}
