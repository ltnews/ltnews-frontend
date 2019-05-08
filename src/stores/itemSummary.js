import api from '../api/api'

import {ITEM_SUMMARY} from './types'
const FETCH_START_ITEMS = 'FETCH_START_ITEMS';
const FETCH_END_ITEMS = 'FETCH_END_ITEMS';

const state = {
    loading: true,
    summary: []
};

const getters = {
    itemSummaryLoading: state => state.loading,
    itemSummarySummary: state => state.summary,
};

const actions = {
    [ITEM_SUMMARY] ({ commit }, params) {
        commit(FETCH_START_ITEMS);
        return api.item_summary(params)
            .then(({ data }) => { commit(FETCH_END_ITEMS, data) })
            .catch((error) => { throw new Error(error) })
    }
};

const mutations = {
    [FETCH_START_ITEMS] (state) {
        state.loading = true;
        state.summary = [];
    },
    [FETCH_END_ITEMS] (state, items) {
        state.loading = false;
        state.summary = items;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
