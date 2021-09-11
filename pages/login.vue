<template lang="pug">
  .login
    .content
      h4 Login
      el-form.demo-ruleForm.form(:model='ruleForm', :rules='rules', ref='ruleForm', label-width='120px')
        el-form-item(label='Login' prop='login')
          el-input(v-model='ruleForm.login')
        el-form-item(label='Password', prop='password')
          el-input(type="password" v-model='ruleForm.password')
        el-form-item
          el-button(type='primary' :loading="loading" @click="submitForm()") Login
</template>
<script>
export default {
  layout: "empty",
  data() {
    return {
      loading: false,
      ruleForm: {
        login: "",
        password: ""
      },
      rules: {
        login: [
          { required: true, message: "Field is required", trigger: "blur" }
        ],
        password: [
          { required: true, message: "Field is required", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.loading = true;
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            const data = {
              login: this.ruleForm.login,
              password: this.ruleForm.password
            };
            // console.log(data, "data");
            const response = await this.$auth.loginWith("local", {
              data: this.ruleForm
            });
            // console.log(response, "response");
            this.loading = false;

            if (response.data.status === 1) {
              this.$message.success(response.data.message);
              window.location.href = process.env.baseUrl + "/admin";
            } else {
              this.$message.warning(response.data.message);
            }
          } catch (error) {
            console.log(error, "error login form");
            this.loading = false;
          }
        } else {
          this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    const { message } = this.$route.query;
    if (message === "login") {
      this.$message.info("You need to login");
    } else if (message === "logout") {
      this.$message.success("You was logged out from system");
    }
    if (!this.$auth.$storage._state["_token.local"]) {
      this.$message.error("Token invalid!!!");
    }
  }
};
</script>
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.content {
  padding: 4rem;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
