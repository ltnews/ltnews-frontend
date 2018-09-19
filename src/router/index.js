import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login'
import PasswordReset from '../views/PasswordReset'
import PasswordResetConfirm from '../views/PasswordResetConfirm'
import Register from '../views/Register'
import VerifyEmail from '../views/VerifyEmail'

import Home from '../views/Home'
import SectionList from '../views/SectionList'
import SectionView from '../views/SectionView'
import SectionEdit from '../views/SectionEdit'
import FeedView from '../views/FeedView'
import ItemList from '../views/ItemList'

import store from '../store'

const requireAuthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (!store.getters['auth/isAuthenticated']) {
        next('/login')
      } else {
        next()
      }
    })
}

const requireUnauthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (store.getters['auth/isAuthenticated']) {
        next('/')
      } else {
        next()
      }
    })
}

const redirectLogout = (to, from, next) => {
  store.dispatch('auth/logout')
    .then(() => next('/login'))
}

Vue.use(Router)

export default new Router({
  saveScrollPosition: true,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/password_reset',
      name: 'PasswordReset',
      component: PasswordReset
    },
    {
      path: '/password_reset/:uid/:token',
      name: 'PasswordResetConfirm',
      component: PasswordResetConfirm
    },
    {
      path: '/register',
      name: 'PasswordResetConfirm',
      component: Register
    },
    {
      path: '/register/:key',
      name: 'VerifyEmail',
      component: VerifyEmail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: requireUnauthenticated
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: redirectLogout
    },
    {
      path: '/section/list',
      name: 'SectionList',
      component: SectionList,
      beforeEnter: requireAuthenticated
    },
    {
      path: '/section/view/:id',
      name: 'SectionView',
      component: SectionView,
      beforeEnter: requireAuthenticated
    },
    {
      path: '/section/edit/:id?',
      name: 'SectionEdit',
      component: SectionEdit,
      beforeEnter: requireAuthenticated
    },
    {
      path: '/feed/view/:id',
      name: 'FeedView',
      component: FeedView
    },
    {
      path: '/item/list',
      name: 'ItemList',
      component: ItemList,
      beforeEnter: requireAuthenticated
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
