<template>
  <div class="default">
    <Notify v-if="isVisibleNotify" :text="notifyMessage"/>
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
</template>
<script>
import AdminHeader from "../components/admin/layouts/AdminHeader.vue";
import AdminSidebar from "../components/admin/layouts/AdminSidebar.vue";
import AddMedia from "../components/admin/media/AddMedia.vue";
import Notify from "@/notify/Notify";

export default {
  components: {AdminSidebar, AdminHeader, AddMedia, Notify},
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
      this.$router.push('/login');
    }
  },
  mounted() {
    if (this.$auth.user) {
      this.$store.commit('setUser', this.$auth.user.user);
      this.$store.commit('setRole', this.$auth.user.role[0].name);
    }else{
      this.$store.commit('setUser', {});
      this.$store.commit('setRole', '');
    }
  }
};
</script>
<style lang="scss"></style>
