<template>
  <v-card>
    <router-link :to="link">
      <v-card-title><h4 v-text="title"></h4></v-card-title>
    </router-link>
    <v-divider></v-divider>
    <v-list>
      <v-list-tile
        v-for="item in feeds"
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
</template>

<script>
  export default {
    name: 'CardListFeed',
    props: {
      title: {type: String, required: true},
      link: {type: Object, required: false, default: '#'},
      feeds: {type: Array, required: true}
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
