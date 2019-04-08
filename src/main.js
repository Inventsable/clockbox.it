import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#46a0f5',
    // primary: '#2c89da', // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: '#46a0f5', // #3F51B5
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
