<template>
  <div class="center-account" @click="$go('/account')">
    <div class="account-left">
      <div class="left-avatar">
        <img class="ignore" :src="profile.avatar | avatar" alt="">
      </div>
      <div class="left-name">
        <span v-if="isLogin">{{profile.nickname}}</span>
        <span v-if="!isLogin">请登录</span>
      </div>
    </div>
    <!--<div class="account-right">-->
      <!--<i class="iconfont">&#xe632;</i>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['isLogin', 'profile']
}
</script>

<style lang="less" scoped>
  .center-account{
    position: relative;
    height: 3.73rem;
    background: url('../../static/images/center/Mask.svg') center center no-repeat;
    background-size: 100% 100%;
    .account-left{
      position: absolute;
      top: 50%;
      left: 28px;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      .left-avatar{
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        .ignore{
          width:100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .left-name{
        padding-left:0.45rem;
        span{
          font-size:0.45rem;
          font-weight: 600;
          color:white;
        }
      }
    }
    .account-right{
      position: absolute;
      top: 50%;
      right: 28px;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      i{
        color:white;
      }
    }
  }
</style>
