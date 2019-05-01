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

                <br><v-divider></v-divider>

                <h2 class="mt-2 subheading text--primary">Keywords</h2>

                <keyword-list :item_id="itemDetailItem.id"></keyword-list>

                <br><v-divider></v-divider><br>


                <h2 class="subheading text--primary">Comments</h2>
                <comment-display :comments="itemDetailComments"></comment-display>
                <comment-form :comment="itemDetailComment"></comment-form>

            </v-container>
        </v-flex>
    </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '../store'
  import {ITEM_GET_ONE, ITEM_GET_COMMENTS, ITEM_PUT} from '../stores/types'
  import ItemDisplay from '../components/ItemDisplay'
  import CommentDisplay from '../components/CommentDisplay'
  import CommentForm from '../components/CommentForm'
  import KeywordList from '../components/KeywordList'

  export default {
    name: 'ItemView',
    components: {ItemDisplay, CommentDisplay, CommentForm, KeywordList},
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
