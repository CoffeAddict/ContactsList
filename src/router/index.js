import Vue from 'vue'
import Router from 'vue-router'

/* PATHS */
import IndexContacs from '../components/Index.vue'
import ContactInfo from '../components/ContactInfo.vue'

Vue.use(Router)

const rutas = new Router({
    routes: [
      {
        path: '/',
        redirect: '/index'
      },
      {
        path: '/index',
        component: IndexContacs
      },
      {
        path: '/contact-info/:id',
        component: ContactInfo
      },
    ]
  })

export default rutas
