<template>
  <div class="m-popup" :class="{'m-popup-mask': mask}">
		<div class="mask" @click="close()"></div>
    <div class="popup-bottom animated fadeInUpBig">
			<span class="close-panel" @click="close()"><svg class="icon" ><use xlink:href="#icon-close"></use></svg></span>
      <render :render="expand"></render>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import render from '../../../common/render'
export default{
  name: 'm-popup',
  props: {
    mask: {
      type: Boolean
    },
    close: {
      type: Function
    },
    expand: {
      type: Function,
      default () {
        return ''
      }
    }
  },
  components: {
    render
  },
  methods: {
    init () {
      this.$children[0].price = sessionStorage.getItem("price");
			this.$children[0].goodsMainImg = sessionStorage.getItem("goodsMainImg");
			this.$children[0].price = sessionStorage.getItem("price");
			this.$children[0].referPrice = sessionStorage.getItem("referPrice");
			this.$children[0].specsList = JSON.parse(sessionStorage.getItem("specsList"));
			this.$children[0].stock = sessionStorage.getItem("stock");
			this.$children[0].num = 1;
			this.$children[0].goodsId = sessionStorage.getItem("goodsId");
			this.$children[0].skuId = null;
			this.$children[0].shopId = sessionStorage.getItem("shopId");
      this.$children[0].skuNumMapData = JSON.parse(sessionStorage.getItem("skuNumMapData"));
      var p = this.$children[0].$el.querySelectorAll(".sectionValue");
      for (var i = 0;i < p.length;i++) {
        p[i].classList.remove("spanHover");
      }
    }
  },
}
</script>

<style lang="less" scoped>
  .m-popup{
    position: fixed;
    top:0;
    bottom:0;
    width:100%;
    z-index: 10;
		.mask{
			width: 100%;
			height: calc(100% - 900px);
			position: absolute;
			top: 0;
			left: 0;
		}
    .popup-bottom{
      position: absolute;
      bottom:0;
      left:0;
      width:100%;
			.close-panel{
				position: absolute;
				display: inline-block;
				top: 0.42rem;
				right: 0.45rem;
				width:0.32rem;
				height: 0.32rem;
				z-index: 10000;
				.icon{
					position: absolute;
					top: 0;
					left: 0;
					display: inline-block;
					width: 100%;
					height: 100%;
				}
			}
    }
    &-mask{
      background: rgba(0,0,0,0.2)
    }
  }
</style>
