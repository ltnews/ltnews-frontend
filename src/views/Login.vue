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
                    <v-text-field v-model="inputs.username" label="Username" required></v-text-field>
                    <v-text-field v-model="inputs.password" type="password" label="Password" required></v-text-field>

                    <v-btn :disabled="!valid" @click="login(inputs)" type="submit" class="accent">Submit</v-btn>
                    <v-btn :to="{name: 'Register'}" >Register</v-btn>
                    <v-btn :to="{name: 'PasswordReset'}" outline  class="accent">Reset Password</v-btn>
                </v-form>
            </v-flex>
        </v-container>
    </v-flex>
</template>

<script>
  import PageHead from '../components/PageHead'

  export default {
    name: 'Login',
    components: {PageHead},
    data () {
      return {
        inputs: {
          username: '',
          password: ''
        },
        valid: true,
        errors: ''
      }
    },
    methods: {
      login ({username, password}) {
        this.$store.dispatch('auth/login', {username, password})
          .then(() => {
            this.$router.push({name: 'Home'})
          }).catch(({response}) => {
            this.errors = `${response.status}: ${response.statusText}`
        })
      }
    }
  }
</script>

<style>
</style>
