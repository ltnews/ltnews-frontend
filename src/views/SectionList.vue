<template>
  <v-flex xs12>
    <v-toolbar dense color="secondary">
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn dark flat :to="{name: 'SectionEdit'}">Create</v-btn>
        <v-btn dark flat :to="{name: 'FeedCreate'}">Add Feed</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container grid-list-xl>
      <page-head
        title="Newspapers"
        subtitle="All your sections and feeds are here.">
      </page-head>

      <v-flex
        v-for="section in sectionListSections"
        :key="section.title"
      >
        <card-list-feed
          :title="section.title"
          :link="{name: 'SectionView', params: {id: section.id}}"
          :feeds="section.feeds">
        </card-list-feed>
      </v-flex>
    </v-container>
  </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {SECTION_GET_ALL} from '../store/types'
  import PageHead from '../components/PageHead'
  import CardListFeed from '../components/CardListFeed'

  export default {
    name: 'SectionList',
    components: {PageHead, CardListFeed},
    computed: {
      ...mapGetters([
        'sectionListLoading',
        'sectionListSections',
        'sectionListSectionsCount'
      ])
    },
    mounted () {
      this.$store.dispatch(SECTION_GET_ALL)
    }
  }
</script>

<style scoped>

</style>
