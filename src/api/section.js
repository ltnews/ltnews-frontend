import session from './session'

export default {
  section_get_all () {
    return session.get(`./section`)
  },
  sections_post (section) {
    return session.post(`./section`, section)
  },
  section_get_one (id) {
    return session.get(`./section/${id}/`)
  },
  section_put (id, section) {
    return session.put(`./section/${id}/`, section)
  }
}
