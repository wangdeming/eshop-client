<template>
  <div class="goods-by-category-list-goods" >
    <div class="goods-pic" @click="$go('/hotel/shop?id='+info.id)" >
      <img class="ignore" :src="info.cover">
    </div>
    <div class="goods-r">
      <div class="goods-name"  @click="$go('/hotel/shop?id='+info.id)">
        <h4>{{info.front_name}}</h4>
        <p>距离灵山景区{{info.distance_lingshan}}</p>
      </div>
      <div class="goods-act" >
        <div class="goods-left"  @click="$go('/hotel/shop?id='+info.id)">
          <span class="score" >{{info.score}}分</span>
        </div>
        <span class="price" >￥{{info.price}}起</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import goodsSpecPanel from '../goods/goods-spec-panel'
  export default {
    components: {
      goodsSpecPanel
    },
    props: ['info'],
  }
</script>

<style lang="less" scoped>
  .goods-by-category-list-goods{
    display: flex;
    margin-bottom: 0.53rem;
    .goods-pic {
      justify-content: center;
      width:5.5rem;
      height:2.1rem;
      position: relative;
      img{
        width: 100%;
        height: 100%;
        border-radius: 0.15rem;
      }
    }
    .goods-r{
      padding-top:0.1rem;
      padding-left: 0.3rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      .goods-name{
        width: 100%;
        height: 1rem;
        h4{
          white-space: pre-wrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.45rem;
          line-height: 0.5rem;
          color:#333;
        }
        p{
          font-size: 0.37rem;
          color: #999999;
          padding-top: 0.2rem;
        }
      }
      .goods-act{
        display: flex;
        justify-content:space-between;
        padding-top: 0.6rem;
        .price{
          color:#DD3C3C;
        }
        .act{
          padding:0.1rem 0.2rem;
          border-radius: 1rem;
          font-size: 0.35rem;
          margin-top: -0.1rem;
          color: #FFFFFF;
        }
        .score{
          color:  #c9ab5d;
        }
        .preorder{
          background: #c9ab5d;
        }
        .nostock{
          background: #999999;
        }

      }

    }

  }
</style>
