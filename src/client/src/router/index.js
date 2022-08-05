import Vue from 'vue'
import VueRouter from 'vue-router'

//Importing component
import login from '../components/login';
import user from '../components/user';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/user',
    component: user
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
