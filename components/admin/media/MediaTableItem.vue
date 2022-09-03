<template>
  <tr>
    <td>{{ item.id }}</td>
    <td>
      <img :src="`${server_url}${item.url}`" width="100" height="100" alt="" />
    </td>
    <td>{{ item.name }}</td>
    <td>{{ formatDate(item.created_at) }}</td>
    <td>
      <button class="btn btn--danger" @click.prevent="deleteItem(item.id)">
        Delete
      </button>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };

      return new Intl.DateTimeFormat("en", options).format(new Date(date));
    },
    deleteItem(id) {
      this.$axios
        .delete(`/auth/media/${id}`)
        .then(() => {
          this.$emit("delete");
        })
        .catch((err) => {
          console.log(err.response, "err.response");
        });
    },
  },
  computed: {
    server_url() {
      return this.$store.state.server_url;
    },
  },
};
</script>
<style lang="scss"></style>
