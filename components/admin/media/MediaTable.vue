<template>
  <div class="media-table">
    <header class="media__header">
      <input type="text" v-model="search" placeholder="Search..."/>
    </header>
    <div class="media-table__body">
      <table>
        <tbody>
        <MediaTableItem
            v-for="item in data"
            :key="item.id"
            :item="item"
            @delete="onDelete"
        ></MediaTableItem>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import MediaTableItem from "./MediaTableItem";

export default {
  components: {MediaTableItem},
  data() {
    return {
      search: "",
      data: "",
    };
  },
  methods: {
    getData() {
      this.$axios
          .get("/auth/media?search=" + this.search)
          .then((res) => {
            this.data = res.data.data;
          })
          .catch((err) => {
            console.log(err.response, "err.response");
          });
    },
    onDelete() {
      this.getData();
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style lang="scss"></style>
