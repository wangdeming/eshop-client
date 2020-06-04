import * as types from './mutation-types'
import {UserValidate} from '@/validate'
import {api} from '@/service/api'
import {toast} from '@/libs/cube-ui'
import session from '@/libs/session'

export const actions = {
  async login ({dispatch}, o) {
    const form = {
      account: o.mobile,
      password: o.password
    }
    let validate = new UserValidate('login').check(form)
    if (validate.success) {
      session.setToken('logintoken')
      let res1 = await dispatch('getUserInfo')
      toast('登录成功', 'correct');
      return {code:200}
      // let res = await api.user.login(form)
      // if (res.success) {
      //   session.setToken(res.data.token)
      //   let res1 = await dispatch('getUserInfo')
      //   toast('登录成功', 'correct')
      //   return res1
      // } else {
      //   toast(res.msg, 'warn')
      // }
    } else {
      toast(validate.errorMsg, 'warn')
    }
  },
  async wechatLogin ({dispatch}, s) {
    const form = {
      code: s
    }
    let res = await api.user.wechatLogin(form)
    if (res.code==200 && res.data.autoLogin==true) {
      session.setToken('logintoken')
      let res1 = await dispatch('getUserInfo')
      return res1
    } else {
      toast(res.msg, 'warn')
    }
  },
  async getUserInfo ({commit}) {
    if (localStorage.getItem('token')) {
      let res = await api.user.getUserInfo()
      commit(types.INIT_USER_INFO, res)
      commit(types.SET_LOGIN_STATE, true)
      return res
    }
  },
  async updateUserInfo ({dispatch}, o) {
    let res = await api.user.updateUserInfo(o)
    let res1 = await dispatch('getUserInfo')
    if (res1) {
      toast('操作成功', 'correct')
      return true
    }
  },
  async getUserOrder ({commit}, o) {
    let res = await api.user.getUserOrder()
    if (res.success) {
      // @TODO
    } else {
      toast(res.msg, 'warn')
    }
  },
  async logout ({commit}) {
    session.clearToken()
    toast('退出成功', 'correct')
    window.location.href = '/'
  }
}
