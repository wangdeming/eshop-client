<template>
  <div class="page-header">
    <div class="header-left" @click="$back">
      <svg class="icon" ><use xlink:href="#icon-back"></use></svg>
    </div>
    <h3>{{$route.meta.title}}</h3>
  </div>
</template>

<style lang="less" scoped>
  .page-header{
    position: relative;
    display: none;
    align-items: center;
    justify-content: center;
    height: 88px;
    background: white;
    .header-left{
      position: absolute;
      top:50%;
      left:30px;
      transform: translateY(-50%);
    }
    h3{
      font-size: 30px;
      font-weight: 600;
      color:#333;
    }
  }
</style>
