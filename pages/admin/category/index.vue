<template lang="pug">
  .table
    el-table(:data='pages' :row-class-name="tableRowClassName")
      el-table-column(label='Title' width="150")
        template(slot-scope='scope')
          strong(style='margin-left: 10px') {{ scope.row.title }}
      el-table-column(label='Slug')
        template(slot-scope='scope')
          span(style='margin-left: 10px') {{ scope.row.slug }}
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
      process.env.baseUrl + "/api/v1/category/"
    );
    return { pages: data };
  },
  data() {
    return {
      updateTitle: null
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.slug === this.$route.query.slug) {
        return "active-row";
      }
      return "";
    },
    edit(id) {
      this.$router.push("/admin/category/update/" + id);
    },
    async remove(id) {
      this.$confirm('This will permanently delete this page. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        try {
          const page = await this.$axios.delete(
            process.env.baseUrl + "/api/v1/category/" + id
          );
          if (page) {
            this.$message.success("Post was deleted");

            await this.$nuxt.refresh();
          } else {
            this.$message.error("Some error");
          }
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
  mounted() {
    if (this.$route.query.message && this.$route.query.message === "update") {
      this.$message.success(
        `Page "${this.$route.query.title}" was updated...`
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
