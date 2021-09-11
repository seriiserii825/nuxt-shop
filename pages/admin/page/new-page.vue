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

      .buttons
        el-button(type="success" @click.prevent="() => {showModal = true; file_field_default = 'imageMedia'}")
          span(v-if="!imageMedia") Select file from media gallery
          span(v-else) {{ imageMedia }}

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
    const { tableData } = await $axios.$get(
      process.env.baseUrl + "/api/v1/media"
    );
    return { tableData };
  },
  data() {
    return {
      search: "",
      showModal: false,
      file_field_default: null,
      actionUrl: process.env.baseUrl + "/api/v1/page",
      loading: false,
      excerpt_it: "",
      excerpt_en: "",
      slug_it: "",
      slug_en: "",
      imageMedia: "",
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
    createSlug(value, prop) {
      let slug = value.toLowerCase();
      slug = slug
        .split(" ")
        .join("-")
        .replace(/[^\w-]+/g, "");
      this[prop] = slug;
    },
    async submitForm() {
      this.loading = true;

      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const formData = new FormData();
          formData.append("title_it", this.ruleForm.title_it);
          formData.append("title_en", this.ruleForm.title_en);
          formData.append("slug_it", this.slug_it);
          formData.append("slug_en", this.slug_en);
          formData.append("homeIntroSubTitle_it", this.homeIntroSubTitle_it);
          formData.append("homeIntroSubTitle_en", this.homeIntroSubTitle_en);
          formData.append("homeIntroTitle_it", this.homeIntroTitle_it);
          formData.append("homeIntroTitle_en", this.homeIntroTitle_en);

          if (this.image) {
            formData.append("image", this.image, this.image.name);
          }
          formData.append("imageMedia", this.imageMedia);

          this.$axios.$post(this.actionUrl, formData).then(res => {
            this.ruleForm.title_it = "";
            this.ruleForm.title_en = "";
            this.slug_it = "";
            this.slug_en = "";
            this.excerpt_it = "";
            this.excerpt_en = "";
            this.image = null;
            this.$refs.upload.clearFiles();
            this.$router.push("/admin/page");
            this.$message.error(error);
            this.loading = false;
          }).catch(err => {
            if (err.response) {
              console.log(err.response.data.message, 'err.response.data.message');
              this.$message.error(err.response.data.message);
              this.loading = false;
            } else if (err.request) {
              this.$message.error(err.request);
              console.log(err.request, 'err.request')
              this.loading = false;
            }
          });
        } else {
          this.$message.error('Form error');
          this.loading = false;
          return false;
        }
      });
    }
  }
};
</script>
