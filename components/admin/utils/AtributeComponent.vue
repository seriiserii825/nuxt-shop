<template lang="pug">
.attribute-component
  header.attribute-component__tabs
    .attribute-component__tab(
      v-for="(item, index) in attributes",
      :key="index",
      :class="{ 'attribute-component__tab--active': activeTab === index }",
      @click="activeTab = index"
    ) {{ item.title }}
  .attribute-component__body
    .attribute-component__item(
      v-for="(item, index) in attributes",
      :key="index",
      :class="{ 'attribute-component__item--active': activeTab === index }"
    )
      ul
        li(@click="uncheck(item.title)") Uncheck
        li(v-for="(value, index) in item.values", :key="index")
          input(
            type="radio",
            :id="value.id",
            :name="value.title",
            :value="value.id",
            v-model="values[item.title]",
            @change="changeHandler({ title: item.title, value: value.id })"
          )
          label(:for="value.id") {{ value.title }}
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    attrs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      attributes: [],
      activeTab: 0,
      values: {},
      result: {},
    };
  },
  methods: {
    uncheck(title) {
      this.values[title] = false;
      delete this.result[title];
    },
    changeHandler(data) {
      this.result[data.title] = data.value;
      this.$emit("on-change", this.result);
    },
    getAttributes() {
      this.$axios.get(this.url).then((res) => {
        this.attributes = res.data.data;
        this.values = this.attributes.map((item) => item.title);
      });
    },
  },
  created() {
    this.getAttributes();
  },
};
</script>
