<template>
  <div class="specialty-section">
      <div class="wrap-item" v-for="item in items" @click="$go('/goods-by-specialty?sid='+item.id)">
        <div class="imgitem">
          <img class="ignore" :src="item.iconImg" alt="">
        </div>
        <p>{{item.frontName}}</p>
      </div>
      <div class="wrap-item" @click="$go('/category')">
        <div class="imgitem">
        <img class="ignore" src="../../static/images/common/all.svg" alt="">
        </div>
        <p>全部</p>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['items']
  }
</script>

<style lang="less" scoped>
  .specialty-section {
    background: #ffffff;
    margin-bottom: 0.27rem;
    padding: 0.7rem 0.35rem;
    display: flex;
    justify-content: space-between;
    .wrap-item {
      text-align: center;
      .imgitem {
        padding: 0.25rem;
        width: 1.3rem;
        height:1.3rem;
        .ignore{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      p{
        font-size: 0.37rem;
        color: #333333;
        letter-spacing: 0.004rem;
        line-height: 0.53rem;
        text-align: center;
        margin-top:0.3rem;
      }
    }
  }
</style>
