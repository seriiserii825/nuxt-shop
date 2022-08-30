<template lang="pug">
  .empty
    .empty__content
      nuxt
    Notify(v-if="isVisibleNotify" :text="notifyMessage")
</template>
<script>
import Notify from "@/notify/Notify";

export default {
  components: {Notify},
  layout: "empty",
  computed: {
    isVisibleNotify() {
      return this.$store.state.isVisibleNotify;
    },
    notifyMessage() {
      return this.$store.state.notifyMessage;
    },
  }
}
</script>
<style lang="scss">
</style>
