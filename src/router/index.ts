import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MarkdownList',
    component: () => import('@/view/MarkdownList.vue')
  },
  {
    path: '/ArticleDetail',
    name: 'ArticleDetail',
    component: () => import('@/view/ArticleDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory('wzx0905'),
  routes
})

export default router
