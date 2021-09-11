<template lang="pug">
  .portfolio-slider(v-animate="'fade'")
    .container
      header.portfolio-slider__header
        h2.portfolio-slider__title {{ portfolioSliderTitle }}
        .portfolio-slider__buttons
          button(@click="next" class="portfolio-slider__btn portfolio-slider__btn--next")
            svg(width='104' height='17' viewbox='0 0 104 17' fill='none' xmlns='http://www.w3.org/2000/svg')
              path(d='M0.905645 8.10936C0.518622 8.50335 0.524274 9.13649 0.918271 9.52352L7.33879 15.8304C7.73279 16.2174 8.36593 16.2118 8.75295 15.8178C9.13998 15.4238 9.13432 14.7906 8.74033 14.4036L3.0332 8.7975L8.63932 3.09037C9.02634 2.69637 9.02069 2.06323 8.62669 1.67621C8.2327 1.28919 7.59956 1.29484 7.21254 1.68883L0.905645 8.10936ZM103.067 6.90434L1.61011 7.81016L1.62797 9.81008L103.085 8.90426L103.067 6.90434Z')
          button(@click="prev"  class="portfolio-slider__btn portfolio-slider__btn--prev")
            svg(width='104' height='16' viewbox='0 0 104 16' fill='none' xmlns='http://www.w3.org/2000/svg')
              path(d='M103.071 8.15236C103.458 7.75837 103.452 7.12523 103.058 6.7382L96.6378 0.431312C96.2438 0.0442897 95.6106 0.0499425 95.2236 0.443938C94.8366 0.837933 94.8422 1.47107 95.2362 1.8581L100.943 7.46422L95.3372 13.1714C94.9502 13.5653 94.9559 14.1985 95.3499 14.5855C95.7439 14.9725 96.377 14.9669 96.764 14.5729L103.071 8.15236ZM0.909318 9.35738L102.366 8.45156L102.349 6.45163L0.891463 7.35746L0.909318 9.35738Z')
      Slick(v-if="portfolioSlider.length > 0" ref="slider" :arrows="false" :slidesToShow="3" :responsive="sliderResponsive")
        .portfolio-slider__item(v-for="(item) in portfolioSlider" :key="item.image" )
          nuxt-link( :to="localePath(`/portfolio/${item.slug}`)" class="portfolio-slider__link")
            img(:src="item.image" alt="")
            .portfolio-slider__content
              .portfolio-slider__svg(v-html="item.svg")
              h3.portfolio-slider__item-title(v-html="item.title")
</template>

<script>
import Slick from 'vue-slick-carousel';

export default {
  components: {
    Slick
  },
  computed: {
    portfolioSlider() {
      if (this.$i18n.locale === 'it') {
        return this.$store.getters["home/homePortfolio"];
      } else {
        return this.$store.getters["home/homePortfolioEn"];
      }
    },
    portfolioSliderTitle() {
      if (this.$i18n.locale === 'it') {
        return this.$store.getters["home/homePortfolioTitle"];
      } else {
        return this.$store.getters["home/homePortfolioTitleEn"];
      }
    },
    sliderResponsive() {
      return [
        {
          "breakpoint": 1500,
          "settings": {
            "slidesToShow": 3,
            "slidesToScroll": 3
          }
        },
        {
          "breakpoint": 1300,
          "settings": {
            "slidesToShow": 2,
            "slidesToScroll": 1
          }
        },
        {
          "breakpoint": 745,
          "settings": {
            "slidesToShow": 2,
            "slidesToScroll": 2
          }
        },
        {
          "breakpoint": 576,
          "settings": {
            "slidesToShow": 1,
            "slidesToScroll": 1
          }
        },
      ]
    }
  },
  methods: {
    next() {
      this.$refs.slider.prev();
    },
    prev() {
      this.$refs.slider.next();
    },
  }
}
</script>

<style lang="scss">
@import "assets/scss/partials/variables";
@import "vue-slick-carousel/dist/vue-slick-carousel.css";
@import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
.portfolio-slider {
  position: relative;
  padding: 9rem 0 12.5rem;
  .container {
    position: relative;
    z-index: 3;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 992px) {
      display: block;
    }
  }
  &__title {
    margin-bottom: 4rem;
    font-size: 4.9rem;
    font-weight: 800;
    color: $accent-light;
  }
  &__item {
    display: flex !important;
    justify-content: center;
    @media screen and (max-width: 1600px) {
      padding: 0 2rem;
    }
    &-title {
      font-size: 2.1rem;
      font-weight: normal;
      text-align: center;
      color: white;
      strong {
        font-weight: bold;
      }
    }
  }
  &__buttons {
    display: flex;
    @media screen and (max-width: 992px) {
      margin-bottom: 4rem;
    }
    button {
      position: relative;
      margin-left: 12rem;
      width: 7rem;
      height: 7rem;
      background-color: transparent;
      border: 1px solid $accent-light;
      border-radius: 50%;
      transition: all .4s;
      cursor: pointer;
      @media screen and (max-width: 992px) {
        margin-left: 0;
        margin-right: 20rem;
      }
      &:hover {
        background-color: $accent-light;
        svg {
          fill: white;
        }
      }
      &:first-of-type {
        svg {
          left: 1.6rem;
        }
      }
      &:last-of-type {
        @media screen and (max-width: 992px) {
          margin-right: 0;
        }
        svg {
          right: 1.6rem;
        }
      }
      svg {
        position: absolute;
        top: 39%;
        width: 11rem;
        height: 2rem;
        fill: $accent-light;
        @media screen and (max-width: 992px) {
          width: 14rem;
        }
      }
    }
  }
  &__link {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 42rem;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($accent-light, .85);
      z-index: 2;
      transition: all .3s;
      opacity: 0;
    }
    &:hover {
      &::before {
        opacity: 1;
      }
      .portfolio-slider__content {
        opacity: 1;
      }
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }
  }
  &__content {
    position: relative;
    opacity: 0;
    z-index: 3;
    transition: all .3s;
  }
}
</style>
