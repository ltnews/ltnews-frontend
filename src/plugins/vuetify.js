import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
//import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#795548',
    secondary: '#5D4037',
    accent: '#FFC107',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
});
