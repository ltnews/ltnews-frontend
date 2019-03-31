<template>
    <v-list class="background_color">
        <template v-for="(comment, index) in comments">
            <v-list-tile :key="comment.id" avatar>
                <v-list-tile-avatar>
                    <img :src="profile.image">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{comment.pubDate | formatDate}}</v-list-tile-title>
                    <v-list-tile-sub-title v-html="comment.description"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon color="error" @click="remove(comment.id, index)">delete</v-icon>
                </v-list-tile-action>
            </v-list-tile>

            <v-divider inset :key="comment.id"></v-divider>
        </template>
    </v-list>
</template>

<script>
  import {mapGetters} from 'vuex'
  import moment from 'moment'
  import {COMMENT_DELETE} from '../stores/types'

  export default {
    name: 'CommentDisplay',
    props: {
      comments: {type: Object, required: true}
    },
    filters: {
      formatDate: function (date) {
        return moment(date).fromNow()
      }
    },
    methods: {
      remove: function (id, index) {
        this.$store.dispatch(COMMENT_DELETE, [id, index])
          .then(() => {
            this.errors = ''
          }).catch(({response}) => {
          this.errors = `${response.status}: ${response.statusText}`
        })
      }
    },
    computed: {
      ...mapGetters({
        profile: 'getProfile'
      })
    }
  }
</script>

<style scoped>
    .background_color {
        background: #fafafa;
    }
</style>
