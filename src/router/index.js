import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
     children: [
            {
                path: '/',
                name: 'name.message',
                component: () => import(/* webpackChunkName: "login" */ '@/components/message/message.vue')
            }
        ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../pages/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
