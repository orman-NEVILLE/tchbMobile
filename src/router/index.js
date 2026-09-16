import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import PreachingsView from '@/views/PreachingsView.vue'
import PreachingDetailView from '@/views/PreachingDetailView.vue'
import RegisterRequestView from '@/views/RegisterRequestView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'


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
    {
      path: '/chants',
      name: 'chants',
      component: () => import('@/views/ChantsView.vue'),
    },
    {
      path: '/chants/:category',
      name: 'chants-category',
      component: () => import('@/views/ChantsCategoryView.vue'),
    },
    {
      path: '/chants/:category/:id',
      name: 'chant-detail',
      component: () => import('@/views/ChantDetailView.vue'),
    },
    {
    path: '/inscription',
    name: 'register-request',
    component: RegisterRequestView,
    },
    {
    path: '/connexion',
    name: 'login',
    component: LoginView,
    },
    {
    path: '/profil',
    name: 'profile',
    component: ProfileView,
    },
  ],
})

export default router