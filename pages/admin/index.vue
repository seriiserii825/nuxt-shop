<template lang="pug">
  .admin-info
    .admin-info__item
      Info(number="30" title="Products" icon="el-icon-goods" link="/admin/product")
</template>
<script>
import Info from "../../components/admin/Info";

export default {
  layout: "admin",
  components: {
    Info
  }
};
</script>

<style lang="scss">
.admin-info {
  display: flex;
  align-items: center;
  width: 100%;
  &__item {
    width: 25%;
  }
}
</style>
