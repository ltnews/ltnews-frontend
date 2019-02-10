import api from '../api/api'

import {
  ITEM_GET_ALL, ITEM_GET_SAVED, ITEM_GET_ITEMS_PAGE,
  FETCH_START_ITEMS, FETCH_END_ITEMS
} from './types'

const state = {
  loading: true,
  items: {
    count: 0,
    next: null,
    previous: null,
    results: []
  }
}

const getters = {
  itemListLoading: state => state.loading,
  itemListItems: state => state.items.results,
  itemListNext: state => state.items.next === null,
  itemListPrevious: state => state.items.previous === null
}

const actions = {
  [ITEM_GET_ALL] ({ commit }) {
    commit(FETCH_START_ITEMS)
    return api.item_get_all()
      .then(({ data }) => { commit(FETCH_END_ITEMS, data) })
      .catch((error) => { throw new Error(error) })
  },
  [ITEM_GET_ITEMS_PAGE] ({state, commit}, next) {
    let url = "";
    if (next) {
      url = state.items.next;
    } else {
      url = state.items.previous;
    }

    return api.generic_get(url)
      .then(({data}) => {
        commit(FETCH_END_ITEMS, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [ITEM_GET_SAVED] ({ commit }) {
    commit(FETCH_START_ITEMS)
    return api.item_get_saved()
      .then(({ data }) => { commit(FETCH_END_ITEMS, data) })
      .catch((error) => { throw new Error(error) })
  }
}

const mutations = {
  [FETCH_START_ITEMS] (state) {
    state.loading = true
  },
  [FETCH_END_ITEMS] (state, items) {
    state.items = items
    state.loading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
