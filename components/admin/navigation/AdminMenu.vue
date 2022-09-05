<template lang="pug">
  ul.admin-menu
    AdminMenuItem(label='Dashboard', icon='/svg/dashboard.svg', url='/admin', :link='true')
    AdminMenuItem(label='Order', icon='/svg/orders.svg', :items="[{ url: '/admin/order/create' }, { url: '/admin/order' }]")
    AdminMenuItem(label='Product', icon='/svg/product.svg', :items="[{ url: '/admin/product/create' }, { url: '/admin/product' }]")
    AdminMenuItem(label='Category', icon='/svg/category.svg', :items="[{ url: '/admin/category/create' }, { url: '/admin/category' }]")
    AdminMenuItem(label='Attribute', icon='/svg/users.svg', :items="[{ url: '/admin/attribute/create' }, { url: '/admin/attribute' }]")
    AdminMenuItem(label='User', icon='/svg/users.svg', :items="[{ url: '/admin/user/create' }, { url: '/admin/user' }]")
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
