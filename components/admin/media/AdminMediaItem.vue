<template>
  <div :class="{ active: isActive }" class="media__item" @click="toggleActive">
    <img :src="full_url" width="100" height="100" alt="image" />
    <h4 class="media__title">{{ item.name }}</h4>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleActive() {
      if (this.isActive) {
        this.isActive = false;
        this.$emit("on-choose", this.item.url);
      } else {
        this.isActive = true;
        this.$emit("on-choose", this.item.url);
      }
    },
  },
  computed: {
    full_url() {
      return this.$store.state.server_url + this.item.url;
    },
  },
  created() {
    console.log(this.full_url, "this.item.full_url");
  },
};
</script>
