<template xmlns="http://www.w3.org/1999/html">
  <page :better-scroll="false" page-background="white">
     <div class="info">
       <svg class="icon">
         <use xlink:href="#icon-sce"></use>
       </svg>
       <p class="suc">支付成功</p>
       <p class="type">支付方式：微信支付</p>
       <div class="btn">
         <button @click="$go('/order/hotel-fram?id='+orderId)">查看订单</button>
       </div>
       <p class="tip">
         温馨提示：商家不会以酒店或订单异常为由要求您点击任何链接或提供个人信息进行退款操作。
       </p>
     </div>

  </page>
</template>

<script type="text/ecmascript-6">
  import nonepage from '../common/nonepage'
  import cellH from './cell-h.vue'
  export default {
    data () {
      return {
        orderId:this.$route.query.orderId
      }
    },
    methods: {
    },
    created () {
    },
  }
</script>

<style lang="less" scoped>
  .info{
    text-align: center;
    background: #fff;
    padding: 2rem 1rem;
    line-height: 0.5rem;
    font-size:0.34rem;
    color: #999999;
    .icon{
      width: 2rem;
      height: 2rem;
    }
    .suc{
      font-size:0.48rem;
      color: #C9AB5D;
      line-height: 1rem;
    }
    .type{
      font-size:0.48rem;
      line-height: 1rem;
    }
    .btn{
      button{
        margin-top: 1.3rem;
        margin-bottom: 0.5rem;
        background: #C9AB5D;
        border: none;
        width: 100%;
        color: #fff;
        font-size: 0.4rem;
        line-height: 1rem;
        border-radius: 1rem;
      }
    }

  }
</style>
