import * as types from './mutation-types'

export const mutations = {
  [types.INIT_USER_INFO] (state, o) {
    state.profile.id = o.id
    state.profile.sex = o.sex
    state.profile.birthday = o.birthday
    state.profile.nickname = o.nickname
    state.profile.avatar = o.avatar
    state.profile.addressids = [o.provinceId,o.cityId,o.districtId]
  },
  [types.SET_LOGIN_STATE] (state, b) {
    state.isLogin = b
  }
}
