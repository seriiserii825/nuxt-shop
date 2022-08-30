<template lang="pug">
  .auth-form
    .auth-form__content
      .auth-form__title
        h1 Login
      .auth-form__form
        form
          .auth-form__form-group
            input#email(type="email" placeholder="Email" v-model="email")
          .auth-form__form-group
            input#password(type="password" placeholder="Password" v-model="password")
          div.auth-form__info You don't have an account yet? <nuxt-link to="/register">Register</nuxt-link>
          .auth-form__form-group
            button(type="submit" @click="onSubmit") Login
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
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
