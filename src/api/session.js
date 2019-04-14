import axios from 'axios'

const CSRF_COOKIE_NAME = 'csrftoken'
const CSRF_HEADER_NAME = 'X-CSRFToken'

const HOST_IP = process.env.NODE_ENV == 'production' ? 'ltnews.cf' : 'localhost';

const session = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
  baseURL: 'http://' + HOST_IP + ':8000/'
})

export default session
