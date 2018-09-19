import api from '../api/api'

import {
  ITEM_GET_ALL,
  FETCH_START_ITEMS,
  FETCH_END_ITEMS
} from './types'

const state = {
  loading: true,
  items: [],
  itemsCount: 0
}

const getters = {
  itemListLoading: state => state.loading,
  itemListItems: state => state.items,
  itemListItemsCount: state => state.itemsCount
}

const actions = {
  [ITEM_GET_ALL] ({ commit }) {
    commit(FETCH_START_ITEMS)
    return api.item_get_all()
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
