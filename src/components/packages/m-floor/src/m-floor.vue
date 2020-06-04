<template>
  <div class="m-floor">
    <div class="floor-header">
      <div class="f-left">{{title}}</div>
      <div class="f-right">
        <slot name="header-r"></slot>
      </div>
    </div>
    <div class="floor-view" :style="styles">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'm-floor',
  props: ['title', 'styles']
}
</script>

<style lang="less" scoped>
  @import '../../../../static/less/index';
  .m-floor{
    background: white;
    .floor-header{
      display: flex;
      align-items: center;
      justify-content: left;
      padding: 0 0.4rem;
      height: 105px;
      .f-left{
        flex-direction: column;
        justify-content: center;
        flex:1;
        font-size: 0.45rem;
        font-weight: 600;
        color:#333;
      }
      .f-right{
        font-size: 0.3rem;
        color:#666;
        .icon{
          width: 0.38rem;
          vertical-align: middle;
        }
      }
    }
    .floor-view{
      padding:0 0.4rem;
    }
  }
</style>
