<template>
  <div class="center-service">
    <ul>
      <li @click="$go('/cart')"><svg class="icon" ><use xlink:href="#icon-my_car"></use></svg><div class="item-tit ">购物车 <span class="cartnum">共{{ordernum.shopCart}}件<svg class="icon icon-next" ><use xlink:href="#icon-my_icon_more"></use></svg></span></div></li>
      <li @click="$go('/address')"><svg class="icon" ><use xlink:href="#icon-my_place"></use></svg><div class="item-tit ">收货地址<svg class="icon icon-next" ><use xlink:href="#icon-my_icon_more"></use></svg></div></li>
      <li @click="$go('/tourist')"><svg class="icon" ><use xlink:href="#icon-my_tourist"></use></svg><div class="item-tit ">游客信息<svg class="icon icon-next" ><use xlink:href="#icon-my_icon_more"></use></svg></div></li>
      <li @click="$go('/account')"><svg class="icon" ><use xlink:href="#icon-my_per"></use></svg><div class="item-tit nobor">个人信息<svg class="icon icon-next" ><use xlink:href="#icon-my_icon_more"></use></svg></div></li>
      <!--<li><svg class="icon" ><use xlink:href="#icon-set"></use></svg><div class="item-tit ">设置<svg class="icon icon-next" ><use xlink:href="#icon-my_icon_more"></use></svg></div></li>-->
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['ordernum'],
  }
</script>
<style lang="less" scoped>
  .center-service{
    margin-top: 0.27rem;
    padding:0 0.27rem;
    line-height: 1.5rem;
    margin-bottom: 28px;
    background: white;
    font-size: 0.42rem;
    .icon{
      width:10%;
      display: inline-block;
    }
    .item-tit{
      width: 85%;
      margin-left: 3%;
      border-bottom: 1px solid #cccccc;
      display: inline-block;
     }
     .nobor{
       border: none;
     }
    .icon-next{
      float: right;
      margin-top: 0.4rem;
      width: 0.4rem;
    }
    .cartnum{
      color: #999999;
      float: right;
    }
  }



</style>
