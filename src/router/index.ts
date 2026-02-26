import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const HomePage = () => import('@/pages/Home.vue');
const DetailsPage = () => import('@/pages/Details.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/:id',
    component: DetailsPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
