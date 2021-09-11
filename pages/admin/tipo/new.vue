<template lang="pug">
  .admin-main
    h2 Add new Tipo
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
      el-form-item
        el-button(type='primary' :loading="loading" @click="submitForm()") Create
</template>
<script>
export default {
  layout: "admin",
  data() {
    return {
      loading: false,
      slug_it: "",
      slug_en: "",
      ruleForm: {
        title_it: "",
        title_en: ""
      },
      rules: {
        title_it: [
          {required: true, message: "Field is required", trigger: "blur"}
        ],
        title_en: [
          {required: true, message: "Field is required", trigger: "blur"}
        ]
      }
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
          try {
            const tipo = await this.$axios.$post(
              process.env.baseUrl + "/api/v1/tipo",
              {
                title_it: this.ruleForm.title_it,
                title_en: this.ruleForm.title_en,
                slug_it: this.slug_it,
                slug_en: this.slug_en
              }
            );

            this.loading = false;

            this.$message.success(tipo.message);
            this.$router.push("/admin");
          } catch (error) {
            console.log(error.message, "this.$message");
            this.$message.error(error.message);
            this.loading = false;
          }
        } else {
          this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
