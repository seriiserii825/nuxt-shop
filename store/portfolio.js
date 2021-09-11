export const state = () => {
  return {
    portfolio: [],
    portfolioEn: [],
  }
}

export const mutations = {
  setPortfolio(state, portfolio) {
    state.portfolio = portfolio;
  },
  setPortfolioEn(state, portfolio) {
    state.portfolioEn = portfolio;
  },
}

export const actions = {
  async fetchPortfolio({ commit }) {
    try {
      const portfolio = await this.$axios.$get(process.env.WP_URL + '/wp-json/wp/v2/portfolio');
      const portfolioEn = await this.$axios.$get(process.env.WP_URL + '/en/wp-json/wp/v2/portfolio');
      commit('setPortfolio', portfolio);
      // console.log(portfolio, 'portfolio')
      commit('setPortfolioEn', portfolioEn);
    } catch (e) {
      console.log(e, 'e')
    }
    
  }
}

export const getters = {
  getPortfolio(state) {
    return state.portfolio;
  },
  getPortfolioEn(state) {
    return state.portfolioEn;
  },
}
