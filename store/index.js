export const state = () => {
  return {
    media: []
  }
}

export const mutations = {
  setMedia(state, media) {
    state.media = media
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const media = await this.$axios.$get(process.env.baseUrl + '/api/v1/media')
    commit('setMedia', media);
  }
}

export const getters = {
  media(state) {
    return state.media;
  }
}
