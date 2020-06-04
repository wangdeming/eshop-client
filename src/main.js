// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// css
import 'normalize.css'
import 'animate.css'
import '@/static/less/index.less'

// libs
// import '@/libs/cube-ui'
import '@/components'
import 'amfe-flexible'

// routes
import {router} from '@/router'

// extends
import '@/extends'

// mock
// import '@/service/mock'
import axios from '@/libs/api.request'
// logic
import store from '@/logic'
import Cube from 'cube-ui'

import {
  AjaxPlugin,
  ToastPlugin,
  AlertPlugin
} from 'vux'

// vux插件集合
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)

Vue.use(Cube)
Vue.config.productionTip = false

const root = process.env.API_HOST;

// 定义一个全局混合对象
Vue.mixin({
  data() {
    return {
      api: require('./config/api.js')
    }
  },
  methods: {
    request(url, data = {}) {
      let ress=axios.request({
        url:   url,
        params: data,
        method: 'post'
      })
      ress.then(res=>{
        if(res.code==9999){
          let curl=window.location.href;
          window.location.href = process.env.API_HOST + "wechatlogin/auth?url=" + curl;
        }
      })
      return ress
    },
    goshop(id){
      this.request(this.api.ShopInfo,{shopId:id}).then(res => {
        if (res.code == 200) {
          if(res.data.status==3){
            this.$go('/shop?id='+id)
          }else{
            this.$toast('店铺已打烊','error');
          }
        }
      });
    },
    goAdTarget(type,relationVal){
      if(type==1){
        Vue.prototype.$go('/goods/'+relationVal)
      }
      if(type==2){
        this.goshop(relationVal)
      }
      if(type==3){
        window.location.href=relationVal
      }
      return false;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
