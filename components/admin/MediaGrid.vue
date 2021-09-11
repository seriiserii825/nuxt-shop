<template lang="pug">
  .media-grid
    header.media-grid__header
      input(type="text" v-model="search_field" @input="searchData" placeholder="Search media...")
      el-button(@click="close" type="danger") Close
    .media-grid__wrap
      .media-grid__item(v-for="{name, id} in result" :key="id" @click="addFile(name)")
        img(:src="`/uploads/${name}`" width="300")
        .media-grid__content
          h4.media-grid__title {{ name }}
          el-button(class="media-grid__button" type="danger" @click="removeFile(name)") Remove
</template>

<script>
export default {
  props: ['file_field'],
  data() {
    return {
      search: '',
      showOverlay: false,
      search_field: '',
      result: []
    }
  },
  methods: {
    async removeFile(title) {
      await this.$axios.delete(process.env.baseUrl + '/api/v1/media/' + title);
      this.$message.success(`File "${title}" was deleted...`);
      await this.$nuxt.refresh()
    },
    addFile(file) {
      this.$emit('file_name', { file: file, file_field: this.file_field });
    },
    close() {
      this.$emit('close')
    },
    searchData() {
      this.result = this.tableData.filter(item => item.name.toLowerCase().includes(this.search_field.toLowerCase()));
    }
  },
  computed: {
    tableData() {
      return this.$store.getters["media/media"].tableData;
    },
  },
  mounted() {
    this.result = this.tableData;
  }
}
</script>

<style lang="scss">
.media-grid {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    text-align: right;
    input {
      flex: 0 0 30rem;
      height: 4rem;
      text-indent: 2rem;
      border: 1px solid #aaa;
      outline: none;
    }
  }
}
.el-message-box {
  width: 900px;
}
</style>
