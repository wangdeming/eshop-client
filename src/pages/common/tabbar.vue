<template>
  <div class="tabbar">
    <div class="tabbar-item" :class="{'tabbar-item-active': $route.name === item.path}"
         :key="key"
          v-for="(item, key) in items"
          @click="$go(item.path)">
      <svg class="icon" >
        <use v-if="$route.name === item.path" :xlink:href="item.activeicon"></use>
        <use v-else :xlink:href="item.icon"></use>
      </svg>
      <span>{{item.text}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['items']
}
</script>

<style lang="less" scoped>
  .tabbar{
    display: flex;
    height: 100px;
    background: rgba(250,250,250,0.90);
    border-top: 1px solid #CCCCCC;;
    box-shadow: inset 0 0 0 0 rgba(0,0,0,0.25);
    .tabbar-item{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex:1;
      color:#8E8E93;;
      span{
        font-size: 0.27rem;
        font-weight: 400;
        line-height: 0.6rem;
        margin-bottom: -0.2rem;
      }
      &-active{
        color:#C9AB5D
      }
    }
  }
</style>
