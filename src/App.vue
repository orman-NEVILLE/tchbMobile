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

  background: var(--color-background);
  color: var(--color-text);

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.app-content {
  max-width: 768px;

  margin: 0 auto;

  padding: 24px 20px 100px;
}

/* =========================
   Navigation
   ========================= */

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

  background: var(--color-surface);

  backdrop-filter: blur(10px);

  border-top: 1px solid var(--color-border);

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.nav-item {
  min-width: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 5px;

  color: var(--color-text-muted);

  text-decoration: none;

  font-size: 12px;
  font-weight: 500;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.nav-item:hover {
  color: var(--color-text-secondary);
}

.nav-item.router-link-active {
  color: var(--color-text);

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

<style>
:root {
  --color-background: #f8f9fb;

  --color-surface: #ffffff;
  --color-surface-secondary: #f1f3f5;
  --color-surface-hover: #f3f4f6;

  --color-text: #111827;
  --color-text-secondary: #374151;
  --color-text-muted: #9ca3af;

  --color-border: #e9ecef;

  --shadow-menu:
    0 10px 30px rgba(17, 24, 39, 0.10),
    0 2px 8px rgba(17, 24, 39, 0.06);
}

html.theme-dark {
  --color-background: #0f1115;

  --color-surface: #181b21;
  --color-surface-secondary: #22262e;
  --color-surface-hover: #272c35;

  --color-text: #f3f4f6;
  --color-text-secondary: #d1d5db;
  --color-text-muted: #9ca3af;

  --color-border: #2d333d;

  --shadow-menu:
    0 10px 30px rgba(0, 0, 0, 0.35),
    0 2px 8px rgba(0, 0, 0, 0.20);
}

html,
body,
#app {
  min-height: 100%;
}

html {
  background: var(--color-background);

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

body {
  margin: 0;

  background: var(--color-background);
  color: var(--color-text);

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}
</style>