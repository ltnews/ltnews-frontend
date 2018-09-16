<template>
  <v-app id="app">
    <navbar></navbar>
    <v-content fluid>
      <div class="layout">
        <router-view/>
      </div>
    </v-content>
    <footbar></footbar>
  </v-app>
</template>

<script>
  import Navbar from './components/Navbar'
  import Footbar from './components/Footbar'

  export default {
    name: 'App',
    components: {
      Navbar, Footbar
    }
  }
</script>
