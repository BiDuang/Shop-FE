export interface ApiResponse<T = null> {
  status_code: number
  message?: string
  data?: T
}

export enum CaptchaPurpose {
  REGISTER = 0,
  RECOVER = 1,
}
