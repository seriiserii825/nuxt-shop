<template lang="pug">
  .mega-menu( @mouseleave.prevent="closeMegaMenu")
    .container
      ul( class="mega-menu__list")
        li(v-for="item in menu" :key="item.id")
          nuxt-link(:to="localePath(`/soluzioni/${$i18n.locale === 'it' ? item.slug_it : item.slug_en}`)" @click.native="closeMegaMenu")
            .mega-menu__img
              img(:src="`/uploads/${item.image_menu}`" alt="item.title.rendered")
            h3.mega-menu__title {{ item.title_it }}
</template>

<script>
export default {
  props: {
    menu: {
      type: Array
    }
  },
  methods: {
    closeMegaMenu() {
      this.$store.dispatch('mega-menu/setMegaMenu', '');
    }
  },
  mounted() {
    // console.log(this.menu, 'this.menu')
  }
}
</script>

<style lang="scss">
@import "assets/scss/partials/variables";
.mega-menu {
  position: absolute;
  top: 13rem;
  left: 0;
  padding: 6.5rem 0 6.3rem;
  width: 100%;
  min-height: 8rem;
  background: linear-gradient($accent, $accent-dark);
  border: 1px solid #EDF2F3;
  z-index: 3;
  @media screen and (max-width: 1600px) {
    top: 7rem;
    padding: 3rem 0;
  }
  &__list {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 992px) {
      flex-wrap: wrap;
    }
  }
  li {
    width: 15%;
    @media screen and (max-width: 992px) {
      margin-bottom: 4rem;
      width: 30%;
    }
    @media screen and (max-width: 576px) {
      width: 48%;
    }
  }
  a {
    display: block;
    transition: all .4s;
  }
  &__img {
    position: relative;
    margin-bottom: 3rem;
    height: 20.4rem;
    overflow: hidden;
    @media screen and (max-width: 360px) {
      height: 16rem;
    }
    &:hover {
      img {
        transform: scale(1.3);
      }
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all .8s;
    }
  }
  &__title {
    font-size: 2rem;
    font-weight: bold;
    color: #f7f7f7;
  }
}
</style>
