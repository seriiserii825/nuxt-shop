<template>
  <li class="admin-menu-item">
    <header class="admin-menu-item__header">
      <div class="admin-menu-item__icon">
        <img :src="icon" :width="20" :height="20" alt="" />
      </div>
      <nuxt-link v-if="url" :to="url">
        {{ label }}
      </nuxt-link>
      <div v-else @click="toggleActive" class="admin-menu-item__title">
        <span>{{ label }}</span>
      </div>

      <div
        v-if="!url"
        class="admin-menu-item__right"
        :class="{ 'admin-menu-item__right--active': isActive }"
      >
        <img src="/svg/chevron-left.svg" :width="20" :height="16" alt="" />
      </div>
    </header>

    <div v-if="items && items.length" class="admin-menu-item__body">
      <ul v-if="isActive" class="admin-submenu">
        <li
          class="admin-submenu__item"
          :class="{ active: isActive }"
          v-for="(item, index) in items"
          :key="index"
        >
          <div class="admin-submenu__icon">
            <img src="/svg/file-minus.svg" :width="14" :height="20" alt="" />
          </div>
          <nuxt-link v-if="index === 0" :to="item.url">Add item</nuxt-link>
          <nuxt-link v-else-if="index === 1" :to="item.url"
            >View list</nuxt-link
          >
        </li>
      </ul>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
  },
  created() {
    if (this.items && this.items.length) {
      this.isActive = this.items.some((item) => item.url === this.$route.path);
    }else{
      this.isActive = false;
    }
  },
};
</script>
<style lang="scss"></style>
