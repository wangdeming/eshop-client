import axios from '@/libs/api.request'
export const category = {
  getCategory: (params) => {
    return axios.request({
      url: 'shop/home/listFirstCategory',
      data: params,
      method: 'get'
    })
  },
  getSubCategoryByPid: (params) => {
    return axios.request({
      url: 'category/getSubCategoryByPid',
      data: params,
      method: 'get'
    })
  },
}
