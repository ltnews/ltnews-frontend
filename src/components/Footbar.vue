<template>
  <v-footer color="primary" app>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <div class="white--text ml-3">
          <a class="accent--text" href="https://github.com/andjimrio" target="_blank">Andrés M. Jiménez</a>
          &copy; {{ new Date().getFullYear() }}
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

<style scoped>
  a {
    text-decoration: none;
  }
</style>
