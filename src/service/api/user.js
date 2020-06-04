import axios from '@/libs/api.request'
export const user = {
  login: (params) => {
    return axios.request({
      url: 'user/login',
      data: params,
      method: 'post'
    })
  },
  wechatLogin: (params) => {
    return axios.request({
      url: 'wechatlogin/auth',
      data: params,
      method: 'post'
    })
  },
  getUserInfo: (params) => {
    return axios.request({
      url: 'shop/personal/info/select',
      data: params,
      method: 'post'
    })
  },
  updateUserInfo: (params) => {
    return axios.request({
      url: 'shop/personal/info/update',
      params,
      method: 'post'
    })
  }
}
