import auth from '../api/auth'
import session from '../api/session'
import store from '../store'

import {
  LOGIN, LOGIN_INIT, LOGOUT,
  PROFILE_GET_ONE, PROFILE_INIT, PROFILE_RESET,
  LOGIN_BEGIN, LOGIN_FAILURE, LOGIN_END, REMOVE_TOKEN, SET_TOKEN
} from './types'

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY'

function getInitialState () {
  return {
    authenticating: false,
    error: false,
    token: null,
    loginForm: {
      username: '',
      password: ''
    }
  }
}

export const state = getInitialState()

const getters = {
  isAuthenticated: state => !!state.token,
  loginForm: state => state.loginForm
}

const actions = {
  [LOGIN] ({commit, state}) {
    commit(LOGIN_BEGIN)
    return auth.login(state.loginForm)
      .then(({data}) => {
        commit(SET_TOKEN, data.key)
        commit(LOGIN_END)
        store.dispatch(PROFILE_GET_ONE)
          .catch((error) => {
            throw error
          })
      }).catch((error) => {
        commit(LOGIN_FAILURE)
        throw error
      })
  },
  [LOGOUT] ({commit}) {
    return auth.logout()
      .then(() => commit(LOGIN_END))
      .then(() => store.dispatch(PROFILE_RESET))
      .finally(() => commit(REMOVE_TOKEN))
  },
  [LOGIN_INIT] ({commit}) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)

    if (token) {
      commit(SET_TOKEN, token)
    } else {
      commit(REMOVE_TOKEN)
    }

    store.dispatch(PROFILE_INIT)
      .catch((error) => {
        throw error
      })
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
  [LOGIN_END] (state) {
    let initial = getInitialState()
    state.authenticating = initial.authenticating
    state.error = initial.error
    state.loginForm = initial.loginForm
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
  state,
  getters,
  actions,
  mutations
}
