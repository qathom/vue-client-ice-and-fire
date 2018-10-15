import { isLogged } from '@/auth';

const defaultState = {
  isLogged: isLogged(),
};

const getters = {
  isLogged: state => state.isLogged,
};

const mutations = {
  SET_IS_LOGGED(state, logged) {
    state.isLogged = logged;
  },
};

const actions = {
  setIsLogged({ commit }, logged = false) {
    commit('SET_IS_LOGGED', logged);
  },
};

export default {
  state: defaultState,
  getters,
  mutations,
  actions,
};
