import type { ApiResponse } from '@/models/request'
import { get } from '@/apis/index'
import type { BaseCommodity } from '@/models/commodity'
import { message } from 'ant-design-vue'

const getAllCommodities = async (page: number = 1): Promise<ApiResponse<BaseCommodity[]>> => {
  const response = await get<BaseCommodity[]>('/shop/all', { page })
  if (response.status_code != 200) {
    message.error(response.message)
    return Promise.reject(response)
  }

  return response
}

const getCommodity = async (cid: string): Promise<ApiResponse<BaseCommodity>> => {
  const response = await get<BaseCommodity>(`/shop/item/${cid}`)
  if (response.status_code != 200) {
    message.error(response.message)
    return Promise.reject(response)
  }

  return response
}

export default { getAllCommodities, getCommodity }
