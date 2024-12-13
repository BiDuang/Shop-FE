export interface UserToken {
  access_token: string
  token_type: string
}

export enum Permission {
  ADMIN = 2,
  USER = 1,
  GUEST = 0,
}

export interface LoginForm {
  username: string
  password: string
  [key: string]: string
}

export interface RegisterForm {
  email: string
  username: string
  password: string
  captcha: string
  [key: string]: string
}

export interface RegisterModel {
  email: string
  username: string
  password: string
  confirm_password: string
  captcha: string
  [key: string]: string
}

export interface RecoverForm {
  email: string
  password: string
  captcha: string
  [key: string]: string
}

export interface RecoverModel {
  email: string
  password: string
  confirm_password: string
  captcha: string
  [key: string]: string
}

export interface UpdateProfile {
  password: string | null
  permission: Permission | null
  [key: string]: string | Permission | null
}

export interface UserAddress {
  aid: string
  uid: string
  name: string
  phone: string
  address: string
  is_default: boolean
  [key: string]: string | boolean
}

export interface AddressRequest {
  name: string
  phone: string
  address: string
  is_default: boolean
  [key: string]: string | boolean
}

export interface User {
  uid: string
  username: string
  email: string
  permission: Permission
}

export interface UserState {
  uid?: string
  username?: string
  email?: string
  permission?: Permission
}
