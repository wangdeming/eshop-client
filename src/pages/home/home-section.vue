<template>
  <div class="home-section">
      <ul class="section-wrap">
          <li class="wrap-item"   @click="$go('/goods-by-category')">
            <svg class="icon" ><use xlink:href="#icon-tickets"></use></svg>
            <p>景区门票</p>
          </li>
        <li class="wrap-item"   @click="$go('/specialty')">
          <svg class="icon" ><use xlink:href="#icon-store"></use></svg>
          <p>特产商城</p>
        </li>
        <li class="wrap-item"   @click="$go('/hotel')">
          <svg class="icon" ><use xlink:href="#icon-hotel"></use></svg>
          <p>酒店住宿</p>
        </li>
        <li class="wrap-item"   @click="$go('/goods-by-category')">
          <svg class="icon" ><use xlink:href="#icon-diet"></use></svg>
          <p>饮食</p>
        </li>
      </ul>
  </div>
</template>
<style lang="less" scoped>
  .home-section {
    background: #ffffff;
    margin-bottom:0.27rem;
    padding:0.3rem 0 0.54rem;
    float: left;
    width: 100%;
    .section-wrap {
      display: block;
      .wrap-item{
        display: block;
        width: 25%;
        font-size: 0.37rem;
        line-height: 0.4rem;
        float: left;
        text-align: center;
        .icon{
          padding: 0.4rem;
          width: 1.28rem;
          height: 1.28rem;
        }
      }
    }
  }
</style>
