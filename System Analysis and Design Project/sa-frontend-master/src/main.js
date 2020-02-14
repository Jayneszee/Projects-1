import Vue from 'vue'
import App from './App.vue'
import VueLogger from 'vuejs-logger'
import vuetify from './plugins/vuetify'
import router from './router'
import controller from './services/controller'
import '@babel/polyfill'

Vue.config.productionTip = false

Vue.prototype.$http = controller

const options = {
  isEnabled: true,
  logLevel: 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: false,
  separator: '|',
  showConsoleColors: true
}

Vue.use(VueLogger, options)

new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
