<template>
    <v-flex xs12>
      <v-container grid-list-xl>
        <h1>Newspapers</h1>

        <v-flex
          v-for="section in newspapersSections"
          :key="section.title">
          <v-card>
            <v-card-title><h4 v-text="section.title"></h4></v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list-tile
                v-for="item in section.feeds"
                :key="item.title"
                avatar
                @click="">
                <v-list-tile-avatar>
                  <img :src="item.logo">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon color="accent">delete</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-container>
    </v-flex>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {SECTION_GET_ALL} from '../store/types'

  export default {
    name: 'Newspaper',
    data () {
      return {
        sections: []
      }
    },
    computed: {
      ...mapGetters([
        'newspapersLoading',
        'newspapersSections',
        'newspapersSectionsCount'
      ])
    },
    mounted () {
      this.$store.dispatch(SECTION_GET_ALL, this.sections)
    }
  }
</script>

<style scoped>

</style>
