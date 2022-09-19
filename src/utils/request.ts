import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

interface Response {
  code: number
  message: string | null
  success: boolean
  data: any
}

export const service = axios.create({
  // https://api.imooc-front.lgdsunday.club/prod-api
  baseURL: import.meta.env.VITE_BASE_URL,
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.headers!.icode = '7b4b95ea813cdfa2799f0c719cd83fc6'
    // config.headers!.codetype = '1658993624'
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse<Response>) => {
    const { success, message, data } = response.data

    if (success)
      return data

    // NOTE: 注意，过期需要 window.location.href = '首页地址' 进行强制重新刷新，退出登录也是！！
    // TODO: 业务错误的处理
    return Promise.reject(new Error(message || '一些不可预期错误'))
  },
  (error) => {
    return Promise.reject(error)
  },
)

