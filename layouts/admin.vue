<template lang="pug">
  .admin
    .aside
      Sidebar
    .main
      .navigation
        nuxt-link(to="/admin/media/add-media" class="btn green") Add media
        nuxt-link(to="/admin/media" class="btn") List media
        Language
        a(class="logout" href="#" @click.prevent="logout")
          i.el-icon-platform-eleme
      .content
        nuxt
</template>
<script>
import Sidebar from "@/components/admin/Sidebar.vue";
import Language from "../components/Nav/Language";

export default {
  middleware: "auth",
  components: {
    Language,
    Sidebar
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
.admin {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
}
.aside {
  flex: 0 0 30rem;
  background-color: #545c64;
}
.aside .el-menu {
  border: none;
}
.main {
  flex: 1;
}
.content {
  padding: 3rem;
}
.navigation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #545c64;
  a {
    margin-left: 3rem;
    display: block;
  }
  .logout {
    color: red;
  }
}
</style>
