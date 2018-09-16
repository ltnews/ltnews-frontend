import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import auth from './auth'
import password from './password'
import signup from './signup'
import sectionList from './sectionList'
import sectionDetail from './sectionDetail'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    password,
    signup,
    sectionList,
    sectionDetail
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
