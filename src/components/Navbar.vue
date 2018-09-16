<template>
  <div id="Navbar">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-toolbar flat class="transparent" v-if="isAuthenticated">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-text="currentUser"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
      </v-toolbar>
      <v-list class="pt-0" dense>
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
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-btn flat v-if="currentUser.username" v-text="currentUser.username"></v-btn> -->
      </v-toolbar-items>
      <v-btn icon>
        <v-icon>menu</v-icon>
      </v-btn>
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
    computed: mapGetters('auth', [
      'isAuthenticated', 'currentUser'
    ])
  }
</script>
