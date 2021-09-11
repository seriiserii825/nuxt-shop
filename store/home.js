export function state() {
  return {
    home: [],
    homeEn: [],
    homePortfolio: [],
    homePortfolioEn: [],
  }
}

export const mutations = {
  setHome(state, home) {
    state.home = home;
  },
  setHomeEn(state, home) {
    state.homeEn = home;
  },
  setHomePortfolio(state, payload) {
    state.homePortfolio = payload;
  },
  setHomePortfolioEn(state, payload) {
    state.homePortfolioEn = payload;
  },
}

export const actions = {
  async fetchHome({ commit }) {
    try {
      const home = await this.$axios.$get(process.env.WP_URL + '/wp-json/wp/v2/pages/10');
      const homeEn = await this.$axios.$get(process.env.WP_URL + '/en/wp-json/wp/v2/pages/10');
      const homePortfolio = await this.$axios.$get(process.env.WP_URL + '/wp-json/portfolio/v1/search');
      const homePortfolioEn = await this.$axios.$get(process.env.WP_URL + '/en/wp-json/portfolio/v1/search');

      commit('setHomePortfolio', homePortfolio);
      commit('setHomePortfolioEn', homePortfolioEn);
      commit('setHome', home);
      commit('setHomeEn', homeEn);

    } catch (e) {
      console.log(e, 'e')
    }
  }
}

export const getters = {
  home(state) {
    return state.home;
  },
  homeIntro(state) {
    console.log(state.home, 'state.home getters')
    return state.home;
  },
  homeEn(state) {
    return state.homeEn;
  },
  homeIntroEn(state) {
    return state.homeEn.acf.intro;
  },
  solutions(state) {
    return state.home.acf;
  },
  solutionsEn(state) {
    return state.homeEn.acf;
  },
  chiSiamo(state) {
    return state.home.acf.chi_siamo;
  },
  chiSiamoEn(state) {
    return state.homeEn.acf.chi_siamo;
  },
  clientsTitle(state) {
    return state.home.acf.clients_title;
  },
  clients(state) {
    return state.home.acf.clients;
  },
  homePortfolioTitle(state) {
    return state.home.acf.portfolio_title;
  },
  homePortfolioTitleEn(state) {
    return state.homeEn.acf.portfolio_title;
  },
  homePortfolio(state) {
    return state.homePortfolio;
  },
  homePortfolioEn(state) {
    return state.homePortfolioEn;
  },
  homeContacts(state) {
    return state.home.acf.home_contacts;
  },
  homeContactsEn(state) {
    return state.homeEn.acf.home_contacts;
  },
}
