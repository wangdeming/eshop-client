<template>
  <div class="home-direct-supply">
    <m-floor title="推荐商家"  >
      <div class="direct-supply-wrap" slot="content">
        <div class="wrap-item" :key="key" v-for="(item, key) in list">
          <img class="ignore" :src="item.img" alt=""  @click="goAdTarget(item.type,item.relationVal)">
        </div>
      </div>
    </m-floor>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['list']
}
</script>

<style lang="less" scoped>
  .home-direct-supply{
    background: #ffffff;
    clear: both;
    .direct-supply-wrap{
      display: flex;
      flex-wrap: wrap;
      .wrap-item{
        flex-basis: calc(50% - 0.2rem);
        color:#333;
        .ignore{
          width:100%;
        }
        &:nth-child(2n + 1){
          margin:0 0.4rem 0.4rem 0;
        }
        &:nth-child(2n){
          margin-bottom:30px;
        }
      }
    }
  }
</style>
