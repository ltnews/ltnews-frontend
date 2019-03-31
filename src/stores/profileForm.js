import auth from '../api/auth'

import {
  PROFILE_PUT, PROFILE_OLD,
  RESET_STATE_PROFILE
} from './types'

const PROFILE_STORAGE_KEY = 'PROFILE_STORAGE_KEY'

function getInitialState () {
  return {
    profileForm: {}
  }
}

export const state = getInitialState()

const getters = {
  profileForm: state => state.profileForm
}

const actions = {
  [PROFILE_PUT] ({state}) {
    return auth.updateAccountDetails(state.profileForm)
      .catch((error) => {
        throw new error
      })
  },
  [PROFILE_OLD] ({commit}) {
    auth.getAccountDetails()
      .then(({data}) => {
        commit(RESET_STATE_PROFILE, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

const mutations = {
  [RESET_STATE_PROFILE] (state, profile) {
    state.profileForm = profile
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
