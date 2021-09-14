<template lang="pug">
  .home
    .home__intro
      HomeIntro
    .home__solutions
      Solutions(:solutions="solutions" :tipos="tipos")
    .home__chi-siamo
      ChiSiamo
    .home__clients
      Clients(:clients="partners")
    .home__portfolio
      PortofolioSlider(:portfolio="portfolio")
    .home__contacts
      HomeContacts
</template>

<script>
import HomeIntro from "../components/Home/HomeIntro";
import Solutions from "../components/Home/Solutions";
import ChiSiamo from "../components/Home/ChiSiamo";
import Clients from "../components/Home/Clients";
import PortofolioSlider from "../components/Home/PortofolioSlider";
import HomeContacts from "../components/Home/HomeContacts";

export default {
  async asyncData({ $axios }) {
    const solutions = await $axios.$get(process.env.baseUrl + '/api/v1/solution');
    const tipos = await $axios.$get(process.env.baseUrl + '/api/v1/tipo');
    const partners = await $axios.$get(process.env.baseUrl + '/api/v1/partner');
    const portfolioSlider = await $axios.$get(process.env.baseUrl + '/api/v1/portfolio?show_in_slider=true');
    return {
      solutions: solutions.data,
      tipos: tipos.tipos,
      partners: partners,
      portfolio: portfolioSlider.data
    }
  },
  fetch({ store }) {
    const result = [];
    if (store.getters["solutions/getSolutions"].length === 0) {
      result.push(store.dispatch("solutions/fetchSolutions"));
    }
  },
  head: {
    title: "Home",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Content for home page"
      }
    ]
  },
  components: {
    HomeContacts,
    PortofolioSlider,
    Clients,
    ChiSiamo,
    Solutions,
    HomeIntro
  }
};
</script>

<style lang="scss">
.home {
  &__intro {
    position: relative;
    z-index: 1;
  }
  &__solutions {
    position: relative;
    z-index: 2;
  }
  &__chi-siamo {
    position: relative;
    z-index: 3;
  }
}
</style>
