<template>
    <page :better-scroll="false">
        <page-header slot="false"></page-header>
        <hotel-detail></hotel-detail>
    </page>
</template>
<script type="text/ecmascript-6">
  import hotelDetail from './hotel-detail.vue'
  export default {
    components: {
      hotelDetail
    }
  }
  </script>