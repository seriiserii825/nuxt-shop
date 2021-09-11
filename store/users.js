export const state = () => {
  return {
    users: []
  }
}

export const mutations = {
  setUser(state, users) {
    state.users = users
  }
}

export const actions = {
  async fetchUsers({ commit }) {
    try {
      const users = await this.$axios.$get('https://jsonplaceholder.typicode.com/users');
      commit('setUser', users);
    } catch (e) {
      throw e
    }
  },
  async fetchUserById({}, payload) {
    try {
      return await this.$axios.$get('https://jsonplaceholder.typicode.com/users/' + payload)
    } catch (e) {
      throw e
    }
  },
}

export const getters = {
  users(state) {
    return state.users;
  }
}