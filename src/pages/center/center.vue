<template>
  <page :better-scroll="true" :header-immerse="true">
    <center-header slot="top"></center-header>
    <center-account
      :profile="profile"
      :isLogin="isLogin"></center-account>
    <center-order :ordernum="ordernum"></center-order>
    <center-service :ordernum="ordernum"></center-service>
  </page>
</template>

<script type="text/ecmascript-6">
import centerHeader from './center-header'
import centerAccount from './center-account'
import centerOrder from './center-order'
import centerNewUser from './center-new-user'
import centerService from './center-service'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      ordernum:[]
    }
  },
  computed: {
    ...mapState('user', ['isLogin', 'profile'])
  },
  components: {
    centerHeader,
    centerAccount,
    centerOrder,
    centerNewUser,
    centerService
  },
  created() {
//    document.title = this.$route.
    this.request(this.api.orderNum).then(res => {
      if (res.code === 200) {
        this.ordernum = res.data
      }
    })
  }
}
</script>
