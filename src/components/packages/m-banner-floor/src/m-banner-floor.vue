<template>
  <div class="m-banner-floor">
    <div class="floor-header" :style="{backgroundImage: `url(${banner})`, color: color}">
      <h3>{{title}}</h3>
      <span :style="{background: background}">查看更多</span>
    </div>
    <div class="floor-view">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'm-banner-floor',
  props: ['title', 'banner', 'color', 'background']
}
</script>

<style lang="less" scoped>
  @import '../../../../static/less/index';
  .m-banner-floor{
    background: white;
    .floor-header{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 6.93rem;
      background: center no-repeat;
      background-size: 100% 100%;
      h3{
        font-size: 1.01rem;
      }
      span{
        display: inline-block;
        height: 1.5rem;
        width:6.45rem;
        margin-top:0.53rem;
        line-height: 1.5rem;
        text-align: center;
      }
    }
    .floor-view{
      padding:0.74rem 0;
      overflow-x: hidden;
    }
  }
</style>
