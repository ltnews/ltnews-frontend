import auth from '../api/auth'
import session from '../api/session'
import store from '@/store'

import {
  PROFILE_GET_ONE, PROFILE_INIT, PROFILE_RESET,
  LOGIN_BEGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REMOVE_TOKEN, SET_TOKEN
} from './types'

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY'

const initialState = {
  authenticating: false,
  error: false,
  token: null
}

const getters = {
  isAuthenticated: state => !!state.token
}

const actions = {
  login ({commit}, {username, password}) {
    commit(LOGIN_BEGIN)
    return auth.login(username, password)
      .then(({data}) => {
        commit(SET_TOKEN, data.key)
        commit(LOGIN_SUCCESS)
        store.dispatch(PROFILE_GET_ONE)
      }).catch((error) => {
        commit(LOGIN_FAILURE)
        throw error
      })
  },
  logout ({commit}) {
    return auth.logout()
      .then(() => commit(LOGOUT))
      .then(() => store.dispatch(PROFILE_RESET))
      .finally(() => commit(REMOVE_TOKEN))
  },
  initialize ({commit}) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)

    if (token) {
      commit(SET_TOKEN, token)
    } else {
      commit(REMOVE_TOKEN)
    }

    store.dispatch(PROFILE_INIT)
  }
}

const mutations = {
  [LOGIN_BEGIN] (state) {
    state.authenticating = true
    state.error = false
  },
  [LOGIN_FAILURE] (state) {
    state.authenticating = false
    state.error = true
  },
  [LOGIN_SUCCESS] (state) {
    state.authenticating = false
    state.error = false
  },
  [LOGOUT] (state) {
    state.authenticating = false
    state.error = false
  },
  [SET_TOKEN] (state, token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    session.defaults.headers.Authorization = `Token ${token}`
    state.token = token
  },
  [REMOVE_TOKEN] (state) {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    delete session.defaults.headers.Authorization
    state.token = null
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
