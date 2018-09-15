<template>
  <v-app id="app">
    <navbar></navbar>
    <v-content>
      <router-view/>
      <footbar></footbar>
    </v-content>
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
