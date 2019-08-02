import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
Vue.use(axios)

/* CSS-SCSS */
import '../public/fonts/stylesheet.css' //Import fonts
import '../public/scss/utility.scss'

import { library } from '@fortawesome/fontawesome-svg-core' //Import Icons
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faChevronDown)

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
