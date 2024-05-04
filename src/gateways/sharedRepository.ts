export type ApiError = Readonly<{
  code: string
  message: string
  status: number
  timestamp: string
}>

export type ApiErrorJava = Readonly<{
  type: string
  title: string
  status: number
  detail: string
  instance: string
  properties: string
}>

export const UnsupportedMediaTypeStatus = 415
