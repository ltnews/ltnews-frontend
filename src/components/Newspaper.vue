<template>
    <v-flex xs12>
      <v-container grid-list-xl>
        <h1>Newspapers</h1>

        <v-flex
          v-for="section in sections"
          :key="section.title">
          <v-card>
            <v-card-title><h4>{{ section.title }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list-tile
                v-for="item in section.items"
                :key="item.title"
                avatar
                @click="">
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-container>
    </v-flex>
</template>

<script>
  export default {
    name: 'Newspaper',
    data: function () {
      return {
        sections: [
          {
            title: 'News',
            items: [
              {
                title: 'El Pais',
                avatar: 'https://ep01.epimg.net/iconos/v2.x/v2.1/recurso/elpais.png',
                active: true
              }, {
                title: 'ABC',
                avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Logo_abc.jpg/800px-Logo_abc.jpg',
                active: false
              }
            ]
          },
          {
            title: 'Sports',
            items: [
              {
                title: 'Marca',
                avatar: '',
                active: true
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
