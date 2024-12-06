export interface UserToken {
  access_token: string
  token_type: string
}

export interface LoginForm {
  username: string
  password: string
  [key: string]: string
}

export interface RegisterForm {
  username: string
  password: string
  email: string
  captcha: string
  [key: string]: string
}

export interface RecoverForm {
  email: string
  password: string
  captcha: string
  [key: string]: string
}

export interface User {
  uid: string
  username: string
  email: string
  permission: string
}

export interface UserState {
  uid?: string
  username?: string
  email?: string
  permission?: string
}
