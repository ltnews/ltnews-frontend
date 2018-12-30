import Vue from 'vue'
import api from '../api/api'

import {
  PROFILE_GET_ONE, PROFILE_INIT, PROFILE_RESET,
  SET_PROFILE, REMOVE_PROFILE
} from './types'

const PROFILE_STORAGE_KEY = 'PROFILE_STORAGE_KEY'

function getInitialState () {
  return {
    profile: {}
  }
}

export const state = getInitialState()

const getters = {
  getProfile: state => state.profile
}

const actions = {
  [PROFILE_GET_ONE] (context) {
    return api.profile_get_one()
      .then(({data}) => {
        context.commit(SET_PROFILE, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [PROFILE_RESET] ({commit}) {
    commit(REMOVE_PROFILE)
  },
  [PROFILE_INIT] ({commit}) {
    const profile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY))

    if (profile) {
      commit(SET_PROFILE, profile)
    } else {
      commit(REMOVE_PROFILE)
    }
  }
}

const mutations = {
  [SET_PROFILE] (state, profile) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    state.profile = profile
  },
  [REMOVE_PROFILE] () {
    localStorage.removeItem(PROFILE_STORAGE_KEY)

    let initialState = getInitialState()
    for (let f in state) {
      Vue.set(state, f, initialState[f])
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
