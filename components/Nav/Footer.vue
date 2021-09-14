<template lang="pug">
  footer.main-footer
    .main-footer__top
      ul.main-footer__list
        li
          nuxt-link(:to="localePath('/')") {{ $t('pages.home') }}
        li
          nuxt-link(:to="localePath('/chi-siamo')") {{ $t('pages.about') }}
        li
          nuxt-link(:to="localePath('/portfolio')") {{ $t('pages.portfolio') }}
        li
          nuxt-link(:to="localePath('/clienti')") {{ $t('pages.clients') }}
        li
          nuxt-link(:to="localePath('/contatti')") {{ $t('pages.contacts') }}
        li
          nuxt-link(:to="switchLocalePath('it')") Italiano
        li
          nuxt-link(:to="switchLocalePath('en')") English

      ul.main-footer__list
        li {{ $t('pages.webAndDigital') }}
        li(v-for="item in getWebSolutions" :key="item._id")
          nuxt-link(:to="localePath(`/soluzioni/${item['slug_'+$i18n.locale]}`)") {{ item['title_'+$i18n.locale] }}

      ul.main-footer__list
        li {{ $t('pages.outsourcingFooter') }}
        li(v-for="item in getOutsourcingSolutions" :key="item._id")
          nuxt-link(:to="localePath(`/soluzioni/${item['slug_'+$i18n.locale]}`)") {{ item['title_'+$i18n.locale] }}
    .main-footer__bottom
      .main-footer__privacy {{ `Copyright 2021 ${contacts.companyName}  Partita Iva : ${contacts.partitaIva}` }}
        nuxt-link(:to="localePath('/privacy-policy')" target="_blank") Privacy and Cookie policy
</template>

<script>
import contacts from "../../data-static/contacts";

export default {
  data() {
    return {
      contacts: contacts
    }
  },
  computed: {
    getWebSolutions() {
      return this.$store.getters['solutions/getWebSolutions'];
    },
    getOutsourcingSolutions() {
      return this.$store.getters['solutions/getOutsourcingSolutions'];
    },
  }
}
</script>

<style lang="scss">
@import "assets/scss/partials/variables";
.main-footer {
  padding: 4.1rem 14.2rem 6rem;
  color: $accent;
  background: url("/footer-bg.jpg") no-repeat right;
  @media screen and (max-width: 1200px) {
    padding: 6rem 3rem;
  }
  &__top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3.3rem;
    @media screen and (max-width: 992px) {
      flex-wrap: wrap;
    }
    @media screen and (max-width: 576px) {
      display: block;
    }
  }
}
.main-footer__list {
  width: 31.7%;
  @media screen and (max-width: 992px) {
    margin-bottom: 4rem;
    width: 50%;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
    text-align: center;
  }
  li,
  a {
    letter-spacing: 0.03rem;
    font-size: 1.4rem;
  }
  li {
    margin-bottom: 0.8rem;
    &:first-of-type {
      margin-bottom: 0.9rem;
      font-weight: bold;
    }
  }
  a {
    color: $accent;
    transition: all .4s;
    &:hover {
      color: darken($accent-dark, 5%);
    }
  }
}
.main-footer__bottom {
  font-size: 1.2rem;
  letter-spacing: 0.04rem;
  @media screen and (max-width: 576px) {
    text-align: center;
  }
  a {
    margin-left: 0.4rem;
    color: $accent-light;
  }
}
.main-footer__privacy {
  color: $accent-dark;
}
</style>
