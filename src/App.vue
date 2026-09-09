<script setup>
import {
  Home,
  Mic2,
} from 'lucide-vue-next'

import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="app">

    <!-- Header -->
    <AppHeader />

    <!-- Contenu -->
    <main class="app-content">
      <RouterView />
    </main>

    <!-- Navigation -->
    <nav class="bottom-navigation">

      <RouterLink
        to="/"
        class="nav-item"
      >
        <Home
          :size="22"
          :stroke-width="2"
        />

        <span>Accueil</span>
      </RouterLink>

      <RouterLink
        to="/predications"
        class="nav-item"
      >
        <Mic2
          :size="22"
          :stroke-width="2"
        />

        <span>Prédications</span>
      </RouterLink>

    </nav>

  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #f8f9fb;
}

.app-content {
  max-width: 768px;

  margin: 0 auto;

  padding: 24px 20px 100px;
}

/* Navigation */

.bottom-navigation {
  position: fixed;
  z-index: 100;

  left: 0;
  right: 0;
  bottom: 0;

  height: 72px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 80px;

  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);

  border-top: 1px solid #e9ecef;
}

.nav-item {
  min-width: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 5px;

  color: #9ca3af;
  text-decoration: none;

  font-size: 12px;
  font-weight: 500;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.nav-item:hover {
  color: #374151;
}

.nav-item.router-link-active {
  color: #111827;
  font-weight: 600;
}

.nav-item.router-link-active svg {
  stroke-width: 2.5;
}

@media (max-width: 480px) {
  .bottom-navigation {
    gap: 60px;
  }

  .app-content {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>