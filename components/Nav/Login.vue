<template lang="pug">
  .login(@click="showHeaderPopup")
    LockBtn
</template>

<script>
import LockBtn from "~/assets/i/svg/lock-btn.svg?inline";

export default {
  components: {
    LockBtn
  },
  methods: {
    showHeaderPopup() {
      this.$store.dispatch('popup/setHeaderPopup', true)
      console.log(this.$store.getters["popup/headerPopup"], 'this.$store.getters["popup/headerPopup"]')
    }
  }
}
</script>

<style lang="scss">
.login {
  cursor: pointer;
}
</style>
