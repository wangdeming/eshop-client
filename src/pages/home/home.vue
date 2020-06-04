<template>
  <page :better-scroll="true" :header-immerse="true">
    <home-header slot="top"></home-header>
    <home-banner :list="recommend"></home-banner>
    <home-section ></home-section>
    <home-direct-supply :list="recommend"></home-direct-supply>
  </page>
</template>
<script type="text/ecmascript-6">
import homeHeader from './home-header'
import homeBanner from './home-banner'
import homeDirectSupply from './home-direct-supply'
import homeSection from './home-section'
export default {
  data(){
    return {
      recommend:[]
    }
  },
  components: {
    homeHeader,
    homeBanner,
    homeDirectSupply,
    homeSection,
  },
  methods: {

  },
  created () {
    this.request(this.api.adManager,{adPosition:'recommendShopAd'}).then(res => {
      if (res.code === 200) {
        this.recommend = res.data
      }
    })
  },

}
</script>
