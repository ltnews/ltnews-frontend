<template>
  <v-flex xs12>
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
        <div class="text-xs-center">
          <v-btn color="accent">
            <v-icon>thumb_up</v-icon>
          </v-btn>
        </div>

        <br>
        <v-divider></v-divider>
        <br>

        <h2 class="subheading" color="primary">Comments</h2>
        <v-list>
          <template v-for="comment in itemDetailComments">
            <v-list-tile :key="comment.id" avatar>
              <v-list-tile-avatar>
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="comment.pubDate"></v-list-tile-title>
                <v-list-tile-sub-title v-html="comment.description"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider inset></v-divider>
          </template>
        </v-list>

        <v-textarea
          append-icon="send"
          :append-icon-cb=submit
          box
          label="Label"
          auto-grow
          value="Holaaa"
        ></v-textarea>

      </v-container>
    </v-flex>
  </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '@/store'
  import {ITEM_GET_ONE, ITEM_GET_COMMENTS} from '../store/types'

  export default {
    name: 'ItemView',
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
        'itemDetailComments'
      ])
    },
    methods: {
      submit: function () {

      }
    }
  }
</script>

<style scoped>

</style>
