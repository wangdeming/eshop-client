<template>
  <div class="cart-default">
    <div class="default-center">
      <div class="center-no">
        <img class="ignore" src="../../static/images/trolley.svg" alt="">
        <a @click="$go('/specialty')">去添加点什么吧</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .cart-default{
    position: fixed;
    height: 100%;
		width: 100%;
    .default-center{
      position: absolute;
      top:40%;
      width:100%;
      transform: translateY(-50%);
      .center-no{
        display: flex;
        flex-direction: column;
        align-items: center;
        .ignore{
          width:4rem;
          height: 4rem;
        }
        a{
          font-size: 28px;
          color:blue;
        }
      }
    }
  }
</style>
