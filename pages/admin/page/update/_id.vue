<template lang="pug">
  .admin-main
    h2 Update page
    el-form.demo-ruleForm.admin-form(:model='ruleForm', :rules='rules', ref='ruleForm')
      .el-form__flex
        el-form-item(label='Title it' prop='title_it')
          el-input(v-model='ruleForm.title_it'  @change="createSlug(ruleForm.title_it, 'slug_it')")
        el-form-item(label='Title en', prop='title_en')
          el-input(v-model='ruleForm.title_en'   @change="createSlug(ruleForm.title_en, 'slug_en')")
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
        el-button(type='primary' :loading="loading" @click="submitForm()") Update

    .media-gallery(v-if="showModal" )
      MediaGrid(@close="showModal = false" @file_name="file_name" :file_field="file_field_default")

</template>
<script>
import MediaGrid from "../../../../components/admin/MediaGrid";
import mediaMixin from "../../../../mixins/mediaMixin";

export default {
  layout: "admin",
  mixins: [mediaMixin],
  async asyncData({ $axios, params }) {
    let { page } = await $axios.$get(
      process.env.baseUrl + "/api/v1/page/" + params.id
    );

    const { tableData } = await $axios.$get(
      process.env.baseUrl + "/api/v1/media"
    );
    return {
      slug_it: page.slug_it,
      slug_en: page.slug_en,
      id: page.id,
      ruleForm: {
        title_it: page.title_it,
        title_en: page.title_en
      },
      rules: {
        title_it: [
          { required: true, message: "Field is required", trigger: "blur" }
        ],
        title_en: [
          { required: true, message: "Field is required", trigger: "blur" }
        ]
      },
      imageMedia: page.image,
      tableData,
      showModal: false,
    };
  },
  data() {
    return {
      loading: false,
      actionUrl: process.env.baseUrl + "/api/v1/page",
      image: null,
      file_field_default: null
    };
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
    submitForm() {
      this.loading = true;
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const formData = new FormData();
          formData.append("title_it", this.ruleForm.title_it);
          formData.append("title_en", this.ruleForm.title_en);
          formData.append("slug_it", this.slug_it);
          formData.append("slug_en", this.slug_en);
          console.log(this.image, 'this.image')
          if (this.image) {
            formData.append("image", this.image, this.image.name);
          }
          formData.append("imageMedia", this.imageMedia);

          this.$axios.$patch(
            process.env.baseUrl + "/api/v1/page/" + this.$route.params.id,
            formData
          ).catch(err => {
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

          this.loading = false;
          this.$router.push("/admin/page");
        } else {
          this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    MediaGrid
  }
};
</script>
