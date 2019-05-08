<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card>
    <router-link :to="link">
      <v-card-title><h4 v-text="title"></h4></v-card-title>
    </router-link>
    <v-divider></v-divider>
    <v-list>
      <v-list-group v-for="keyword in keywords" :key="keyword.keyword">
        <template v-slot:activator="">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ keyword.sample_title }}</v-list-tile-title>
              <v-list-tile-sub-title>
                <v-avatar size="15px" class="accent text--gray mr-2">{{ keyword.counts }}</v-avatar>
                <router-link :to="{name: 'ItemQuery', params: {query: keyword.keyword}}">{{ keyword.keyword }}</router-link>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-list-tile v-for="item in keyword.items" :key="item.id">
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to="{name: 'FeedView', params: {id: item.feed_id}}">{{ item.feed_title }}</router-link> |
              <router-link :to="{name: 'ItemView', params: {id: item.id}}">{{ item.title }}</router-link>
            </v-list-tile-title>
            <v-list-tile-sub-title>

            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: 'CardListSummary',
    props: {
      title: {type: String, required: true},
      link: {type: Object, required: false},
      keywords: {type: Array, required: true}
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
