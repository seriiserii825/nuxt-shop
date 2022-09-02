<template>
  <ul class="admin-menu">
    <AdminMenuItem
      label="Dashboard"
      icon="/svg/dashboard.svg"
      url="/admin"
      :link="true"
    ></AdminMenuItem>
    <AdminMenuItem
      label="Category"
      icon="/svg/file-plus.svg"
      :items="[{ url: '/admin/category/create' }, { url: '/admin/category' }]"
    />
    <AdminMenuItem
      label="Book"
      icon="/svg/book.svg"
      :items="[{ url: '/admin/book/create' }, { url: '/admin/book' }]"
    />
    <AdminMenuItem
      label="Clients"
      icon="/svg/user.svg"
      :items="[{ url: '/admin/client/create' }, { url: '/admin/client' }]"
    />
    <AdminMenuItem
      label="Issue Book"
      icon="/svg/user.svg"
      :items="[{ url: '/admin/issue-book/create' }, { url: '/admin/issue-book' }]"
    />
    <AdminMenuItem
      label="Return Book"
      icon="/svg/user.svg"
      :items="[{ url: '/admin/return-book/create' }, { url: '/admin/return-book' }]"
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
