<template>
    <v-flex xs12>
        <v-toolbar dense color="secondary">
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn dark flat :color="color_status('like')" @click="set_status('like')">
                    <v-icon>thumb_up</v-icon>
                </v-btn>
                <v-btn dark flat :color="color_status('web')" @click="set_status('web')" :href="itemDetailItem.link" target="_blank">
                    <v-icon>link</v-icon>
                </v-btn>
                <v-btn dark flat :color="color_status('saves')" @click="set_status('saves')">
                    <v-icon>save</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-flex xs12>
            <v-img :src="itemDetailItem.image"></v-img>

            <v-container fluid>
                <item-display :item="itemDetailItem"></item-display>

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

                        <v-divider inset :key="comment.id"></v-divider>
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
  import {ITEM_GET_ONE, ITEM_GET_COMMENTS, COMMENT_POST, COMMENT_DELETE, ITEM_PUT} from '../stores/types'
  import ItemDisplay from '../components/ItemDisplay'

  export default {
    name: 'ItemView',
    components: {ItemDisplay},
    data () {
      return {
        errors: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      Promise.all([
        store.dispatch(ITEM_GET_ONE, to.params.id),
        store.dispatch(ITEM_GET_COMMENTS, to.params.id)
      ]).then(() => {
        next()
      })
    },
    computed: {
      ...mapGetters([
        'itemDetailItem',
        'itemDetailComments',
        'itemDetailComment'
      ])
    },
    methods: {
      submit: function () {
        this.$store.dispatch(COMMENT_POST)
          .then(() => {
            this.errors = ''
          }).catch(({response}) => {
          this.errors = `${response.status}: ${response.statusText}`
        })
      },
      remove: function (id, index) {
        this.$store.dispatch(COMMENT_DELETE, [id, index])
          .then(() => {
            this.errors = ''
          }).catch(({response}) => {
          this.errors = `${response.status}: ${response.statusText}`
        })
      },
      set_status: function (action) {
        this.$store.dispatch(ITEM_PUT, action)
          .then(() => {
            this.errors = ''
          }).catch(({response}) => {
          this.errors = `${response.status}: ${response.statusText}`
        })
      },
      color_status: function (action) {
        if (this.itemDetailItem.status[action]) {
          return 'accent'
        } else {
          return 'white'
        }
      }
    }
  }
</script>

<style scoped>

</style>
