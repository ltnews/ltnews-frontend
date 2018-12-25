<template>
  <v-flex xs12>
    <v-toolbar dense color="secondary">
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn dark flat :to="{name: 'ProfileEdit'}">Edit</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container grid-list-sm fluid>
      <page-head
        title="Profile"
        subtitle="In this view, you can modify all data of your profile">
      </page-head>

      <v-layout row wrap>
        <v-flex xs12>
          <v-card flat tile>
            <v-layout class="text-xs-center">
              <v-flex xs6>
                <v-avatar size="200px"><img :src="profile.image"></v-avatar>
              </v-flex>
              <v-flex xs6>
                <v-card-title primary-title>
                  <div>
                    <div class="display-3" v-text="profile.user.username"></div>
                    <div class="display-1">{{profile.user.first_name}} {{profile.user.last_name}}</div>
                    <div class="headline" v-text="profile.user.email"></div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import PageHead from '../components/PageHead'

  export default {
    name: 'ProfileView',
    components: {PageHead},
    computed: {
      ...mapGetters({
        profile: 'getProfile'
      })
    }
  }
</script>

<style scoped>

</style>
