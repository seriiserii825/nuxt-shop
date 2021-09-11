<template lang="pug">
  .table
    el-table(:data='solutions' v-if="solutions.length" :row-class-name="tableRowClassName")
      el-table-column(label='Image small')
        template(slot-scope='scope')
          img(style='margin-left: 10px' :src="`/uploads/${scope.row.image_small}`")
      el-table-column(label='Title' width="150")
        template(slot-scope='scope')
          strong(style='margin-left: 10px') {{ scope.row['title'+getLocale] }}
      el-table-column(label='Slug')
        template(slot-scope='scope')
          span(style='margin-left: 10px') {{ scope.row['slug'+getLocale] }}
      el-table-column(label='Tipo')
        template(slot-scope='scope')
          strong(style='margin-left: 10px') {{ scope.row['tipo_id'] ? scope.row['tipo_id']["title"+getLocale] : null }}
      el-table-column(label='Created at')
        template(slot-scope='scope')
          strong(style='margin-left: 10px') {{ new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }).format(new Date(scope.row.createdDate)) }}
      el-table-column(label='Operations')
        template(slot-scope='scope')
          el-button(size='mini', @click='edit(scope.row._id)') Edit
          el-button(size='mini', type='danger', @click='remove(scope.row._id)') Delete
</template>
<script>
export default {
  layout: "admin",
  async asyncData({ $axios }) {
    const { data } = await $axios.$get(
      process.env.baseUrl + "/api/v1/solution/"
    );
    console.log(data, 'data')
    return { solutions: data };
  },
  data() {
    return {
      updateTitle: null
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.title_it === this.$route.query.title) {
        return "active-row";
      }
      return "";
    },
    edit(id) {
      this.$router.push("/admin/solutions/update/" + id);
    },
    async remove(id) {
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        try {
          await this.$axios.delete(
            process.env.baseUrl + "/api/v1/solution/" + id
          );
          this.$message.success("Post was deleted");
        } catch (e) {
          console.log(e, "e");
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        });
      });
    }
  },
  computed: {
    getLocale() {
      return "_" + this.$i18n.locale;
    }
  },
  mounted() {
    if (this.$route.query.message && this.$route.query.message === "update") {
      this.$message.success(
        `Solution "${this.$route.query.title}" was updated...`
      );
      this.updateTitle = this.$route.query.title;
    }
  }
};
</script>
<style>
.el-menu--inline {
  border-bottom: 1px solid white;
}

.el-table__row.active-row {
  background-color: #e0e0e0;
}
</style>
