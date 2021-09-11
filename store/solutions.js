export function state() {
  return {
    solutions: []
  };
}

export const mutations = {
  setSolutions(state, solutions) {
    state.solutions = solutions;
  }
};

export const actions = {
  async fetchSolutions({ commit }) {
    try {
      const solutions = await this.$axios.$get(
        process.env.baseUrl + "/api/v1/solution"
      );
      commit("setSolutions", solutions);
    } catch (e) {
      console.log(e, "e");
    }
  }
};

export const getters = {
  getSolutions(state) {
    return state.solutions;
  },
  getOutsourcingSolutions(state) {
    return state.solutions.data.filter(item => item.tipo_id._id === "6101996a589ea41d5db4a89e").reverse();
  },
  getWebSolutions(state) {
    return state.solutions.data.filter(item => item.tipo_id._id === "6101977cb69bd71cc6aec2da").reverse();
  }
};
