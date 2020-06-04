<template>
  <page :better-scroll="true" page-background="white">
    <div class="tab">
      <cube-tab-bar v-model="selectedLabel" show-slider>
        <cube-tab v-for="(item, index) in tabs"  :label="item.label" :key="item.label"></cube-tab>
      </cube-tab-bar>
    </div>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="item.label">
        <div class="goodspanel">
          <goods-cell v-for="(goods, index) in item.tdata.parcelGoods" :goods="goods" :key="goods.goodsName"></goods-cell>
        </div>
        <div class="logistics">
          <div class="title">
            <div class="logistics_logo">
              <p>
                <svg class="icon licon">
                  <use xlink:href="#icon-logistics"></use>
                </svg>
                <span class="ignore_left">{{item.tdata.expressCompany}}</span>
              </p>
              <p>
                <svg class="icon licon cotybtn" :data-clipboard-text="item.tdata.expressNo" @click="copyToClipBoard">
                  <use xlink:href="#icon-fuzhi"></use>
                </svg>
                <span class="ignore_right_1">{{item.tdata.expressNo}}</span>
              </p>

            </div>
          </div>
          <div class="message">
            <nonepage text="暂无物流消息" v-if="!item.tdata.tracesInfo  && isgetdata" icon="#icon-logistics1"></nonepage>
            <ul class="time-vertical" v-else>
              <li v-for="(deliv,index) in item.tdata.tracesInfo">
                <span class="time">
                  <span v-html="datefmt(deliv.acceptTime,'M-d')"></span>
                  <span v-html="datefmt(deliv.acceptTime,'h:m')"></span>
                </span>
                <b></b>
                <span class="desc"><span v-if="index==0">{{item.tdata.expressStatusName}}</span>
                  <span class="desc_text">{{deliv.acceptStation}}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </cube-tab-panel>
    </cube-tab-panels>
  </page>
</template>
<style lang="less" scoped>
  .tab {
    background: #ffffff;
    padding: 0.3rem;
    border-bottom: 1px solid #ccc;
    .cube-tab{
      color: #999;
    }
    .cube-tab_active{
      color:#333;
      font-size:0.425rem;
    }

    .cube-tab-bar-slider{
      background:none;
    }
  }
  img.ignore{
    width: 0.6rem;
    height: 0.6rem;
    margin-left: 0.375rem;
  }
  img.ignore_img{
    display: flex;
    position: absolute;
    top: 3.3rem;
    left: 6.1rem;
    width: 0.3rem;
    height: 0.3rem;
    margin-left: 0.775rem;
  }
  .ignore_left{
    color:#333333;
  }
  .ignore_right_1{
    color:#666666;
  }
  .goodspanel{
    padding: 0.3rem 0;
  }
  .logistics {
    background: #ffffff;
    border-top: 0.3rem solid #f8f8f8;
    .title {
      padding: 0.4rem 0.3rem;
      border-bottom: 1px solid #cccccc;
    }
    .logistics_logo{
      display: flex;
      justify-content: space-between;
    }
    .message {
      padding: 0.5rem;
      .time-vertical {
        position: relative;
        list-style-type: none;
        padding: 0px;
      }
      .time-vertical li {
        border-left: 1px solid #cccccc;
        min-height: 100px;
        margin-left: 2rem;
        position: relative;
        line-height: 0.5rem;
        min-height: 2.2rem;
        .time{
          position: absolute;
          left: -1.5rem;
          width: 1.0rem;
          word-break: break-all;
          color:#666666;
          font-size:0.325rem;
        }
        .desc {
          display: inline-block;
          margin-left: 0.3rem;
          word-break: break-all;
          font-size: 0.375rem;
          color: #999999;
          .desc_text {
            display: block;
            text-align: left;
            color: #999999;
            font-size: 0.325rem;
          }
        }
        b {
          position: absolute;
          left: -15px;
          width: 0.35rem;
          height: 0.35rem;
          border: 2px solid #cccccc;
          border-radius: 0.35rem;
          background: #cccccc;
        }
        b:after{
          content:'';
          position:absolute;
          top:0.035rem;
          left:0.048rem;
          width:15px;
          height:10px;
          border:4px solid #fff;
          border-radius:1px;
          border-top:none;
          border-right:none;
          background:transparent;
          transform:rotate(-45deg);
        }
        &:first-child b{
          border: 2px solid #C9AB5D;
          background:#C9AB5D;
        }
        &:last-child{
          border-left: none;
        }
        &:first-child b:after{
          display:inline-block;
          margin-top:0.03rem;
        }
        &:last-child b:after{
          display:inline-block;
          margin-top:0.03rem;
        }

      }
    }
  }

</style>
<script type="text/ecmascript-6">
  import GoodsCell from './common/goods-cell'
  import nonepage from '../common/nonepage'
  import Clipboard from 'clipboard';
  export default {
    data() {
      return {
        orderId: this.$route.query.id,
        clipboard:'',
        selectedLabel: '包裹1',
        isgetdata:false,
        tabs: [{
          label: '',
          tdata: {}
        }]
      }
    },
    components: {
      GoodsCell,
      nonepage
    },
    methods:{
      datefmt(dateobj,fmt){
        var dateobj=new Date(dateobj)
        var o = {
          "M+" : dateobj.getMonth()+1>9?dateobj.getMonth()+1:"0"+(dateobj.getMonth()+1),                 //月份
          "d+" :dateobj.getDate()>9?dateobj.getDate():"0"+dateobj.getDate(),                    //日
          "h+" : dateobj.getHours()>9? dateobj.getHours():'0'+ dateobj.getHours(),                   //小时
          "m+" : dateobj.getMinutes()>9? dateobj.getMinutes():'0'+ dateobj.getMinutes(),                 //分
          "Y+" : dateobj.getFullYear(),
          "s+" : dateobj.getSeconds(),                 //秒
          "q+" : Math.floor((dateobj.getMonth()+3)/3), //季度
          "S"  : dateobj.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
          fmt=fmt.replace(RegExp.$1, (dateobj.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
          if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
      },
     copyToClipBoard(){
       var clipboard = new Clipboard('.cotybtn')
       clipboard.on('success', e => {
         this.$toast('内容已复制')
         clipboard.destroy()
       })
       clipboard.on('error', e => {
         console.log('该浏览器不支持自动复制')
         clipboard.destroy()
       })
     }
    },
    created() {
       this.request(this.api.OrderLogistics, {orderId: this.orderId}).then(res => {
           this.isgetdata=true
        this.tabs = res.data.map((item, key) => {
          let arr = {
            label: "包裹" + (key + 1),
            tdata: item,
          }
          return arr;
        })
       })
    },
  }
</script>
