export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  first_name: string
  last_name: string
  phone: string
  password: string
  confirm_password: string
}

export interface ResendOtpPayload {
  email: string
}

export interface VerifyOtpPayload {
  email: string
  code: string
}

export interface PasswordResetRequestPayload {
  email: string
}

export interface PasswordResetConfirmPayload {
  code: string
  password: string
  confirm_password: string
}

export interface OnboardPayload {
  service_to_perform: 'CUSTOMER' | 'SERVICE_PROVIDER'
}
