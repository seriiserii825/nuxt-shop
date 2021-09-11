export default {
  fetch({ store }) {
    if (store.getters["media/media"].length === 0) {
      store.dispatch("media/fetch");
    }
  },
  methods: {
    async removeFile(title) {
      await this.$axios.$delete(
        process.env.baseUrl + "/api/v1/media/" + title
      );
      this.$message.success(`File "${title}" was deleted...`);
      await this.$nuxt.refresh();
    },
    open(imageTitle) {
      this.$alert(`<img src="${imageTitle}" width="800" />`, "HTML String", {
        dangerouslyUseHTMLString: true
      });
    },
    file_name({ file, file_field }) {
      console.log(file, 'file')
      console.log(file_field, 'file_field')
      this[file_field] = file;
      this.showModal = false;
    }
  }
}
