import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/user/RegisterView.vue'),
    },
    {
      path: '/recover',
      name: 'recover',
      component: () => import('@/views/user/RecoverView.vue'),
    },
  ],
})

export default router
