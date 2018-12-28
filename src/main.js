import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

new Vue({
  //el: '#app',
  //components: {App},
  //template: '<App/>'
  router,
  store,
  render: h => h(App)
}).$mount('#app');
