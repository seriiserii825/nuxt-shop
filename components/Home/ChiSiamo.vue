<template lang="pug">
  .chi-siamo( v-animate="'fade'")
    .chi-siamo__line
    .chi-siamo__triangle
    .chi-siamo__content
      nuxt-link(:to="localePath('/chi-siamo')" class="chi-siamo__link")
        span {{ $t('pages.about') }}
        svg(width='16' height='103' viewbox='0 0 16 103' fill='none' xmlns='http://www.w3.org/2000/svg')
          path(d='M6.95109 102.379C7.34162 102.77 7.97478 102.77 8.36531 102.379L14.7293 96.015C15.1198 95.6245 15.1198 94.9913 14.7293 94.6008C14.3387 94.2103 13.7056 94.2103 13.3151 94.6008L7.6582 100.258L2.00134 94.6008C1.61082 94.2103 0.977656 94.2103 0.587131 94.6008C0.196607 94.9913 0.196607 95.6245 0.587131 96.015L6.95109 102.379ZM6.6582 0.210693L6.6582 101.672L8.6582 101.672L8.6582 0.210693L6.6582 0.210693Z')
      .container
        ul
          li(v-for="(item, index) in chiSiamo" :key="item.id")
            h3(v-html="item.title")
            .chi-siamo__text(v-html="item.text")
            nuxt-link(v-if="index === 0" class="btn" :to="localePath('/chi-siamo')") {{ $t('btn') }}
    img(src="/images/chi-siamo-bg.jpg" alt="" class="chi-siamo__bg")

</template>

<script>
import { chiSiamoIt, chiSiamoEn } from "../../data-static/chi-siamo";

export default {
  data() {
    return {
      chiSiamo: []
    }
  },
  mounted() {
    this.chiSiamo = this.$i18n.locale === 'it' ? chiSiamoIt : chiSiamoEn;
  }
}
</script>

<style lang="scss">
@import "assets/scss/partials/variables";
.chi-siamo {
  position: relative;
  padding-top: 14.4rem;
  padding-bottom: 16.5rem;
  @media screen and (max-width: 992px) {
    padding-top: 6rem;
    padding-bottom: 0;
  }
  &.animate-active {
    ul {
      li {
        &::before {
          background-color: $accent;
        }
      }
    }
    .chi-siamo__line {
      background-color: #edf2f3;
    }
  }
  &__content {
    position: relative;
    z-index: 3;
  }
  &__line {
    position: absolute;
    top: 30.1%;
    left: -9%;
    width: 116%;
    height: 2px;
    transform-origin: center;
    transform: rotate(149.8deg);
    background-color: transparent;
    transition: all 1s;
    transition-delay: 1s;
    z-index: 2;
    @media screen and (max-width: 1900px) {
      display: none;
    }
  }
  &__triangle {
    position: absolute;
    top: -139px;
    right: 0;
    width: 24rem;
    height: 14rem;
    background-color: white;
    clip-path: polygon(100% 0, 0 100%, 100% 100%);
    @media screen and (max-width: 1300px) {
      display: none;
    }
  }
  &__bg {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 75.1rem;
    z-index: 1;
    @media screen and (max-width: 992px) {
      display: none;
    }
  }
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @media screen and (max-width: 576px) {
      display: block;
    }
    li {
      position: relative;
      padding-top: 6.4rem;
      width: 30%;
      @media screen and (max-width: 992px) {
        padding-top: 0;
        width: 48%;
      }
      @media screen and (max-width: 576px) {
        width: auto;
      }
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        //background-color: $accent;
        background-color: #ccc;
        transition: all .8s;
        transition-delay: 1s;
        z-index: 2;
        @media screen and (max-width: 992px) {
          display: none;
        }
      }
      &::after {
        content: '';
        position: absolute;
        top: -0.9rem;
        left: -1.4rem;
        width: 4rem;
        height: 4rem;
        background-color: #fff;
        z-index: 1;
        @media screen and (max-width: 992px) {
          display: none;
        }
      }
      &:first-of-type {
        margin-bottom: 40.5rem;
        padding-top: 0;
        width: 31.5%;
        @media screen and (max-width: 992px) {
          margin-bottom: 3rem;
          width: 48%;
        }
        @media screen and (max-width: 576px) {
          margin-bottom: 6rem;
          width: auto;
        }
        &::before {
          display: none;
        }
        &::after {
          display: none;
        }
        h3 {
          margin-bottom: 1.3rem;
          font-size: 4.9rem;
          font-weight: 800;
          @media screen and (max-width: 992px) {
            font-size: 4rem;
          }
          strong {
            display: block;
            font-weight: 800;
            color: $accent-light;
          }
        }
        .chi-siamo__text {
          font-size: 2.2rem;
          p {
            letter-spacing: 0.04rem;
          }
        }
      }
      &:nth-of-type(2) {
        margin-top: 40rem;
        width: 33.3%;
        @media screen and (max-width: 992px) {
          margin-top: 0;
          width: 48%;
        }
        @media screen and (max-width: 576px) {
          width: auto;
        }
        &::before {
          top: 10px;
        }
      }
      h3 {
        margin-bottom: 2.9rem;
        font-size: 4rem;
        letter-spacing: 0.1rem;
        color: $accent-dark;
      }
      &:nth-of-type(3) {
        top: -1.8rem;
        left: -2.6rem;
        margin-top: 10rem;
        @media screen and (max-width: 992px) {
          margin-top: 0;
          top: 0;
          left: 0;
        }
        @media screen and (max-width: 576px) {
          width: auto;
        }
        &::before {
          top: 5px;
        }
      }
      &:nth-of-type(4) {
        top: -3rem;
        @media screen and (max-width: 992px) {
          top: 0;
        }
        &::before {
          top: 9px;
        }
      }
    }
  }
  &__text {
    margin-bottom: 6rem;
    line-height: 1.5;
  }
  .btn {
    font-size: 1.6rem;
    font-weight: bold;
    text-transform: uppercase;
    padding: 2rem 5.8rem;
    letter-spacing: 0.8px;
  }
  &__link {
    position: absolute;
    top: -10.6rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 23.6rem;
    height: 23.6rem;
    border-radius: 50%;
    border: 1px solid $accent;
    transition: all .6s;
    @media screen and (max-width: 992px) {
      display: none;
    }
    &:hover {
      background-color: $accent;
      span {
        color: white;
      }
      svg {
        fill: white;
      }
    }
    span {
      margin-top: 5rem;
      font-size: 1.4rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
      color: $accent;
    }
    svg {
      position: absolute;
      top: -3.9rem;
      left: 50%;
      transform: translateX(-50%);
      fill: $accent;
      width: 2rem;
      height: 10rem;
      transition: all .8s;
    }
  }
}
</style>
