<template>
</template>
<script type="text/ecmascript-6">
  import session from "../../libs/session";
  export default {
    created () {
      if(this.$route.query.code){
        session.setToken(this.$route.query.code);
        this.$go('/')
      }
      if (!session.isLogin()) {
        let curl=window.location.href;
        window.location.href = process.env.API_HOST + "wechatlogin/auth?url=" + curl;
      }
    }
  }
</script>

