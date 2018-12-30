import auth from '../api/auth'

import {
  REGISTER, REGISTER_RESET, ACTIVATE, ACTIVATE_RESET,
  ACTIVATION_BEGIN, ACTIVATION_CLEAR, ACTIVATION_FAILURE, ACTIVATION_SUCCESS,
  REGISTRATION_BEGIN, REGISTRATION_CLEAR, REGISTRATION_FAILURE, REGISTRATION_SUCCESS
} from './types'

function getInitialState () {
  return {
    activationCompleted: false,
    activationError: false,
    activationLoading: false,
    registrationCompleted: false,
    registrationError: false,
    registrationLoading: false,
    registerForm: {
      username: '',
      first_name: '',
      last_name: '',
      password1: '',
      password2: '',
      email: '',
      image: '',
    }
  }
}

const getters = {
  registerForm: state => state.registerForm,
  registrationCompleted: state => state.registrationCompleted,
  registrationLoading: state => state.registrationLoading
}

export const state = getInitialState()

const actions = {
  [REGISTER] ({commit, state}) {
    commit(REGISTRATION_BEGIN)
    return auth.createAccount(state.registerForm)
      .then(() => {
        commit(REGISTRATION_SUCCESS)
      }).catch((error) => {
        commit(REGISTRATION_FAILURE)
        throw error
      })
  },
  [ACTIVATE] ({commit}, {key}) {
    commit(ACTIVATION_BEGIN)
    return auth.verifyAccountEmail(key)
      .then(() => {
        commit(ACTIVATION_SUCCESS)
      }).catch((error) => {
        commit(ACTIVATION_FAILURE)
        throw error
      })
  },
  [REGISTER_RESET] ({commit}) {
    commit(REGISTRATION_CLEAR)
  },
  [ACTIVATE_RESET] ({commit}) {
    commit(ACTIVATION_CLEAR)
  }
}
const mutations = {
  [ACTIVATION_BEGIN] (state) {
    state.activationLoading = true
  },
  [ACTIVATION_CLEAR] (state) {
    state.activationCompleted = false
    state.activationError = false
    state.activationLoading = false
  },
  [ACTIVATION_FAILURE] (state) {
    state.activationError = true
    state.activationLoading = false
  },
  [ACTIVATION_SUCCESS] (state) {
    state.activationCompleted = true
    state.activationError = false
    state.activationLoading = false
  },
  [REGISTRATION_BEGIN] (state) {
    state.registrationLoading = true
  },
  [REGISTRATION_CLEAR] (state) {
    state.registrationCompleted = false
    state.registrationError = false
    state.registrationLoading = false
    state.registerForm = getInitialState().registerForm
  },
  [REGISTRATION_FAILURE] (state) {
    state.registrationError = true
    state.registrationLoading = false
  },
  [REGISTRATION_SUCCESS] (state) {
    state.registrationCompleted = true
    state.registrationError = false
    state.registrationLoading = false
    state.registerForm = getInitialState().registerForm
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
