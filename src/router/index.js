import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import PreachingsView from '@/views/PreachingsView.vue'
import PreachingDetailView from '@/views/PreachingDetailView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/predications',
      name: 'preachings',
      component: PreachingsView,
    },
    {
      path: '/predications/:id',
      name: 'preaching-detail',
      component: PreachingDetailView,
    },
  ],
})

export default router