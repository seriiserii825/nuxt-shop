<template lang="pug">
.info-widget(:style="`background: ${background}`")
  .info-widget__content
    h3.info-widget__count {{ subtitle }}: <strong>{{ count }}</strong>
    h2.info-widget__title {{ title }}
    img(:src="icon" alt="icon" class="info-widget__icon")
  nuxt-link.info-widget__link(:to="url") View more
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      default: "#ccc",
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>

