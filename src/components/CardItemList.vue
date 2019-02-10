<template>
    <v-container pa-0 fluid grid-list-sm>
        <v-layout row wrap>
            <v-flex xs12 sm6 lg4 v-for="item in items" :key="item.id">
                <card-item :item="item"></card-item>
            </v-flex>
        </v-layout>

        <v-layout row wrap v-if="pagination">
            <v-flex xs6>
                <v-btn block color="accent" @click="paginate(false)" :disabled="previous">Previous</v-btn>
            </v-flex>
            <v-flex xs6>
                <v-btn block color="accent" @click="paginate(true)" :disabled="next">Next</v-btn>
            </v-flex>
        </v-layout>

        <v-snackbar v-model="toast" right color="error">
            {{errors}}
            <v-btn color="accent" flat @click="toast=false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
  import CardItem from './CardItem'

  export default {
    name: 'CardItemList',
    components: {CardItem},
    props: {
      items: {type: Array, required: true},
      previous: {type: Boolean, required: true},
      next: {type: Boolean, required: true},
      action: {type: String, required: true}
    },
    data () {
      return {
        errors: '',
        toast: false
      }
    },
    computed: {
      pagination: function () {
        return !this.next || !this.previous;
      }
    },
    methods: {
      paginate (next) {
        this.$store.dispatch(this.action, next)
          .catch(({response}) => {
            if(response == null) {
              response = {status: 500, statusText: 'Network error'}
            }

            this.toast = true;
            this.errors = `${response.status}: ${response.statusText}`
          })
      }
    }
  }
</script>

<style scoped>

</style>
