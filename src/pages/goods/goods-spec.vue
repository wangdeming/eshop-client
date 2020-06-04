<template>
  <div class="goods-spec">
    <goods-cell title="选择：" @click.native="updateGoodsSpec">
      <span class="goods-spec-title">包装 口味</span>
    </goods-cell>
  </div>
</template>

<script type="text/ecmascript-6">
import goodsCell from './common/goods-cell'
import goodsSpecPanel from './goods-spec-panel'
export default {
  components: {
    goodsCell,
    goodsSpecPanel
  },
  methods: {
    updateGoodsSpec () {
      this.$mPopup({
        mask: true
      }, (h) => {
        return h(goodsSpecPanel);
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .goods-spec{
    background: white;
  }
	.goods-spec-title{
		font-size: 30px;
		color: #333333;
	}
</style>
