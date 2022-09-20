<template>
  <div class="page-about">
    <div class="page-intro">
      <img :src="`${server_url}/images/about-us-page.jpg`" alt="">
    </div>
    <div class="container">
      <AboutUs/>
    </div>
  </div>
</template>
<script>
import AboutUs from "@/front/AboutUs";

export default {
  components: {AboutUs},
  layout: 'default',
  computed: {
    server_url() {
      return this.$store.state.server_url;
    }
  }
}
</script>
<style lang="scss">
</style>
