import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import auth from './auth'
import password from './password'
import signup from './signup'
import sectionList from './sectionList'
import sectionDetail from './sectionDetail'
import feedDetail from './feedDetail'
import itemList from './itemList'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    password,
    signup,
    sectionList,
    sectionDetail,
    feedDetail,
    itemList
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
