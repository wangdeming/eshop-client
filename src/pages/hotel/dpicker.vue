<template>
  <div>
    <div style="display: none">
      <date-picker ref="dp" v-model="pickervalue"  confirm range appendToBody :notBefore="nowdate" confirm-text="关闭" ></date-picker>
    </div>
    <div class="top-date"  @click="showpicker" v-if="type==2">
      住<span>{{fromdate}}</span><br>
      离<span>{{todate}}</span>
    </div>
    <div class="datepick" @click="showpicker" v-if="type==1">
      <div class="comein"><p>入住</p><p>{{fromdate}}<span class="week">周{{fromweek}}</span></p></div>
      <div class="datecount"><p>共{{daycount}}晚</p></div>
      <div class="leave"><p>离店</p><p>{{todate}}<span class="week">周{{toweek}}</span></p></div>
    </div>
    <div class="datepick3" @click="showpicker" v-if="type==3">
      <div class="comein"><span>入住</span><span>{{fromdate}}</span><span class="week">周{{fromweek}}</span></div>
      <div class="datecount"><span>共{{daycount}}晚</span></div>
      <div class="leave"><span>离店</span><span>{{todate}}</span><span class="week">周{{toweek}}</span></div>
    </div>
    <div class="times" v-if="type==4">
      {{fromdate}}（周{{fromweek}}）- {{todate}}（周{{toweek}}）&nbsp;&nbsp;共{{daycount}}晚
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import '../../static/less/index';
  .top-date {
    margin: 0 0.2rem;
    padding: 0.1rem;
    line-height: 0.4rem;
    background: #F8F8F8;
    color: #333333;
    font-size: 0.32rem;
    span {
      padding-left: 0.1rem;
    }
  }
  .datepick{
    display: flex;
    font-size: 0.4rem;
    justify-content: space-between;
    line-height: 0.5rem;
    text-align: center;
    color: #333;
    position: relative;
    border-bottom: 0.017rem solid #ccc;
    .datecount{
      position: absolute;
      border:0.017rem solid #ccc;
      padding: 0 0.15rem;
      border-radius: 0.3rem;
      top: 30%;
      left: 42%;
      z-index: 999;
      background: #fff;
    }
    .week{
      color: #999999;
      padding-left: 0.3rem;
    }
    .comein{
      padding: 0.3rem 0;
      width: 50%;
      padding-right: 0.8rem;
    }
    .leave{
      width: 50%;
      padding: 0.3rem 0;
      padding-left: 0.8rem;
      border-left:0.017rem solid #ccc;
    }
  }
  .datepick3 {
    display: flex;
    padding: 0 0.6rem;
    justify-content: space-between;
    line-height: 1.2rem;
    border-bottom: 0.015rem solid #ccc;
    span {
      padding-right: 0.2rem;
      &:last-child {
        padding-right: 0;
      }
    }
    .datecount {
      text-align: center;
      span {
        border: 0.017rem solid #ccc;
        padding: 0 0.2rem;
        border-radius: 0.3rem;
        padding: 0 0.15rem;
      }
    }
    .week {
      color: #999;
    }
  }
  .times{
    font-size: 0.4rem;
    line-height: 1rem;
  }
</style>
<script type="text/ecmascript-6">
  import DatePicker from 'vue2-datepicker'
  export default {
    props: ['type'],
    components: {DatePicker},
    data() {
      return {
        pickervalue: '',
        fromdate:'',
        fromweek:'',
        todate:'',
        toweek:'',
        daycount:'',
        nowdate:new Date()
      }
    },
    watch: {
      pickervalue: function() {
        let fdate=new Date(this.pickervalue[0])
        let tdate=new Date(this.pickervalue[1])
        let temp=new Date(this.datefmt(tdate,'Y-M-d'))  -  new Date(this.datefmt(fdate,'Y-M-d'))
        this.daycount  =  parseInt(Math.abs(temp)  /  1000  /  60  /  60  /24)
        if(this.daycount<1){
          this.$toast('请至少选择入住天数1天')
        }
        if(this.type==2){
          this.fromdate=this.datefmt(fdate,'M-d')
          this.todate=this.datefmt(tdate,'M-d')
        }else{
          this.fromdate=this.datefmt(fdate,'M月d日')
          this.todate=this.datefmt(tdate,'M月d日')
        }
        let weekstr=['日','一','二','三','四','五','六']
        sessionStorage.setItem('checkInDate',this.datefmt(fdate,'Y-M-d'))
        sessionStorage.setItem('checkOutDate',this.datefmt(tdate,'Y-M-d'))
        this.fromweek=weekstr[fdate.getDay()]
        this.toweek=weekstr[tdate.getDay()]
        this.$emit('getlist')
      },
    },
    methods: {
        showpicker(){
          this.$refs.dp.handleFocus()
        },
       datefmt(dateobj,fmt){
        var o = {
          "M+" : dateobj.getMonth()+1>9?dateobj.getMonth()+1:"0"+(dateobj.getMonth()+1),                 //月份
          "d+" :dateobj.getDate()>9?dateobj.getDate():"0"+dateobj.getDate(),                    //日
          "h+" : dateobj.getHours(),                   //小时
          "m+" : dateobj.getMinutes(),                 //分
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
    },
    mounted(){
        if(sessionStorage.getItem('checkInDate')){
          this.pickervalue=[sessionStorage.getItem('checkInDate'),sessionStorage.getItem('checkOutDate')]
        }else{
          var day1 = new Date();
          day1.setDate(day1.getDate() +1);
          this.pickervalue=[new Date(),day1]
        }

    }
  }
</script>
