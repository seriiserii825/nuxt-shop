<template>
  <ul class="admin-menu">
    <AdminMenuItem
      label="Dashboard"
      icon="/svg/dashboard.svg"
      url="/"
      :link="true"
    ></AdminMenuItem>
    <AdminMenuItem
      label="Category"
      icon="/svg/file-plus.svg"
      :items="[{ url: '/category/create' }, { url: '/category' }]"
    />
    <AdminMenuItem
      label="Book"
      icon="/svg/book.svg"
      :items="[{ url: '/book/create' }, { url: '/book' }]"
    />
    <AdminMenuItem
      label="Clients"
      icon="/svg/user.svg"
      :items="[{ url: '/client/create' }, { url: '/client' }]"
    />
    <AdminMenuItem
      label="Issue Book"
      icon="/svg/user.svg"
      :items="[{ url: '/issue-book/create' }, { url: '/issue-book' }]"
    />
    <AdminMenuItem
      label="Return Book"
      icon="/svg/user.svg"
      :items="[{ url: '/return-book/create' }, { url: '/return-book' }]"
    />
  </ul>
</template>
<script>
import AdminMenuItem from "./AdminMenuItem.vue";
export default {
  name: "AdminMenu",
  components: {
    AdminMenuItem,
  },
};
</script>
<style lang="scss">
</style>
