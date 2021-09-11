<template lang="pug">
  .add-media
    .add-media__content
      form(:action="actionUrl" enctype="multipart/form-data" @submit.prevent="uploadFile" )
        input(type="file" @change="previewFiles" multiple)
        span.upload-file-btn.btn Add file
      ul.upload-list
        li(v-for="({name, size}) in fileList" :key="name")
          strong  {{ name }}
          em ({{ formatBytes(size) }})
      el-button(type="primary" @click.prevent="uploadFile") Upload file
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    actionUrl() {
      return process.env.baseUrl;
    }
  },
  methods: {
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    previewFiles(event) {
      this.fileList = [...event.target.files];
      console.log(this.fileList, 'this.fileList')
    },
    async uploadFile() {
      const formData = new FormData();

      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('images', this.fileList[i])
      }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      try {
        await this.$axios.$post(this.actionUrl + '/api/v1/media', formData);
        this.$message.success('Image was uploaded');
        await this.$nuxt.refresh()
        window.location.href = '/admin/media';
      } catch (e) {
        console.log(e, 'e')
      }
    }
  }
}
</script>

<style lang="scss">
.add-media {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #888;
  .buttons {
    margin-bottom: 4rem;
  }
  .el-upload-list {
    padding: 1rem;
    background-color: white;
    border-radius: 0.6rem;
  }
  form {
    position: relative;
    margin-bottom: 8rem;
    width: 30rem;
    input[type="file"] {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 5rem;
      z-index: 1;
      cursor: pointer;
    }
    &:hover {
      .upload-file-btn {
        color: #333;
        background-color: white;
      }
    }
  }
  .upload-file-btn {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5rem;
    z-index: 2;
    pointer-events: none;
    cursor: pointer;
    transition: all .4s;
  }
}
</style>
