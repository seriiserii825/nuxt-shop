<template>
  <div class="default">
    <div class="main-header">
      <ul class="category-menu" v-if="categories.length">
        <li v-for="item in categories" :key="item.id">
          <span>{{ item.title }}</span>
          <ul class="category-menu__sub" v-if="item.children.length">
            <li v-for="child in item.children" :key="child.id">
              <nuxt-link :to="`/category/${child.id}`">{{
                  child.title
                }}
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
      <div class="cart-icon" @click="openCart">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="18px"
             viewBox="0 0 20 18" version="1.1">
          <g id="surface1">
            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;"
                  d="M 0.832031 0 C 0.371094 0 0 0.375 0 0.84375 C 0 1.3125 0.371094 1.6875 0.832031 1.6875 L 2.640625 1.6875 L 4.734375 12.8125 C 4.8125 13.210938 5.15625 13.5 5.554688 13.5 L 16.945312 13.5 C 17.40625 13.5 17.777344 13.125 17.777344 12.65625 C 17.777344 12.1875 17.40625 11.8125 16.945312 11.8125 L 6.246094 11.8125 L 5.929688 10.125 L 16.9375 10.125 C 17.433594 10.125 17.871094 9.789062 18.007812 9.304688 L 19.882812 2.554688 C 20.078125 1.839844 19.546875 1.125 18.8125 1.125 L 4.234375 1.125 L 4.152344 0.6875 C 4.078125 0.289062 3.734375 0 3.332031 0 Z M 6.109375 18 C 7.03125 18 7.777344 17.242188 7.777344 16.3125 C 7.777344 15.382812 7.03125 14.625 6.109375 14.625 C 5.191406 14.625 4.445312 15.382812 4.445312 16.3125 C 4.445312 17.242188 5.191406 18 6.109375 18 Z M 17.777344 16.3125 C 17.777344 15.382812 17.03125 14.625 16.109375 14.625 C 15.191406 14.625 14.445312 15.382812 14.445312 16.3125 C 14.445312 17.242188 15.191406 18 16.109375 18 C 17.03125 18 17.777344 17.242188 17.777344 16.3125 Z M 17.777344 16.3125 "/>
          </g>
        </svg>
        <span>{{ total_quantity }}</span>
      </div>
      <ul class="default__menu menu-default">
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">About</nuxt-link>
        </li>
        <li v-if="!this.$store.state.user.name">
          <nuxt-link to="/login">Login</nuxt-link>
        </li>
        <li v-if="this.$store.state.role === 'admin'">
          <nuxt-link to="/admin">Admin</nuxt-link>
        </li>
        <li v-if="this.$store.state.role === 'user'">
          <nuxt-link to="/cabinet">Cabinet({{ this.$auth.user.user.email }})</nuxt-link>
        </li>
        <li v-if="!this.$store.state.user.name">
          <nuxt-link to="/register">Register</nuxt-link>
        </li>
        <li v-if="this.$store.state.user.name">
          <a href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </div>
    <Nuxt/>
    <div class="main-footer">
      <div class="container">
        <div class="main-footer__wrap">
          <div class="main-footer__item">
            <h3 class="main-footer__title">Follow Us</h3>
            <ul class="main-footer__social">
              <li>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                  </svg>
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M256,8C119.1,8,8,119.1,8,256S119.1,504,256,504,504,392.9,504,256,392.9,8,256,8ZM185.3,380a124,124,0,0,1,0-248c31.3,0,60.1,11,83,32.3l-33.6,32.6c-13.2-12.9-31.3-19.1-49.4-19.1-42.9,0-77.2,35.5-77.2,78.1S142.3,334,185.3,334c32.6,0,64.9-19.1,70.1-53.3H185.3V238.1H302.2a109.2,109.2,0,0,1,1.9,20.7c0,70.8-47.5,121.2-118.8,121.2ZM415.5,273.8v35.5H380V273.8H344.5V238.3H380V202.8h35.5v35.5h35.2v35.5Z"/>
                  </svg>
                  <span>Google+</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="main-footer__item">
            <h2 class="main-footer__title">Store Information</h2>
            <ul class="main-footer__info">
              <li>
                <i class="icon icon-location"></i>
                <span>Address: 123 Main Street, Anytown, CA 12345 – USA</span>
              </li>
              <li>
                <i class="icon icon-phone"></i>
                <span>Phone: (800) 123 1234</span>
              </li>
              <li>
                <i class="icon icon-email"></i>
                <span>Email: <a href="mailto:some@mail.ru">shop@.mail.com</a></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Cart v-if="showCart"/>
  </div>
</template>
<script>
import AdminHeader from "../components/admin/layouts/AdminHeader.vue";
import AdminSidebar from "../components/admin/layouts/AdminSidebar.vue";
import AddMedia from "../components/admin/media/AddMedia.vue";
import Notify from "@/notify/Notify";
import Cart from "@/front/Cart";

export default {
  data() {
    return {
      categories: [],
    };
  },
  components: {Cart, AdminSidebar, AdminHeader, AddMedia, Notify},
  computed: {
    isVisibleSidebar() {
      return this.$store.state.isVisibleSidebar;
    },
    isVisibleAddMedia() {
      return this.$store.state.isVisibleAddMedia;
    },
    showCart() {
      return this.$store.state.show_cart;
    },
    total_quantity(){
      return this.$store.state.cart.quantity;
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
    openCart(){
      this.$store.dispatch('toggleCart', true);
    },
    getCategories() {
      this.$axios
          .get("/category")
          .then((res) => {
            this.categories = res.data.data;
            const parents = this.categories.filter(
                (item) => item.parent_id === 0
            );
            this.categories = parents.map((item) => {
              const result = {
                ...item,
                children: this.categories.filter(
                    (child) => child.parent_id === item.id
                ),
              };
              return result;
            });
            // console.log(this.categories, "this.categories");
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
  mounted() {
    if (this.$auth.user) {
      this.$store.commit("setUser", this.$auth.user.user);
      this.$store.commit("setRole", this.$auth.user.role[0].name);
    } else {
      this.$store.commit("setUser", {});
      this.$store.commit("setRole", "");
    }
  },
  created() {
    this.getCategories();
  },
};
</script>
<style lang="scss"></style>
