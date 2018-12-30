<template>
    <v-flex xs12>
        <v-container grid-list-xl>
            <page-head
                    title="Login"
                    subtitle="Access to your feed">
            </page-head>

            <v-flex>
                <p class="error--text" v-if="errors" v-text="errors"></p>
                <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
                    <v-text-field v-model="loginForm.username" label="Username" required></v-text-field>
                    <v-text-field v-model="loginForm.password" label="Password" type="password" required></v-text-field>

                    <v-btn :disabled="!valid" type="submit" class="accent">Submit</v-btn>
                    <v-btn :to="{name: 'Register'}">Register</v-btn>
                    <v-btn :to="{name: 'PasswordReset'}" outline class="accent">Reset Password</v-btn>
                </v-form>
            </v-flex>
        </v-container>
    </v-flex>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {LOGIN} from '../stores/types'
  import PageHead from '../components/PageHead'

  export default {
    name: 'Login',
    components: {PageHead},
    data () {
      return {
        valid: true,
        errors: ''
      }
    },
    computed: {
      ...mapGetters([
        'loginForm'
      ])
    },
    methods: {
      submit () {
        this.$store.dispatch(LOGIN)
          .then(() => this.$router.push({name: 'Home'}))
          .catch(({response}) => this.errors = response.data['non_field_errors'].join(" "))
      }
    }
  }
</script>

<style>
</style>
