<template lang="pug">
  .autocomplete(v-click-outside="hideList")
    .autocomplete__input
      input(type="text", v-model="search", @input="searchHandler", @focus="searchFocus", placeholder="Search...")
      .autocomplete__selected.selected-autocomplete
        .selected-autocomplete__item(v-for="item in selected", :key="item.id")
          .selected-autocomplete__title {{ item.title }}
          .selected-autocomplete__remove(@click="removeHandler(item)") x
    .autocomplete__list(v-if="show_list")
      .autocomplete__item(v-for="item in items", :key="item.id", @click="selectHandler(item)")
        | {{ item.title }}
</template>
<script>
import ClickOutside from 'vue-click-outside';

export default {
  props: {
    url: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      search: "",
      show_list: false,
      items: [],
      selected: []
    }
  },
  methods: {
    searchFocus() {
      this.show_list = this.items.length > 0;
    },
    removeHandler(item) {
      this.selected = this.selected.filter(i => i.id !== item.id)
    },
    hideList(){
      this.show_list = false;
    },
    searchHandler() {
      this.$axios
          .get(this.url + this.search)
          .then(res => {
            this.items = res.data.data.filter(item => {
              return !this.selected.find(el => el.id === item.id)
            })
            this.show_list = this.items.length > 0;
            // this.$emit("on-search", res.data);
          })
          .catch(err => {
            console.log(err);
          });
    },
    selectHandler(item) {
      this.selected.push(item);
      this.$emit("on-select", this.selected);
      this.items = this.items.filter(el => el.id !== item.id);
      this.show_list = this.items.length > 0;
    }
  },
  directives: {
    ClickOutside
  }
}
</script>
<style lang="scss">
</style>
