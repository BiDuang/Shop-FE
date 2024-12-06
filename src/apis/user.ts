import type { ApiResponse, CaptchaPurpose } from '@/models/request'
import type { LoginForm, RecoverForm, RegisterForm, User } from '@/models/user'
import { get, post, postForm } from '@/apis/index'
import { ElMessage } from 'element-plus'
import type { UserToken } from '@/models/user'

const login = async (loginForm: LoginForm): Promise<ApiResponse<UserToken>> => {
  const response = await postForm<UserToken>('/user/login', loginForm)
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }
  return response
}

const register = async (regForm: RegisterForm): Promise<ApiResponse> => {
  const response = await postForm('/user/register', regForm)
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

const register_captcha = async (email: string): Promise<ApiResponse> => {
  const response = await get('/user/captcha/register', { email })
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

const recover_captcha = async (email: string): Promise<ApiResponse> => {
  const response = await get('/user/captcha/recover', { email })
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

const profile = async (): Promise<ApiResponse<User>> => {
  const response = await get<User>('/profile')
  if (response.status_code != 200) {
    ElMessage({ message: response.message, type: 'error' })
    return Promise.reject(response)
  }

  return response
}

export default {
  login,
  register,
  recover,
  register_captcha,
  recover_captcha,
  profile,
}
