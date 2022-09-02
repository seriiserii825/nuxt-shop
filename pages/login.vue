<template lang="pug">
  .auth-form
    .auth-form__content
      .auth-form__title
        h1 Login
      .auth-form__form
        form
          .auth-form__form-group
            input#email(type="email" placeholder="Email" v-model="email")
            span.auth-form--error(v-if="errors.email && errors.email[0]") {{ errors.email[0] }}
          .auth-form__form-group
            input#password(type="password" placeholder="Password" v-model="password")
            span.auth-form--error(v-if="errors.password && errors.password[0]") {{ errors.password[0] }}
          div.auth-form__info You don't have an account yet? <nuxt-link to="/register">Register</nuxt-link>
          .auth-form__form-group
            button(type="submit" @click.prevent="onSubmit") Login
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      errors: [],
      email: "",
      password: "",
    }
  },
  methods: {
    async onSubmit() {
      try {
        await this.$auth.loginWith('laravelJWT', {
          data: {
            email: this.email,
            password: this.password,
          }
        });
        await this.$router.push('/');
      } catch (err) {
        this.errors = err.response.data.errors;
      }
    },
  },
  created() {
    if (this.$auth && this.$auth.user) {
      this.$router.push('/');
    }
  }
}
</script>
