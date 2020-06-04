<template>
  <page>
    <cube-form>
      <div class="score">
          <div class="title">酒店评分</div>
          <div>
            <cube-rate v-model="model.score"></cube-rate>
          </div>
      </div>
      <div class="describe">
        <cube-textarea
            v-model="model.content"
            :placeholder="placeholder"
            :maxlength="maxlength"
            :autofocus="autofocus"
            ></cube-textarea>
      </div>

      <div class="describe">
        <cube-upload
            :action="action"
            :max=9
            v-model="img"
            :simultaneous-uploads="1" />
      </div>

    </cube-form>
    <template slot="bottom">
      <button type="button" class="botbtn" @click="submitHandler">提交</button>
    </template>
  </page>
</template>
<style scoped>
  .describe {
    margin: 0.3rem;
  }
  .describe >>>textarea{
    font-size: 0.4rem;
  }
</style>
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
    padding: 0.6rem 0.3rem 0.3rem 0.3rem;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 0.5rem;
    }
  }
</style>
<script type="text/ecmascript-6">
  import Cookies from 'js-cookie'
  import {API_BASE_URL, TOKEN_KEY} from '@/config/app'
  export default {
    data() {
      return {
        placeholder: '300字以内',
        maxlength: 300,
        autofocus: false,
        images: [],
        img:[],
        model: {
          images: '',
          score: 5,
          content: '',
          orderId: this.$route.query.id
        }
      }
    },
    computed: {
      action(){
        return {
        target: process.env.API_HOST + this.api.imageUpload,
        headers: {"X-Nideshop-Token":localStorage.getItem('token')}
        }
      }
    },
    methods: {
      submitHandler() {
        this.images=[]
        this.model.images=[]
        for (let index = 0; index < this.img.length; index++) {
          const element = this.img[index];
          this.images.push(element.response.data.path)
          this.model.images=this.images.join(',');
        }
          console.log(this.model.images)
          this.postparam = {
            orderId: this.model.orderId,
            score: this.model.score,
            content: this.model.content,
            images: this.model.images
          }
          this.request(this.api.HotelOrderEvaluate, this.postparam).then(res => {
            if (res.code == 200) {
              this.$go('/order')
            } else {
              this.$toast(res.message, 'error');
            }
          })
      }
    },
  }
</script>
