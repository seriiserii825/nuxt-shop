<template lang="pug">
  .admin-info
    .admin-info__item
      Info(:number="recordsLength" title="Products" icon="el-icon-goods" link="/admin/product" bg="#17a2b8")
    .admin-info__item
      Info(:number="catsLength" title="Categories" icon="el-icon-s-fold" link="/admin/category" bg="#28a745")
</template>
<script>
import Info from "../../components/admin/Info";

export default {
  layout: "admin",
  async asyncData({ $axios }) {
    const { records } = await $axios.$get(
      process.env.baseUrl + "/api/v1/product/"
    );

    const { data } = await $axios.$get(
      process.env.baseUrl + "/api/v1/category/"
    );
    return { recordsLength: records.length, catsLength: data.length };
  },
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
  margin: 0 -1.5rem;
  &__item {
    width: 25%;
    margin: 0 1.5rem;
    flex: 0 0 calc(25% - 3rem);
  }
}
</style>
