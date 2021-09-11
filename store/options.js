export const state = () => {
  return {
    acf: []
  }
}

export const mutations = {
  setOptions(state, acf) {
    state.acf = acf;
  }
}

export const actions = {
  async fetchOptions({ commit }) {
    try {
      const acf = await this.$axios.$get(process.env.WP_URL + '/wp-json/acf/v3/options/options');
      // console.log(acf, 'acf')
      commit('setOptions', acf)
    } catch (e) {
      console.log(e, 'e')
    }
  }
}

export const getters = {
  getOptions(state) {
    return state.acf;
  },
  homeOptions(state) {
    const { email, facebook, linkedin, phone } = state.acf.acf;
    return { email, facebook, linkedin, phone }
  }
}
