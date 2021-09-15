<template lang="pug">
  .rating
    .rating__stars
      StarEmpty(v-if="rating <= 0.4")
      StarHalf(v-if="rating >= 0.5 && rating <= 0.7")
      StarFull(v-if="rating >= 0.8")
      StarEmpty(v-if="rating <= 1.4")
      StarHalf(v-if="rating >= 1.5 && rating <= 1.7")
      StarFull(v-if="rating >= 1.8")
      StarEmpty(v-if="rating <= 2.4")
      StarHalf(v-if="rating >= 2.5 && rating <= 2.7")
      StarFull(v-if="rating >= 2.8")
      StarEmpty(v-if="rating <= 3.4")
      StarHalf(v-if="rating >= 3.5 && rating <= 3.7")
      StarFull(v-if="rating >= 3.8")
      StarEmpty(v-if="rating <= 4.4")
      StarHalf(v-if="rating >= 4.5 && rating <= 4.7")
      StarFull(v-if="rating >= 4.8")
    .rating__reviews <strong>{{ numReviews }}</strong> reviews
</template>

<script>
import StarEmpty from "~/assets/i/svg/star-empty.svg?inline";
import StarFull from "~/assets/i/svg/star-full.svg?inline";
import StarHalf from "~/assets/i/svg/star-half-alt-solid.svg?inline";

export default {
  props: ['rating', 'numReviews'],
  components: {
    StarEmpty,
    StarFull,
    StarHalf
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/partials/variables";
.rating {
  display: flex;
  align-items: center;
  svg {
    width: 2rem;
    fill: $star;
  }
  &__stars {
    margin-right: 1rem;
  }
  &__reviews {
    font-size: 1.4rem;
  }
}
</style>
