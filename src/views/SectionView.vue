<template>
    <v-flex xs12>
        <v-toolbar dense color="secondary">
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn dark flat :to="{name: 'SectionEdit', params: {id: sectionDetailSection.id}}">Edit</v-btn>
                <v-btn dark flat @click="toast = true">Delete</v-btn>
                <v-btn dark flat :to="{name: 'FeedCreate', params: {title: sectionDetailSection.title}}">Add Feed
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-container grid-list-xl>
            <page-head
                    :title="sectionDetailSection.title"
                    :subtitle="sectionDetailSection.description">
            </page-head>

            <v-flex>
                <card-list-feed title="Feeds" :feeds="sectionDetailSection.feeds"></card-list-feed>
            </v-flex>

            <v-snackbar v-model="toast" right color="secondary">
                Do you want to remove this section?
                <v-btn color="accent" flat @click="remove()">Yes</v-btn>
            </v-snackbar>
        </v-container>
    </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '../store'
  import {SECTION_GET_ONE, SECTION_DELETE} from '../stores/types'
  import PageHead from '../components/PageHead'
  import CardListFeed from '../components/CardListFeed'

  export default {
    name: 'SectionDetail',
    components: {PageHead, CardListFeed},
    beforeRouteEnter (to, from, next) {
      Promise.all([
        store.dispatch(SECTION_GET_ONE, to.params.id)
      ]).then(() => {
        next()
      })
    },
    data () {
      return {
        errors: '',
        toast: false
      }
    },
    computed: {
      ...mapGetters([
        'sectionDetailSection'
      ])
    },
    methods: {
      remove () {
        this.$store.dispatch(SECTION_DELETE)
          .then(() => {
            this.$router.push({name: 'SectionList'})
          }).catch(({response}) => {
          this.errors = `${response.status}: ${response.statusText}`
        })
      }
    }
  }
</script>

<style scoped>

</style>
