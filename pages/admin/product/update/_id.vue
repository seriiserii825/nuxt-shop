<template lang="pug">
  .admin-main
    h2 Update page
    el-form.demo-ruleForm.admin-form(:model='ruleForm', :rules='rules', ref='ruleForm')
      .el-form__flex
        el-form-item(label='Title' prop='title')
          el-input(v-model='ruleForm.title' @change="createSlug(ruleForm.title, 'slug')")
        el-form-item(label='Slug' prop='slug')
          el-input(v-model='slug')
      .el-form__flex
        el-form-item(label='Description' prop='description')
          el-input(v-model='description')
        el-form-item(label='Price' prop='price')
          el-input(v-model='price' type="number")
      .el-form__flex
        el-form-item(label='Count in stock' prop='countInStock')
          el-input(v-model='countInStock' type="number")
        el-form-item(label='Rating' prop='rating')
          el-input(v-model='rating' type="number")
      .el-form__flex
        el-form-item(label='Num reviews' prop='numReviews')
          el-input(v-model='numReviews' type="number")
        el-form-item(v-if="categories.length" label='Category' prop='category' class="vertical")
          el-radio(v-for="item in categories" v-model='category', :label="item._id" :key="item._id") {{ item.title }}

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
      process.env.baseUrl + "/api/v1/product/" + params.id
    );

    let categories = await $axios.$get(process.env.baseUrl + "/api/v1/category/");

    const { tableData } = await $axios.$get(
      process.env.baseUrl + "/api/v1/media"
    );
    console.log(record, 'record')
    return {
      slug: record.slug,
      id: record._id,
      description: record.description,
      category: record.category,
      price: record.price,
      countInStock: record.countInStock,
      rating: record.rating,
      numReviews: record.numReviews,
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
      categories: categories.data
    };
  },
  data() {
    return {
      loading: false,
      actionUrl: process.env.baseUrl + "/api/v1/product",
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
            image: this.image,
            description: this.description,
            category: this.category,
            price: this.price,
            countInStock: this.countInStock,
            rating: this.rating,
            numReviews: this.numReviews
          };

          this.$axios.$patch(
            process.env.baseUrl + "/api/v1/product/" + this.$route.params.id,
            reqData
          ).then(() => {
            this.loading = false;
            this.$router.push(`/admin/product/?slug=${this.slug}`);
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
          this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    MediaGrid
  },
  mounted() {
    console.log(this.category, 'this.category');
    console.log(this.categories, 'this.categories');
  }
};
</script>
