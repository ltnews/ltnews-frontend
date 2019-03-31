import session from './session'

const PROFILE = 'profile'
const SECTION = 'section'
const FEED = 'feed'
const ITEM = 'item'
const COMMENT = 'comment'

function plural (entity) {
  return `${entity}s`
}

function makeURL (entity, id, other) {
  let url = `./${entity}/`

  if (id !== undefined) {
    url += `${id}/`
  }
  if (other !== undefined) {
    url += `${other}/`
  }

  return url
}

export default {
  profile_get_one () {
    return session.get(makeURL(PROFILE))
  },
  profile_put (profile) {
    return session.put(makeURL(PROFILE), profile)
  },
  section_get_all () {
    return session.get(makeURL(SECTION))
  },
  sections_post (section) {
    return session.post(makeURL(SECTION), section)
  },
  section_get_one (id) {
    return session.get(makeURL(SECTION, id))
  },
  section_put (id, section) {
    return session.put(makeURL(SECTION, id), section)
  },
  section_delete (id) {
    return session.delete(makeURL(SECTION, id))
  },
  section_all_names () {
    return session.get(makeURL(SECTION, 'names'))
  },
  feed_post (feed) {
    return session.post(makeURL(FEED), feed)
  },
  feed_get_one (id) {
    return session.get(makeURL(FEED, id))
  },
  feed_get_items (id) {
    return session.get(makeURL(FEED, id, plural(ITEM)))
  },
  feed_delete (id) {
    return session.delete(makeURL(FEED, id))
  },
  feed_all_links () {
    return session.get(makeURL(FEED, 'links'))
  },
  item_get_all () {
    return session.get(makeURL(ITEM))
  },
  item_get_one (id) {
    return session.get(makeURL(ITEM, id))
  },
  item_put (id, status) {
    return session.put(makeURL(ITEM, id), status)
  },
  item_get_saved () {
    return session.get(makeURL(ITEM, 'saved'))
  },
  comment_get_all (id) {
    return session.get(makeURL(ITEM, id, plural(COMMENT)))
  },
  comment_post (id, comment) {
    return session.post(makeURL(ITEM, id, plural(COMMENT)), comment)
  },
  comment_delete (id) {
    return session.delete(makeURL(COMMENT, id))
  },
  generic_get (url) {
    return session.get(url)
  }
}
