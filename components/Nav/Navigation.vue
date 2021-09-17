<template lang="pug">
  .navigation
    .navigation__wrap
      .navigation__logo
        nuxt-link(to="/") Proshop
      .navigation__menu(:class="{'active': menuMobileActive}")
        AppMenu(@close-menu="closeMenu")
      .navigation__sandwitch
        Sandwitch(@click.native="toggleSandwich" :active="sandwichActive")
      .navigation__right
        n-link(to="/cart").navigation__cart
          span.el-icon-shopping-cart-2
          span.navigation__qty
            pre {{ qty }}
        n-link(to="/admin").navigation__login
          Login
</template>

<script>
import AppMenu from "./AppMenu";
import Login from "./Login";
import Sandwitch from "./Sandwitch";

export default {
  data() {
    return {
      sandwichActive: false,
      menuMobileActive: false
    };
  },
  computed: {
    qty() {
      console.log(
        this.$store.getters["cartLocalStorage"],
        'this.$store.getters["cartLocalStorage"]'
      );
      const cart = this.$store.getters["cart"]
        ? this.$store.getters["cart"]
        : this.$store.getters["cartLocalStorage"];
      console.log(cart, "cart");
      return cart ? cart.qty : null;
    }
  },
  methods: {
    getQty(items) {
      return items.reduce((sum, current) => {
        return sum + current.qty;
      }, 0);
    },
    toggleSandwich() {
      this.sandwichActive = !this.sandwichActive;
      this.menuMobileActive = !this.menuMobileActive;
    },
    closeMenu() {
      this.sandwichActive = false;
      this.menuMobileActive = false;
    }
  },
  components: {
    Sandwitch,
    Login,
    AppMenu
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/partials/variables.scss";
@import "@/assets/scss/blocks/navigation.scss";
</style>
