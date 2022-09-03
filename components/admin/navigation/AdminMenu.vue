<template>
  <ul class="admin-menu">
    <AdminMenuItem
        label="Dashboard"
        icon="/svg/dashboard.svg"
        url="/admin"
        :link="true"
    ></AdminMenuItem>
    <AdminMenuItem
        label="Order"
        icon="/svg/file-plus.svg"
        :items="[{ url: '/admin/order/create' }, { url: '/admin/order' }]"
    />
    <AdminMenuItem
        label="Product"
        icon="/svg/file-plus.svg"
        :items="[{ url: '/admin/product/create' }, { url: '/admin/product' }]"
    />
    <AdminMenuItem
        label="Category"
        icon="/svg/file-plus.svg"
        :items="[{ url: '/admin/category/create' }, { url: '/admin/category' }]"
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
