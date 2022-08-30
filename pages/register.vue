<template lang="pug">
  .auth-form
    .auth-form__content
      .auth-form__title
        h1 Register
      .auth-form__form
        form
          .auth-form__form-group
            input#login(type="login" placeholder="Login" v-model="login")
          .auth-form__form-group
            input#email(type="email" placeholder="Email" v-model="email")
          .auth-form__form-group
            input#password(type="password" placeholder="Password" v-model="password")
          div.auth-form__info Do you have an account yet? <nuxt-link to="/login">Login</nuxt-link>
          .auth-form__form-group
            button(type="submit" @click="onSubmit") Register
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      login: "",
      email: "",
      password: "",
    }
  },
  methods: {
    onSubmit() {
      console.log('submit');
    },
  }
}
</script>
