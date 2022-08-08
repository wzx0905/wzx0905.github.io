import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomeIndex',
    component: () => import('@/view/HomeIndex.vue')
  }
]

const router = createRouter({
  history: createWebHistory('wzx0905'),
  routes
})

export default router
