<template>
    <v-card height="100%" :to="{name: 'ItemView', params: {id: item.id}}">
        <v-img :src="item.image"></v-img>

        <v-card-title primary-title>
            <div>
                <template v-if="show_feed">
                    <router-link class="caption" :to="{name: 'FeedView', params: {id: item.feed.id}}"
                                 v-text="item.feed.title"></router-link>
                    |
                </template>
                <span class="grey--text caption" v-text="formatDate"></span>
                <h3 class="headline" v-text="item.title"></h3>
                <div class="text-xs-justify">{{ item.article | truncate }}</div>
            </div>
        </v-card-title>
    </v-card>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'CardItem',
    props: {
      item: {type: Object, required: true},
      show_feed: {type: Boolean, required: false, default: true}
    },
    computed: {
      formatDate: function () {
        return moment(this.item.pubDate).fromNow()
      }
    },
    filters: {
      truncate: function (text) {
        let length = 150
        if (text.length <= length) {
          return text
        } else {
          return text.substring(0, length).replace(/\w+$/, '').concat('...')
        }
      }
    }
  }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>
