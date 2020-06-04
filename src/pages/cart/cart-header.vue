<template>
  <div class="cart-header">
    <span class="header-left">购物车</span>
    <span class="header-right" @click="changeModel" v-if="!cartDefault">
      {{cartModel ? '完成' : '编辑'}}
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['cartModel','cartDefault'],
  methods: {
    changeModel () {
      this.$emit('changeModel');
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../static/less/index';
  .cart-header{
    position: relative;
    height: 88px;
		width: 100%;
    background: white;
    .header-left{
			display: inline-block;
			height: 88px;
			line-height: 88px;
			float: left;
      font-size: 36px;
			color: #000000;
			margin-left: 27px;
    }
    .header-right{
      display: inline-block;
      height: 88px;
      line-height: 88px;
      float: right;
      font-size: 30px;
			color: #C9AB5D;
      margin-right: 27px;
    }
  }
</style>
