import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PageView from '@/views/PageView.vue'
import ProblemView from '@/views/ProblemView.vue'
import HistoryView from '@/views/HistoryView.vue'
const routes = [
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
  },
  {
    path: '/page/:id',
    name: 'page',
    component: PageView,
    props: true 
  },
  {
    path: '/problem',
    name: 'problem',
    component: ProblemView
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
