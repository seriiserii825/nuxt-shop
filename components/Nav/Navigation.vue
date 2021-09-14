<template lang="pug">
  .navigation
    .navigation__wrap
      .navigation__logo
        nuxt-link(:to="localePath('/')")
          Logo
      .navigation__menu(:class="{'active': menuMobileActive}")
        AppMenu(@close-menu="closeMenu")
      .navigation__sandwitch
        Sandwitch(@click.native="toggleSandwich" :active="sandwichActive")
      .navigation__right
        .navigation__lang
          Language
        .navigation__login
          Login
</template>

<script>
import Logo from "~/assets/i/svg/logo.svg?inline";
import AppMenu from "./AppMenu";
import Login from "./Login";
import Language from "./Language";
import Sandwitch from "./Sandwitch";

export default {
  data() {
    return {
      sandwichActive: false,
      menuMobileActive: false,
    }
  },
  methods: {
    toggleSandwich() {
      this.sandwichActive = ! this.sandwichActive;
      this.menuMobileActive = ! this.menuMobileActive;
    },
    closeMenu() {
      this.sandwichActive = false;
      this.menuMobileActive = false;
    }
  },
  components: {
    Sandwitch,
    Language,
    Login,
    AppMenu,
    Logo
  },
}
</script>

<style lang="scss" scoped>
@import "assets/scss/partials/variables";
.navigation {
  position: relative;
  background-color: white;
  box-shadow: 0 4px 4px rgba(0,0,0,.1);
  z-index: 4;
  @media screen and (max-width: 1600px) {
    padding-left: 3rem;
  }
  &__wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 1620px;
    height: 13rem;
    @media screen and (max-width: 1600px) {
      height: 7rem;
    }
  }
  &__logo {
    a {
      @media screen and (max-width: 1600px) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
    svg {
      @media screen and (max-width: 1600px) {
        display: inline-block;
        width: 18rem;
      }
      @media screen and (max-width: 576px) {
        width: 12rem;
      }
    }
  }
  &__sandwitch {
    position: absolute;
    top: 30%;
    right: 22rem;
    display: none;
    @media screen and (max-width: 1420px) {
      top: 20%;
      display: block;
    }
    @media screen and (max-width: 1200px) {
      top: 10%;
    }
  }
  &__menu {
    position: relative;
    margin-right: 3rem;
    z-index: 3;
    @media screen and (max-width: 1820px) {
      margin-right: auto;
      margin-left: 4rem;
    }
    @media screen and (max-width: 1420px) {
      position: fixed;
      top: 7rem;
      left: 0;
      margin-left: 0;
      width: 40rem;
      height: 100%;
      background-color: white;
      transform: translateX(-200%);
      opacity: 0;
      pointer-events: none;
      transition: all 0.6s;
      box-shadow: 0 8px 8px rgba(0, 0, 0, .2);
    }
    &.active {
      transform: translateX(0);
      opacity: 1;
      pointer-events: initial;
      z-index: 1000;
    }
  }
  &__right {
    position: absolute;
    top: 0;
    right: 0;
    width: 25.7rem;
    height: 100%;
    overflow: hidden;
    z-index: 2;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 150%;
      height: 150%;
      transform: rotate(-29deg) translateY(4.2rem);
      background-color: $accent;
      z-index: 1;
      @media screen and (max-width: 1600px) {
        transform: rotate(-29deg) translateY(1.2rem);
      }
    }
  }
  &__lang {
    position: absolute;
    top: 42%;
    right: 4.9rem;
    z-index: 2;
    cursor: pointer;
    @media screen and (max-width: 1200px) {
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &__login {
    position: absolute;
    top: 42%;
    right: 0.5rem;
    width: 15px;
    height: 20px;
    z-index: 2;
    @media screen and (max-width: 1200px) {
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>