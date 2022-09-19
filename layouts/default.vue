<template>
  <div class="default">
    <div class="main-header">
      <ul class="category-menu" v-if="categories.length">
        <li v-for="item in categories" :key="item.id">
          <nuxt-link :to="`/category/${item.id}`">{{ item.title }}</nuxt-link>
          <ul class="category-menu__sub" v-if="item.children.length">
            <li v-for="child in item.children" :key="child.id">
              <nuxt-link :to="`/category/${child.id}`">{{
                child.title
              }}</nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
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
          <nuxt-link to="/cabinet">Cabinet</nuxt-link>
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
  </div>
</template>
<script>
import AdminHeader from "../components/admin/layouts/AdminHeader.vue";
import AdminSidebar from "../components/admin/layouts/AdminSidebar.vue";
import AddMedia from "../components/admin/media/AddMedia.vue";
import Notify from "@/notify/Notify";

export default {
  data() {
    return {
      categories: [],
    };
  },
  components: { AdminSidebar, AdminHeader, AddMedia, Notify },
  computed: {
    isVisibleNotify() {
      return this.$store.state.isVisibleNotify;
    },
    notifyMessage() {
      return this.$store.state.notifyMessage;
    },
    isVisibleSidebar() {
      return this.$store.state.isVisibleSidebar;
    },
    isVisibleAddMedia() {
      return this.$store.state.isVisibleAddMedia;
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
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
          console.log(this.categories, "this.categories");
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
