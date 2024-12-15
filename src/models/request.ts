export interface ApiResponse<T = null> {
  status_code: number
  message: string | null
  data: T | null
}

export enum CaptchaPurpose {
  REGISTER = 0,
  RECOVER = 1,
}
