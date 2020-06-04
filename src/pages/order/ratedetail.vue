<template>
  <page>
      <div class="good" v-for="(item,index) in resdata.evalGoodsList">
        <goods-cell :goods="item"></goods-cell>
        <!--{{item.goodsScore}}-->
        <!--{{item.content}}-->
        <div class="middle_score">
          <div class="middle_top">
            <h3 class="middle_top_left">评分</h3>
            <cube-rate v-model="item.goodsScore" :disabled="true" class="middle_top_right"></cube-rate>
            <div class="middle_content">
              <p>{{item.content}}</p>
              <img v-for="(img,i) in item.imgs" :src="img"  class="img_change">
            </div>
          </div>
        </div>
      </div>

      <div class="score">
        <div class="title">服务打分</div>
        <div class="bottom">
            <span>商家服务</span>
            <cube-rate v-model="resdata.serviceScore"  :disabled="true" class="bottom_right"></cube-rate>
        </div>
        <div class="bottom">
          <span>商家物流</span>
          <cube-rate v-model="resdata.expressScore" :disabled="true" class="bottom_right"></cube-rate>
        </div>
      </div>
  </page>
</template>
<style lang="less" scoped>
  .cube-form {
    background: none;
  }

  .rate {
    padding: 0.3rem;
  }

  .botbtn {
    background: #C9AB5D;
    width: 100%;
    font-size: 0.42rem;
    color: #fff;
    border: none;
    height: 1.2rem;
  }
  .good {
    background: #ffffff;
    position:relative;
    }
    h3.middle_top_left{
      display:inline-block;
      color:#333;
      font-size:0.55rem;
    }
    .middle_score{
      position:relative;
      margin-top:0.5rem;
      padding:0.35rem;
      .middle_content{
        margin-top:0.4rem;
        p{
          font-size:0.3rem;
          padding:0.3rem 0;
          color:#000;
        }
      }
      .middle_top_right{
        width:2.5rem;
        height:0.4rem;
        position:absolute;
        right:0.4rem;
        top:0.3rem;
    }
    .img_change{
      display:inline-block;
      width:2rem;
      height:2rem;
      margin-left:0.4rem;

    }
  }
  .score {
    background: #ffffff;
    .title {
      padding: 0.3rem;
      font-size: 0.5rem;
      border-top: 0.1rem solid #ccc;
      border-bottom: 0.04rem solid #ccc;
    }
  }
  .bottom{
    position:relative;
    margin-top: 0.3rem;
    padding: 0.25rem;
    font-size: 0.55rem;
    .bottom_right{
      position:absolute;
      right:0.4rem;
      top:0.3rem;
      width:2.5rem;
      height:0.4rem;
    }
  }
</style>
<script type="text/ecmascript-6">
  import GoodsCell from './common/goods-cell'
  import Cookies from 'js-cookie'
  import {API_BASE_URL, TOKEN_KEY} from '@/config/app'
  export default {
    data() {
      return {
        orderId: this.$route.query.id,
        resdata: null,
      }
    },
    components: {
      GoodsCell
    },
    mounted() {
       this.request(this.api.DetailEvaluate, {orderId: this.orderId}).then(res => {
        this.resdata = res.data
       })
    },
  }
</script>
