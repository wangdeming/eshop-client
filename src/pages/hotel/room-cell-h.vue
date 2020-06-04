<template>
  <div>
    <div class="list-item"
         :key="key"
         v-for="(info, key) in list" v-if="key<4 || (key>=4 && isseemore)">
      <div class="goods-by-category-list-goods">
        <div class="goods-pic" @click="showimg(info.id)">
          <img class="ignore" :src="info.mainImg">
        </div>
        <div class="goods-r">
          <div class="goods-name" @click="updateGoodsSpec(false,info.id)">
            <h4>{{info.name}}</h4>
            <p>
              <span class="label">{{info.area}}㎡</span>
              <span class="label">{{info.breakfastName}}</span>
              <span class="label">{{info.windowName}}</span>
              <span class="label">{{info.canCancelName}}</span>
            </p>
          </div>
          <div class="goods-act">
            <div class="goods-left" @click="updateGoodsSpec(false,info.id)">
              <span class="price">￥{{info.price}}</span>
            </div>
            <span @click="updateGoodsSpec(true,info.id)" class="act preorder" v-if="info.canOrder">预订</span>
            <span class="act nostock" v-else>售罄</span>
          </div>
        </div>
      </div>
    </div>
    <room-panel ref="room" :roomId="roomId"></room-panel>
    <nonepage text="未搜索到相关内容" v-if="list.length<1" icon="#icon-search1"></nonepage>
    <div class="more" @click="seemore" v-if="!isseemore && list.length>3">
      查看更多房型
      <svg class="icon" style="width: 0.35rem">
        <use xlink:href="#icon-my_icon_more-copy"></use>
      </svg>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import roomPanel from './room-panel.vue'
  import nonepage from '../common/nonepage'
  export default {
    components: {
      roomPanel,
      nonepage,
    },
    data() {
      return {
        isseemore:false,
        roomId:0
      }
    },
    props: ['list', 'canbuy', 'hotelId'],
    methods: {
      seemore(){
        this.isseemore=!this.isseemore;
      },
      showimg(roomId){
        this.request(this.api.Hoteltroom, {
          hotelId: this.hotelId,
          roomId: roomId,
          checkInDate: sessionStorage.getItem('checkInDate'),
          checkOutDate: sessionStorage.getItem('checkOutDate')
        }).then(res => {
          let imgs=res.data.roomImgList.map((item, key) => {
                return item.img
          })
          this.$createImagePreview({
            imgs: imgs
          }).show()
        })
      },
      updateGoodsSpec (togo,roomId) {
          if (togo) {
            this.request(this.api.Hoteltroom, {
              hotelId: this.hotelId,
              roomId: roomId,
              checkInDate: sessionStorage.getItem('checkInDate'),
              checkOutDate: sessionStorage.getItem('checkOutDate')
            }).then(res => {
              if (res.code == 200) {
                sessionStorage.setItem("detailGoods", JSON.stringify(res.data));
                this.$go('/hotel/checkout')
              }else{
                this.$toast(res.message)
              }
            });
          } else {
            this.$refs.room.showpop=true
            this.roomId=roomId
          }
      }
    }
  }
</script>

<style lang="less" scoped>
  .more {
    text-align: center;
    color: #999;
  }
  .goods-by-category-list-goods {
    display: flex;
    margin-bottom: 0.53rem;
    .goods-pic {
      justify-content: center;
      width: 5.5rem;
      height: 2.1rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.15rem;
      }
    }
    .goods-r {
      padding-top: 0.1rem;
      padding-left: 0.3rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      .goods-name {
        width: 100%;
        height: 1rem;
        h4 {
          white-space: pre-wrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.45rem;
          line-height: 0.5rem;
          color: #333;
        }
        p {
          font-size: 0.37rem;
          color: #999999;
          padding-top: 0.2rem;
        }
      }
      .goods-act {
        display: flex;
        justify-content: space-between;
        padding-top: 0.6rem;
        .price {
          color: #DD3C3C;
        }
        .act {
          padding: 0.15rem 0.3rem;
          border-radius: 1rem;
          font-size: 0.35rem;
          margin-top: -0.1rem;
          color: #FFFFFF;
        }
        .score {
          color: #c9ab5d;
        }
        .preorder {
          background: #c9ab5d;
        }
        .nostock {
          background: #999999;
        }

      }

    }

  }
</style>
