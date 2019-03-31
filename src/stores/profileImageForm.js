import api from '../api/api'

import {
  PROFILE_IMAGE_PUT, PROFILE_IMAGE_OLD,
  RESET_STATE_PROFILE_IMAGE
} from './types'

function getInitialState () {
  return {
    profileForm: {}
  }
}

export const state = getInitialState()

const getters = {
  profileImageForm: state => state.profileForm
}

const actions = {
  [PROFILE_IMAGE_PUT] ({state}) {
    return api.profile_put(state.profileForm)
      .catch((error) => {
        throw new error
      })
  },
  [PROFILE_IMAGE_OLD] ({commit}) {
    api.profile_get_one()
      .then(({data}) => {
        commit(RESET_STATE_PROFILE_IMAGE, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}

const mutations = {
  [RESET_STATE_PROFILE_IMAGE] (state, profile) {
    state.profileForm = profile
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
