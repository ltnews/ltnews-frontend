<template>
  <v-flex xs12>
    <v-container grid-list-xl>
      <page-head
        :title="sectionDetailSection.title"
        :subtitle="sectionDetailSection.description">
      </page-head>

      <v-flex>
        <card-list-feed title="Feeds" :feeds="sectionDetailSection.feeds"></card-list-feed>
      </v-flex>

      <v-btn
        absolute
        fab
        top
        right
        color="accent"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-container>
  </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '@/store'
  import {SECTION_GET_ONE} from '../store/types'
  import PageHead from '../components/PageHead'
  import CardListFeed from '../components/CardListFeed'

  export default {
    name: 'SectionDetail',
    components: {PageHead, CardListFeed},
    beforeRouteEnter (to, from, next) {
      Promise.all([
        store.dispatch(SECTION_GET_ONE, to.params.id)
      ]).then((data) => {
        next()
      })
    },
    computed: {
      ...mapGetters([
        'sectionDetailSection'
      ])
    }
  }
</script>

<style scoped>

</style>
