<template>
  <div>
    <Navigation/>
    <div class="main">
      <Nuxt/>
    </div>
  </div>
</template>
<script>

import Navigation from "../components/Nav/Navigation";

export default {
  data() {
    return {
      currentMenu: []
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: this.popup ? 'fixed' : ''
      },
      // Установка rel="canonical" на всех страницах шаблона.
      link: [{ rel: "canonical", href: `${process.env.baseUrl}${this.$route.path}` }],
      // Пример установки общих мета-тегов на страницах.
      meta: [{ hid: "og:url", property: "og:url", content: `${process.env.baseUrl}${this.$route.path}` }],
    }
  },
  components: { Navigation },
  computed: {}
}
</script>
<style lang="scss">
.main {
  position: relative;
  z-index: 2;
}
</style>
