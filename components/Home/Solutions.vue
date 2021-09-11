<template lang="pug">
  .solutions
    .solutions__nav
      .container
        header.solutions-header
          .solutions-header__item(v-for="({_id, title_it, title_en}, index) in tipos" :key="_id" @click="setCurrent(index)" :class="{'active': current === 1}")
            h3(:key="1" v-if="$i18n.locale === 'it'") {{ title_it }}
            h3(:key="2" v-else) {{ title_en }}
    .solutions-body( :class="{'active': current === 1}")
      .container
        .solutions__title
        .solutions__text
        .solutions__wrap
          .solutions-item(v-for="(item, index) in filteredSolutions" :key="item._id" v-animate="'fade'" :style="`transition-delay:0.${index + 1}s`")
            .solutions-item__img
              img(:src="'/uploads/'+item.image_small")
            .solutions-item__content
              .solutions-item__header
                h2.solutions-item__title {{ item['title_'+$i18n.locale] }}
                  .solutions-item__logos
              .solutions-item__text(v-html="item['excerpt_'+$i18n.locale]")
            footer.solutions-item__footer
              nuxt-link.btn(:to="localePath(`/soluzioni/${item['slug_'+$i18n.locale]}`)") {{ $t('btn') }}
</template>

<script>
export default {
  props: ['solutions', 'tipos'],
  data() {
    return {
      current: 0,
      filteredSolutions: []
    }
  },
  methods: {
    setCurrent(index) {
      this.current = index;
      this.setFilteredSolutions();
    },
    setFilteredSolutions() {
      const tipoId = this.tipos[this.current]._id;
      this.filteredSolutions = this.solutions.filter(solution => solution.tipo_id._id === tipoId);
    }
  },
  computed: {
    getOutsourcingSolutions() {
      return this.solutions.filter(solution => solution.tipo_id._id === "6101996a589ea41d5db4a89e");
    },
    getWebSolutions() {
      return this.solutions.filter(solution => solution.tipo_id._id === "6101977cb69bd71cc6aec2da");
    }
  },
  mounted() {
    this.setFilteredSolutions();
    // console.log(this.tipos, 'this.tipos')
  }
}
</script>

<style lang="scss">
@import "assets/scss/partials/variables";
.solutions {
  &__nav {
    position: relative;
    margin-top: -7rem;
    margin-bottom: -1px;
    z-index: 3;
    @media screen and (max-width: 576px) {
      margin-top: 0;
      padding-top: 3rem;
      background-color: #1467a4;
    }
  }
  &-header {
    display: flex;
    @media screen and (max-width: 576px) {
      display: block;
    }
    &__item {
      padding: 2rem 15.4rem;
      color: white;
      background: transparent;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      border: 1px solid white;
      border-bottom-color: transparent;
      transition: all .4s;
      @media screen and (max-width: 992px) {
        margin-right: 2%;
        padding: 1.5rem 2rem;
      }
      @media screen and (max-width: 576px) {
        border-radius: 0;
        margin-right: 0;
        width: 100%;
        text-align: center;
        border-bottom-color: white;
      }
      &:hover {
        background-color: #1467a4;
        cursor: pointer;
      }
      &:first-of-type {
        margin-right: 2.2rem;
        background-color: #1467a4;
      }
      &:last-of-type {
        padding: 2rem 7.3rem;
        background-color: #0697d4;
        @media screen and (max-width: 992px) {
          padding: 1.5rem 2rem;
        }
      }
      &.active {
        &:first-of-type {
          background-color: #1467a4;
          border-bottom-color: #1467a4;
          @media screen and (max-width: 576px) {
            color: #1467a4;
            background-color: white;
          }
        }
        &:last-of-type {
          background-color: #0697d4;
          border-bottom-color: #0697d4;
          @media screen and (max-width: 576px) {
            color: #0697d4;
            background-color: white;
          }
        }
      }
      h3 {
        letter-spacing: 0.27rem;
      }
    }
  }
  &-body {
    position: relative;
    padding-top: 7.5rem;
    padding-bottom: 2.9rem;
    color: white;
    background-color: #1467a4;
    border-top: 1px solid white;
    transition: all .4s;
    z-index: 2;
    &.active {
      background-color: #0697d4;
      .btn {
        background-color: $accent-dark;
        &:hover {
          background-color: darken($accent-dark, 10%);
        }
      }
    }
  }
  &__title {
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: bold;
    letter-spacing: 0.03rem;
  }
  &__text {
    margin-bottom: 8rem;
    max-width: 93rem;
    font-size: 1.7rem;
    letter-spacing: 0.12rem;
  }
  &__wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @media screen and (max-width: 576px) {
      display: block;
    }
  }
  &-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 7.6rem;
    width: 31.7%;
    @media screen and (max-width: 992px) {
      width: 46%;
    }
    @media screen and (max-width: 576px) {
      width: auto;
    }
    &__img {
      position: relative;
      margin-bottom: 3.7rem;
      height: 28rem;
      overflow: hidden;
      &:hover {
        img {
          transform: scale(1.2);
        }
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 1s;
        will-change: transform;
        backface-visibility: hidden;
      }
    }
    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 3.7rem;
      img {
        margin-top: 1rem;
        margin-right: 1.2rem;
      }
    }
    &__title {
      margin-right: 1.4rem;
      font-size: 3.5rem;
      font-weight: bold;
      letter-spacing: 0.1rem;
    }
    &__content {
      margin-bottom: 2.2rem;
    }
    &__text {
      font-size: 1.9rem;
      p {
        margin-bottom: 3.2rem;
        line-height: 1.5;
        &:last-of-type {
          font-size: 1.7rem;
          line-height: 1.8;
        }
      }
    }
    &__footer {
      margin-top: auto;
    }
  }
}
</style>
