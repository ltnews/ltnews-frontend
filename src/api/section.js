import session from './session'

export default {
  section_get_all () {
    return session.get(`./section`)
  },
  section_get_one (id) {
    return session.get(`./section/${id}/`)
  }
}
