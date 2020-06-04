<template>
  <div class="category-content-sub-list">
    <cube-scroll>
      <div class="sub-list-wrap">
        <div class="wrap-list">
          <div class="list-item"
               :key="key"
               @click="selectSubList(subList, item)"
               v-for="(item, key) in subList">
            <div class="item-pic-wrap">
              <div class="item-pic" data-ratio="1:1">
                <img :src="item.iconImg?item.iconImg:'/static/img/pic1@2x.0b2a7fc.jpg'" alt="">
              </div>
            </div>

            <div class="item-name">
              <span>{{item.frontName}}</span>
            </div>
          </div>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  props: ['subList'],
  methods: {
    selectSubList (p, s) {
      this.$emit('selectSubList', {parent: p, sub: s})
    }
  },
}
</script>

<style lang="less" scoped>
  @import '../../static/less/index';
  .category-content-sub-list{
    height: 100%;
    margin-left:2.9rem;
    overflow-y: hidden;
    .sub-list-wrap{
      padding:0.2rem;
      .wrap-banner{
        height: 191px;
        width:100%;
        .ignore{
          width:100%;
          height: 100%;
        }
      }
      .wrap-type{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        span{
          position: relative;
          display: inline-block;
          padding:0 10px;
          color:#666;
          &::before{
            position: absolute;
            content: '';
            top:50%;
            left:-30px;
            transform: translateY(-50%);
            width:30px;
            height: 1px;
            background: #666;
          }
          &::after{
            position: absolute;
            content: '';
            top:50%;
            right:-30px;
            transform: translateY(-50%);
            width:30px;
            height: 1px;
            background: #666;
          }
        }
      }
      .wrap-list{
        display: flex;
        flex-wrap: wrap;
        .list-item{
          /*flex-basis: calc(33.333% - 124px / 3);*/
          width: 33%;
          font-size: 0.32rem;
          color:#333;
          margin-bottom: 0.4rem;
          .item-pic-wrap{
            margin: 0 auto;
            margin-bottom: 0.2rem;
            width: 70%;
            .item-pic{
              position: relative;
              height: 0;
              width: 100%;
              img{
                border-radius:50%;
              }
              &[data-ratio="1:1"] {
                padding-top: calc(100% * 1 / 1);
              }
              *{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
              }
            }
          }

          .item-name{
            display: flex;
            margin-top:10px;
            justify-content: center;
            span{
              text-align:center;
              color:#333;
            }
          }

        }
      }
    }
  }
</style>
