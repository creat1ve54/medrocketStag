import { personalsAPI } from "../api/axios";


const state = {
  personals: [],
  isLoading: false,
  isError: false,
};

const mutations = {
  setPersonal(state, personals) {
    state.personals = personals;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setError(state, isError) {
    state.isError = isError;
  },
};

const actions = {
  async getPersonals({commit}) {
    await personalsAPI.getPersonal().then(({data})=>{
      commit('setPersonal', data)
    })
  }
};

const getters = {
  getPersonalById: (state) => (id) => {
    return state.personals.find(item => item.id == id)
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};