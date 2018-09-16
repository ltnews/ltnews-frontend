import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login'
import PasswordReset from '../views/PasswordReset'
import PasswordResetConfirm from '../views/PasswordResetConfirm'
import Register from '../views/Register'
import VerifyEmail from '../views/VerifyEmail'

import Home from '../views/Home'
import SectionList from '../views/SectionList'
import SectionDetail from '../views/SectionDetail'

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
      component: PasswordReset
    },
    {
      path: '/password_reset/:uid/:token',
      component: PasswordResetConfirm
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/register/:key',
      component: VerifyEmail
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: requireUnauthenticated
    },
    {
      path: '/logout',
      beforeEnter: redirectLogout
    },
    {
      path: '/newspapers',
      name: 'SectionList',
      component: SectionList,
      beforeEnter: requireAuthenticated
    },
    {
      path: '/newspapers/section/:id',
      name: 'SectionDetail',
      component: SectionDetail,
      beforeEnter: requireAuthenticated
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
