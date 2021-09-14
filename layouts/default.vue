<template>
  <div>
    <Navigation/>
    <div class="main">
      <Nuxt/>
    </div>
    <Footer/>
    <transition name="fade" mode="out-in">
      <Popup v-if="popup"/>
    </transition>
    <transition name="fade" mode="out-in">
      <HeaderPopup v-if="headerPopup"/>
    </transition>
  </div>
</template>
<script>

import Navigation from "../components/Nav/Navigation";
import Footer from "../components/Nav/Footer";
import Popup from "../components/Popup";
import HeaderPopup from "../components/HeaderPopup";

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
  components: { HeaderPopup, Footer, Navigation, Popup },
  computed: {
    getOutsourcingSolutions() {
      return this.$store.getters['solutions/getOutsourcingSolutions'];
    },
    getWebSolutions() {
      return this.$store.getters['solutions/getWebSolutions'];
    },
    currentMegaMenu() {
      return this.$store.getters["mega-menu/megaMenu"];
    },
    popup() {
      return this.$store.getters["popup/popup"];
    },
    headerPopup() {
      return this.$store.getters["popup/headerPopup"];
    }
  },
  watch: {
    currentMegaMenu(value) {
      switch (value) {
        case 'web':
          this.currentMenu = this.getWebSolutions;
          break;
        case 'outsourcing':
          this.currentMenu = this.getOutsourcingSolutions;
          break;
        case '':
          this.currentMenu = [];
          break;
      }
    }
  },
  mounted() {
    if (process.client) {
      let div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      document.body.append(div);
      let scrollWidth = div.offsetWidth - div.clientWidth;
      div.remove();
      // console.log(scrollWidth, 'scrollWidth')
      if (!this.$store.getters["helpers/scrollBarWidth"]) {
        this.$store.dispatch('helpers/setScrollBarWidth', scrollWidth);
      }
    }
  }
}
</script>
<style lang="scss">
.main {
  position: relative;
  z-index: 2;
}
</style>
