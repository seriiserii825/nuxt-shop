<template lang="pug">
  .admin-main
    h2 Create new
    el-form.demo-ruleForm.admin-form(:model='ruleForm' :rules='rules' ref='ruleForm' )
      .el-form__flex
        el-form-item(label='Title it' prop='title_it')
          el-input(v-model='ruleForm.title_it' @change="createSlug(ruleForm.title_it, 'slug_it')")
        el-form-item(label='Title en', prop='title_en')
          el-input(v-model='ruleForm.title_en'  @change="createSlug(ruleForm.title_en, 'slug_en')")
      .el-form__flex
        el-form-item(label='Slug it' prop='slug_it')
          el-input(v-model='slug_it')
        el-form-item(label='Slug en', prop='slug_en')
          el-input(v-model='slug_en')
      .el-form-item
        label Excerpt it
        client-only
          mavon-editor(v-model="excerpt_it")
      .el-form-item
        label Excerpt en
        client-only
          mavon-editor(v-model="excerpt_en")
      .tipos
        el-form-item(label='Tipo' prop='tipo')
          el-select(v-model='tipo', placeholder='Select' @change="getTipo")
            el-option(v-for='(item) in tipos' :key='item._id' :label='item["title_"+$i18n.locale]' :value='item._id')

      .el-form__flex
        .el-form-item
          h2 Image in loop
          .buttons
            el-button(type="success" @click.prevent="() => {showModal = true; file_field_default = 'imageMedia'}")
              span(v-if="!imageMedia") Select file from media gallery
              span(v-else) {{ imageMedia }}

        .el-form-item
          h2 Image in mega menu
          .buttons
            el-button(type="success" @click.prevent="() => {showModal = true; file_field_default = 'imageMediaMenu'}")
              span(v-if="!imageMediaMenu") Select file from media gallery
              span(v-else) {{ imageMediaMenu }}

      el-form-item
        el-button(type='primary' :loading="loading" @click="submitForm()") Create


    .media-gallery(v-if="showModal" )
      MediaGrid(@close="showModal = false" @file_name="file_name" :file_field="file_field_default")
</template>
<script>
import MediaGrid from "../../../components/admin/MediaGrid";
import mediaMixin from "../../../mixins/mediaMixin";

export default {
  layout: "admin",
  mixins: [mediaMixin],
  fetch({ store }) {
    if (store.getters["media/media"].length === 0) {
      store.dispatch("media/fetch");
    }
  },
  async asyncData({ $axios }) {
    const { tipos } = await $axios.$get(process.env.baseUrl + "/api/v1/tipo");
    const { tableData } = await $axios.$get(
      process.env.baseUrl + "/api/v1/media"
    );
    return { tableData, tipos };
  },
  data() {
    return {
      search: "",
      showModal: false,
      actionUrl: process.env.baseUrl + "/api/v1/solution",
      loading: false,
      excerpt_it: "",
      excerpt_en: "",
      slug_it: "",
      slug_en: "",
      tipo: "",
      file_field_default: "",
      imageMedia: null,
      imageMediaMenu: null,
      ruleForm: {
        title_it: "",
        title_en: ""
      },
      rules: {
        title_it: [
          { required: true, message: "Field is required", trigger: "blur" }
        ],
        title_en: [
          { required: true, message: "Field is required", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    MediaGrid
  },
  methods: {
    open(imageTitle) {
      this.$alert(`<img src="${imageTitle}" width="800" />`, "HTML String", {
        dangerouslyUseHTMLString: true
      });
    },
    getTipo() {
      console.log(this.tipo, "tipo");
    },
    createSlug(value, prop) {
      let slug = value.toLowerCase();
      slug = slug
        .split(" ")
        .join("-")
        .replace(/[^\w-]+/g, "");
      this[prop] = slug;
    },
    submitForm() {
      this.loading = true;

      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            const formData = new FormData();
            formData.append("title_it", this.ruleForm.title_it);
            formData.append("title_en", this.ruleForm.title_en);
            formData.append("slug_it", this.slug_it);
            formData.append("slug_en", this.slug_en);
            formData.append("excerpt_it", this.excerpt_it);
            formData.append("excerpt_en", this.excerpt_en);
            formData.append("tipo_id", this.tipo);

            if (this.image) {
              formData.append("image", this.image, this.image.name);
            }
            formData.append("imageMedia", this.imageMedia);

            await this.$axios.$post(this.actionUrl, formData);

            this.loading = false;

            this.ruleForm.title_it = "";
            this.ruleForm.title_en = "";
            this.slug_it = "";
            this.slug_en = "";
            this.excerpt_it = "";
            this.excerpt_en = "";
            this.image = null;
            this.tipo = "";
            this.$refs.upload.clearFiles();

            this.$router.push("/admin/solutions");
          } catch (error) {
            console.log(error.message, "error login form");
            this.loading = false;
          }
        } else {
          this.loading = false;
          this.$message.error("Invalid form");
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    this.tipo = this.tipos[0]["id"];
  }
};
</script>
<style lang="scss" scoped>
.el-form-item label {
  display: block;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}
.tipos {
  margin-bottom: 5rem;
}
.upload-demo {
  margin-bottom: 3rem;
}
.buttons {
  .el-button {
    margin-bottom: 3rem;
  }
}
.media-gallery {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem;
  width: 80%;
  height: 80%;
  background-color: #f1f1f1;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  overflow-y: scroll;
  z-index: 10000;
}
</style>
