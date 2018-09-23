import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import auth from './auth'
import password from './password'
import signup from './signup'
import profile from './profile'
import sectionList from './sectionList'
import sectionDetail from './sectionDetail'
import feedDetail from './feedDetail'
import feedForm from './feedForm'
import itemList from './itemList'
import itemDetail from './itemDetail'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    password,
    signup,
    profile,
    sectionList,
    sectionDetail,
    feedDetail,
    feedForm,
    itemList,
    itemDetail
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
