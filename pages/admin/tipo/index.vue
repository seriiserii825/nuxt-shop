<template lang="pug">
  el-table(:data='tipos')
    el-table-column(label='Title')
      template(slot-scope='scope')
        span(style='margin-left: 10px') {{ scope.row['title'+getLocale] }}
    el-table-column(label='Slug')
      template(slot-scope='scope')
        span(style='margin-left: 10px') {{ scope.row['slug'+getLocale] }}
    el-table-column(label='Operations')
      template(slot-scope='scope')
        el-button(size='mini', @click='edit(scope.row._id)') Edit
        el-button(size='mini', type='danger', @click='remove(scope.row._id)') Delete
</template>
<script>
export default {
  layout: "admin",
  async asyncData({ $axios }) {
    const { tipos } = await $axios.$get(process.env.baseUrl + "/api/v1/tipo");
    return { tipos };
  },
  methods: {
    edit(id) {
      this.$router.push("/admin/tipo/update/" + id);
    },
    async remove(id) {
      try {
        const tipo = await this.$axios.$delete(
          process.env.baseUrl + "/api/v1/tipo/" + id
        );
        if (tipo) {
          this.$message.success(`Post ${id} deleted`);

          await this.$nuxt.refresh();
        } else {
          this.$message.error("Some error");
        }
      } catch (e) {
        console.log(e.message, "e");
      }
    }
  },
  computed: {
    getLocale() {
      return "_" + this.$i18n.locale;
    }
  },
  mounted() {
    console.log(this.$i18n.locale, "this.$i18n.locale");
  }
};
</script>
