<template lang="pug">
  .home-intro
    nuxt-img(:src="`/images/home-intro.jpg`" sizes="sm:600px md:50vw lg:1920px" provider="static" alt="")
    .container
      .home-intro__content
        h5.home-intro__label {{ homeIntro.subtitle }}
        h2.home-intro__title(v-html="homeIntro.title")
        .home-intro__text {{ homeIntro.text }}
</template>

<script>
import { homeIntro } from "../../data-static/home-intro";

export default {
  computed: {
    homeIntro() {
      return this.$i18n.locale === 'it' ? homeIntro.it : homeIntro.en;
    }
  },
  mounted() {
    // console.log(this.homeIntro, 'this.homeIntro')
  }
}
</script>

<style lang="scss" scoped>
.home-intro {
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
  .container {
    position: relative;
    z-index: 2;
  }
  &__content {
    padding-top: 15.7rem;
    padding-bottom: 17.8rem;
  }
  &__label {
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    color: #5eceff;
  }
  &__title {
    margin-bottom: 2.5rem;
    max-width: 78rem;
    font-size: 6.5rem;
    font-weight: 800;
    line-height: 1;
    color: white;
    @media screen and (max-width: 768px) {
      font-size: 4.5rem;
    }
  }
  &__text {
    max-width: 65rem;
    font-size: 1.8rem;
    line-height: 1.6;
    letter-spacing: 0.04rem;
    color: white;
  }
}
</style>
