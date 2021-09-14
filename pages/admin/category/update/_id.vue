<template lang="pug">
  .admin-main
    h2 Update page
    el-form.demo-ruleForm.admin-form(:model='ruleForm', :rules='rules', ref='ruleForm')
      .el-form__flex
        el-form-item(label='Title' prop='title')
          el-input(v-model='ruleForm.title'  @change="createSlug(ruleForm.title, 'slug')")
        el-form-item(label='Slug', prop='slug')
          el-input(v-model='slug')

      .buttons
        el-button(type="success" @click.prevent="() => {showModal = true; file_field_default = 'image'}")
          span(v-if="!image") Select file from media gallery
          span(v-else) {{ image }}
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
    let { record } = await $axios.$get(
      process.env.baseUrl + "/api/v1/category/" + params.id
    );

    const { tableData } = await $axios.$get(
      process.env.baseUrl + "/api/v1/media"
    );
    return {
      slug: record.slug,
      id: record.id,
      ruleForm: {
        title: record.title,
      },
      rules: {
        title: [
          { required: true, message: "Field is required", trigger: "blur" }
        ]
      },
      image: record.image,
      tableData,
      showModal: false,
    };
  },
  data() {
    return {
      loading: false,
      actionUrl: process.env.baseUrl + "/api/v1/category",
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
          const reqData = {
            title: this.ruleForm.title,
            slug: this.slug,
            image: this.image
          };

          this.$axios.$patch(
            process.env.baseUrl + "/api/v1/category/" + this.$route.params.id,
            reqData
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
          this.$router.push("/admin/category");
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
