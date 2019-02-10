<template>
  <div id="Navbar">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-img :aspect-ratio="16/9" :src="require('../assets/newspaper.jpg')"  v-if="isAuthenticated">
        <v-layout pa-3 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex>
            <v-avatar size="75px"><img :src="profile.image"></v-avatar>
            <br><br>
            <div class="subheading font-weight-medium">{{profile.user.first_name}} {{profile.user.last_name}}</div>
            <div class="body-1" v-text="profile.user.email"></div>
          </v-flex>
        </v-layout>
      </v-img>

      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          v-if="isAuthenticated===item.auth"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="primary"
      app
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/" class="toolbar-title" v-text="title"></router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon><v-icon>search</v-icon></v-btn>
      <v-btn icon :to="{name: 'ProfileView'}"><v-icon>settings</v-icon></v-btn>
    </v-toolbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        drawer: null,
        items: [{
          icon: 'view_list',
          title: 'News',
          link: {name: 'ItemList'},
          auth: true
        }, {
          icon: 'library_books',
          title: 'Newspapers',
          link: {name: 'SectionList'},
          auth: true
        }, {
          icon: 'saved',
          title: 'Saved',
          link: {name: 'ItemSaved'},
          auth: true
        }, {
          icon: 'exit_to_app',
          title: 'Logout',
          link: {name: 'Logout'},
          auth: true
        }, {
          icon: 'system_update_alt',
          title: 'Register',
          link: {name: 'Register'},
          auth: false
        }, {
          icon: 'input',
          title: 'Login',
          link: {name: 'Login'},
          auth: false
        }],
        title: 'LT-News'
      }
    },
    name: 'Navbar',
    computed: {
      ...mapGetters({
        isAuthenticated: 'isAuthenticated',
        profile: 'getProfile'
      })
    }
  }
</script>

<style scoped>
  .toolbar-title {
    color: inherit;
    text-decoration: inherit;
  }
</style>
