import session from './session'

const ROOT_AUTH = 'auth/'

export default {
  login (user_pass) {
    return session.post(ROOT_AUTH + 'login/', user_pass)
  },
  logout () {
    return session.post(ROOT_AUTH + 'logout/', {})
  },
  createAccount (registerForm) {
    return session.post('registration/', registerForm)
  },
  changeAccountPassword (password1, password2) {
    return session.post(ROOT_AUTH + 'password/change/', { password1, password2 })
  },
  sendAccountPasswordResetEmail (email) {
    return session.post(ROOT_AUTH + 'password/reset/', { email })
  },
  resetAccountPassword (uid, token, new_password1, new_password2) { // eslint-disable-line camelcase
    return session.post(ROOT_AUTH + 'password/reset/confirm/', { uid, token, new_password1, new_password2 })
  },
  getAccountDetails () {
    return session.get(ROOT_AUTH + 'user/')
  },
  updateAccountDetails (data) {
    return session.put(ROOT_AUTH + 'user/', data)
  },
  verifyAccountEmail (key) {
    return session.post('registration/verify-email/', { key })
  }
}
