<template>
  <v-flex xs12>
    <v-toolbar dense color="secondary">
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn dark flat color="accent" @click="liked()"><v-icon>thumb_up</v-icon></v-btn>
        <v-btn dark flat color="accent" @click="web(itemDetailItem.link)"><v-icon>link</v-icon></v-btn>
        <v-btn dark flat color="accent" @click="saved()"><v-icon>save</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-parallax :src="itemDetailItem.image">
      <v-layout
        align-center
        column
        justify-end
      >
        <h1 class="display-2 font-weight-thin mb-3" v-text="itemDetailItem.title"></h1>
        <h4 class="subheading" v-text="itemDetailItem.pubDate"></h4>
      </v-layout>
    </v-parallax>

    <v-flex xs12>
      <v-container grid-list-md>
        <div class="text-xs-justify" v-html="itemDetailItem.article"></div>
        <p class="text-xs-right" v-text="itemDetailItem.creator"></p>

        <br>
        <v-divider></v-divider>
        <br>

        <h2 class="subheading" color="primary">Comments</h2>
        <v-list>
          <template v-for="(comment, index) in itemDetailComments">
            <v-list-tile :key="comment.id" avatar>
              <v-list-tile-avatar>
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="comment.pubDate"></v-list-tile-title>
                <v-list-tile-sub-title v-html="comment.description"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action> <!-- TODO: v-if="comment.user" -->
                <v-icon color="error" @click="remove(comment.id, index)">delete</v-icon>
              </v-list-tile-action>
            </v-list-tile>

            <v-divider inset></v-divider>
          </template>
        </v-list>

        <v-textarea
          append-icon="send"
          @click:append=submit
          box
          label="Your comment"
          auto-grow
          v-model="itemDetailComment.description"
        ></v-textarea>


      </v-container>
    </v-flex>
  </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '@/store'
  import {ITEM_GET_ONE, ITEM_GET_COMMENTS, COMMENT_POST, COMMENT_DELETE, ITEM_POST} from '../store/types'

  export default {
    name: 'ItemView',
    data () {
      return {
        errors: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      Promise.all([
        store.dispatch(ITEM_GET_ONE, to.params.id),
        store.dispatch(ITEM_GET_COMMENTS, to.params.id)
      ]).then((data) => {
        next()
      })
    },
    computed: {
      ...mapGetters([
        'itemDetailItem',
        'itemDetailComments',
        'itemDetailComment',
        'itemDetailStatus'
      ])
    },
    methods: {
      submit: function () {
        this.$store.dispatch(COMMENT_POST)
          .then(({data}) => {
            this.errors = ''
          }).catch(({response}) => {
            this.errors = `${response.status}: ${response.statusText}`
          })
      },
      remove: function (id, index) {
        this.$store.dispatch(COMMENT_DELETE, [id, index])
          .then(({data}) => {
            this.errors = ''
          }).catch(({response}) => {
            this.errors = `${response.status}: ${response.statusText}`
          })
      },
      saved: function () {
        this.$store.dispatch(ITEM_POST, ['save', true])
          .then(({data}) => {
            this.errors = ''
          }).catch(({response}) => {
            this.errors = `${response.status}: ${response.statusText}`
          })
      },
      liked: function () {
        this.$store.dispatch(ITEM_POST, ['like', true])
          .then(({data}) => {
            this.errors = ''
          }).catch(({response}) => {
            this.errors = `${response.status}: ${response.statusText}`
          })
      },
      web: function (link) {
        this.$store.dispatch(ITEM_POST, ['web', true])
          .then(({data}) => {
            window.location.href = link
          }).catch(({response}) => {
            this.errors = `${response.status}: ${response.statusText}`
          })
      }
    }
  }
</script>

<style scoped>

</style>
