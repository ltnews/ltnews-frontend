<template>
  <v-footer color="primary" fixed>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <div class="white--text ml-3">
          Made with
          <v-icon class="red--text">favorite</v-icon>
          by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
          and <a class="white--text" href="https://github.com/vwxyzjn">Costa Huang</a>
        </div>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {
    name: 'Footbar'
  }
</script>
