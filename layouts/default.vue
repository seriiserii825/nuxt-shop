<template>
  <div class="default">
    <Notify v-if="isVisibleNotify" :text="notifyMessage"/>
    <ul class="default__menu menu-default">
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/login">Login</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/register">Register</nuxt-link>
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
};
</script>
<style lang="scss"></style>
