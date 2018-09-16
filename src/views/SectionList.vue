<template>
  <v-flex xs12>
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

      <v-btn
        absolute
        fab
        top
        right
        color="accent"
        :to="{name: 'SectionEdit'}"
      >
        <v-icon>add</v-icon>
      </v-btn>
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
