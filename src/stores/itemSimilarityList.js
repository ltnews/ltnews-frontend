import api from '../api/api'

import {ITEM_GET_ONE_SIMILARITY} from './types'
const FETCH_START_ITEMS = 'FETCH_START_ITEMS';
const FETCH_END_ITEMS = 'FETCH_END_ITEMS';

const state = {
    loading: true,
    items: []
};

const getters = {
    itemSimilarityListLoading: state => state.loading,
    itemSimilarityListKeywords: state => state.items,
};

const actions = {
    [ITEM_GET_ONE_SIMILARITY] ({ commit }, item_id) {
        commit(FETCH_START_ITEMS);
        return api.item_get_one_similarity(item_id)
            .then(({ data }) => { commit(FETCH_END_ITEMS, data) })
            .catch((error) => { throw new Error(error) })
    }
};

const mutations = {
    [FETCH_START_ITEMS] (state) {
        state.loading = true;
        state.keywords = [];
    },
    [FETCH_END_ITEMS] (state, items) {
        state.loading = false;
        state.items = items;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
