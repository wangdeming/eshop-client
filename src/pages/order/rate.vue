<template>
  <page>
    <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">

      <div class="good" v-for="(item,index) in resdata">
        <goods-cell :goods="item"></goods-cell>
        <cube-form-item :field="fields[index+2][0]"></cube-form-item>
        <cube-form-item :field="fields[index+2][1]"></cube-form-item>
        <cube-form-item :field="fields[index+2][2]" ref="up"></cube-form-item>
      </div>
      <div class="score">
        <div class="title">服务打分</div>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
      </div>

    </cube-form>
    <template slot="bottom">
      <button type="button" class="botbtn" @click="submitHandler">提交</button>
    </template>
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
  }

  .score {
    margin-top: 0.3rem;
    background: #ffffff;
    .title {
      padding: 0.3rem;
      font-size: 0.5rem;
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
        validity: {},
        valid: undefined,
        model: {},
        fields: [],
      }
    },
    components: {
      GoodsCell
    },
    mounted() {
      this.fields = [{
        type: 'rate',
        modelKey: 'serviceScore',
        label: '商家服务',
      },
        {
          type: 'rate',
          modelKey: 'expressScore',
          label: '商家物流',
        }];
      this.request(this.api.listOrderGoods4Eval, {orderId: this.orderId}).then(res => {
        this.resdata = res.data
        let _this = this;
        let modelkeys = {};
        res.data.forEach(function (item, index) {
          modelkeys["orderGoodsId" + index] = item.orderGoodsId
          modelkeys["goodsScore" + index] = 5
          modelkeys["content" + index] = ""
          modelkeys["imgList" + index] = []
          let profields = [
            {
              type: 'rate',
              modelKey: 'goodsScore' + index,
              label: '评分',
            },
            {
              type: 'textarea',
              modelKey: 'content' + index,
              props: {
                placeholder: "点评一下商品吧"
              },
              debounce: 200
            },
            {
              type: 'upload',
              modelKey: 'imgList' + index,
              label: '',
              events: {
                'file-removed': (...args) => {
//                console.log('file removed', args)
                },
                'file-success': (...args) => {
                    if(args[0].response.code!=200){
                      _this.$toast(args[0].response.message,'error')
                      console.info(_this.$refs.up[0].$refs.upload)
                      _this.$refs.up[0].$refs.upload.removeFile(args[0])
                    }
                },
                'file-error': (...args) => {
                  console.log('file error', args)
                },
              },
              props: {
                action: {
                  target: process.env.API_HOST + _this.api.imageUpload,
                  headers: {"X-Nideshop-Token": localStorage.getItem('token')},
                },
                ref:'upload',
                max:5
              },
//               rules: {
//                 uploaded: (val, config) => {
//                   return Promise.all(val.map((file, i) => {
//                     return new Promise((resolve, reject) => {
//                       return resolve()
//                     })
//                   })).then(() => {
//                     return true
//                   })
//                 }
//               },
//               messages: {
//                 uploaded: '上传失败'
//               }
            }
          ];
          _this.fields.push(profields);
        })
        _this.model = modelkeys
        _this.model.serviceScore = 5
        _this.model.expressScore = 5
      })
    },
    methods: {
      submitHandler(e) {
        e.preventDefault();
        let modeldata = this.model
        let postdata = {
          orderId: this.orderId,
          serviceScore: this.model.serviceScore,
          expressScore: this.model.expressScore,
          evalOrderGoodsJsonStr: [],
        }
        let orderGoods = []

        for (var r = 0; r < this.resdata.length; r++) {
          for (let i in modeldata) {
            let iindex = i.substr(-1);
            if (iindex == r) {
              var item = {
                orderGoodsId: modeldata["orderGoodsId" + r],
                goodsScore: modeldata["goodsScore" + r],
                content: modeldata["content" + r],
                imgList: modeldata["imgList" + r]
              }
            }
          }
          orderGoods.push(item);
        }
        for (let i in orderGoods) {
          if (orderGoods[i].imgList.length > 0) {
            let imgs = []
            for (let j in orderGoods[i].imgList) {
              if (orderGoods[i].imgList[j].response.code == 200) {
                imgs.push(orderGoods[i].imgList[j].response.data.path)
              }
            }
            orderGoods[i].imgList = imgs
          }
        }
        postdata.evalOrderGoodsJsonStr = JSON.stringify(orderGoods)
        this.request(this.api.Evaluate, postdata).then(res => {
          if (res.code == 200) {
            this.$go('/order')
          } else {
            this.$toast(res.message, 'error');
          }
        })
      },
      validateHandler(result) {
        this.validity = result.validity;
        this.valid = result.valid;
      },
    },
  }
</script>
