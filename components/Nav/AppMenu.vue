<template lang="pug">
  ul.main-menu
    li
      nuxt-link(:to="localePath('/')" @click.native="closeMenu" @mouseenter.native="setMegaMenu('')") {{ $t('pages.home') }}
    li(@click="closeMenu" @mouseenter="setMegaMenu('web')") {{ $t('pages.webAndDigital') }}
    li(@click="closeMenu"  @mouseenter="setMegaMenu('outsourcing')") {{ $t('pages.outsourcing') }}
    li
      nuxt-link(:to="localePath('/chi-siamo')" @click.native="closeMenu" @mouseenter.native="setMegaMenu('')") {{ $t('pages.about') }}
    li
      nuxt-link(:to="localePath('/portfolio')" @click.native="closeMenu" @mouseenter.native="setMegaMenu('')") {{ $t('pages.portfolio') }}
    li
      nuxt-link(:to="localePath('/clienti')" @click.native="closeMenu" @mouseenter.native="setMegaMenu('')") {{ $t('pages.clients') }}
    li
      nuxt-link(:to="localePath('/contatti')" @click.native="closeMenu" @mouseenter.native="setMegaMenu('')") {{ $t('pages.contacts') }}

</template>
<script>
export default {
  props: {
    active: {
      type: Boolean
    }
  },
  methods: {
    closeMenu() {
      this.$emit('close-menu')
    },
    setMegaMenu(value) {
      this.$store.dispatch('mega-menu/setMegaMenu', '');
      setTimeout(() => {
        this.$store.dispatch('mega-menu/setMegaMenu', value);
      }, 100)
    }
  }
}
</script>
<style lang="scss">
@import "assets/scss/partials/variables";
.main-menu {
  display: flex;
  @media screen and (max-width: 1420px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  li,
  a {
    display: block;
    font-size: 1.6rem;
    font-weight: 600;
    color: #015c92;
  }
  li {
    padding: 2.6rem 2.7rem;
    @media screen and (max-width: 1420px) {
      width: 100%;
    }
  }
  a {
    @media screen and (max-width: 1420px) {
      width: 100%;
      border-bottom: 1px solid rgba($accent, .3);
    }
    &.nuxt-link-exact-active {
      color: $accent;
    }
  }
}
</style>
