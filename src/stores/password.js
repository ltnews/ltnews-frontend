import auth from '../api/auth'

import {
  PASSWORD_NEW, PASSWORD_NEW_RESET, PASSWORD_EMAIL, PASSWORD_EMAIL_RESET,
  PASSWORD_RESET_BEGIN, PASSWORD_RESET_CLEAR, PASSWORD_RESET_FAILURE, PASSWORD_RESET_SUCCESS,
  PASSWORD_EMAIL_BEGIN, PASSWORD_EMAIL_CLEAR, PASSWORD_EMAIL_FAILURE, PASSWORD_EMAIL_SUCCESS
} from './types'

function getInitialState () {
  return {
    emailCompleted: false,
    emailError: false,
    emailLoading: false,
    resetCompleted: false,
    resetError: false,
    resetLoading: false,
    emailForm: {
      email: ''
    }
  }
}

const getters = {
  passwordEmailCompleted: state => state.emailCompleted,
  passwordEmailError: state => state.emailError,
  passwordEmailLoading: state => state.emailLoading,
  passwordEmailForm: state => state.emailForm
}

const state = getInitialState()

const actions = {
  [PASSWORD_NEW] ({commit}, {uid, token, password1, password2}) {
    commit(PASSWORD_RESET_BEGIN)
    return auth.resetAccountPassword(uid, token, password1, password2)
      .then(() => {
        commit(PASSWORD_RESET_SUCCESS)
      }).catch((error) => {
        commit(PASSWORD_RESET_FAILURE)
        throw error
      })
  },
  [PASSWORD_EMAIL] ({commit, state}) {
    commit(PASSWORD_EMAIL_BEGIN)
    return auth.sendAccountPasswordResetEmail(state.emailForm.email)
      .then(() => {
        commit(PASSWORD_EMAIL_SUCCESS)
      }).catch((error) => {
        commit(PASSWORD_EMAIL_FAILURE)
        throw error
      })
  },
  [PASSWORD_NEW_RESET] ({commit}) {
    commit(PASSWORD_RESET_CLEAR)
  },
  [PASSWORD_EMAIL_RESET] ({commit}) {
    commit(PASSWORD_EMAIL_CLEAR)
  }
}

const mutations = {
  [PASSWORD_RESET_BEGIN] (state) {
    state.resetLoading = true
  },
  [PASSWORD_RESET_CLEAR] (state) {
    state.resetCompleted = false
    state.resetError = false
    state.resetLoading = false
  },
  [PASSWORD_RESET_FAILURE] (state) {
    state.resetError = true
    state.resetLoading = false
  },
  [PASSWORD_RESET_SUCCESS] (state) {
    state.resetCompleted = true
    state.resetError = false
    state.resetLoading = false
  },
  [PASSWORD_EMAIL_BEGIN] (state) {
    state.emailLoading = true
  },
  [PASSWORD_EMAIL_CLEAR] (state) {
    state.emailCompleted = false
    state.emailError = false
    state.emailLoading = false
    state.emailForm = getInitialState().emailForm
  },
  [PASSWORD_EMAIL_FAILURE] (state) {
    state.emailError = true
    state.emailLoading = false
  },
  [PASSWORD_EMAIL_SUCCESS] (state) {
    state.emailCompleted = true
    state.emailError = false
    state.emailLoading = false
    state.emailForm = getInitialState().emailForm
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

