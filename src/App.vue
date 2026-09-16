<script setup>
import {
  Home,
  LoaderCircle,
  Mic2,
  Music2
} from 'lucide-vue-next'

import {
  onMounted,
  ref,
} from 'vue'

import AppHeader from '@/components/AppHeader.vue'

const isAppLoading = ref(true)

onMounted(() => {
  window.setTimeout(() => {
    isAppLoading.value = false
  }, 1400)
})
</script>

<template>
  <div class="app">

    <!-- =========================
         ÉCRAN DE DÉMARRAGE
    ========================== -->

    <Transition name="splash">

      <div
        v-if="isAppLoading"
        class="splash-screen"
        aria-label="Chargement de TCHB"
      >
        <div class="splash-content">

          <img
            src="/icons/logo-tchb.png"
            alt="Logo TCHB"
            class="splash-logo"
          />

          <div
            class="splash-loader"
            aria-hidden="true"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>
      </div>

    </Transition>


    <!-- =========================
         HEADER
    ========================== -->

    <AppHeader />


    <!-- =========================
         CONTENU
    ========================== -->

    <main class="app-content">
      <RouterView />
    </main>


    <!-- =========================
         NAVIGATION
    ========================== -->

    <nav
      class="bottom-navigation"
      aria-label="Navigation principale"
    >

      <RouterLink
        to="/"
        class="nav-item"
      >
        <Home
          :size="22"
          :stroke-width="2"
        />

        <span>
          Accueil
        </span>
      </RouterLink>


      <RouterLink
        to="/predications"
        class="nav-item"
      >
        <Mic2
          :size="22"
          :stroke-width="2"
        />

        <span>
          Prédications
        </span>
      </RouterLink>
      
      <RouterLink
        to="/chants"
        class="nav-item"
      >
        <Music2
          :size="22"
          :stroke-width="2"
        />

        <span>
          Chants
        </span>
      </RouterLink>

    </nav>

  </div>
</template>


<style scoped>
/* =========================
   APPLICATION
========================= */

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
   SPLASH SCREEN
========================= */

.splash-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-background);
  color: var(--color-text);
}

.splash-content {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 26px;
}

.splash-logo {
  width: 138px;
  height: 138px;

  display: block;

  object-fit: contain;

  animation:
    logo-appear 0.7s ease-out,
    logo-pulse 2s ease-in-out 0.7s infinite;
}

.splash-loader {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 6px;
}

.splash-loader span {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: var(--color-text);

  animation: loader-bounce 1.1s ease-in-out infinite;
}

.splash-loader span:nth-child(2) {
  animation-delay: 0.15s;
}

.splash-loader span:nth-child(3) {
  animation-delay: 0.3s;
}


/* =========================
   ANIMATIONS
========================= */

@keyframes logo-appear {
  from {
    opacity: 0;
    transform: scale(0.75);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes logo-pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.045);
  }
}

@keyframes loader-bounce {
  0%,
  60%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }

  30% {
    opacity: 1;
    transform: translateY(-5px);
  }
}


/* =========================
   TRANSITION
========================= */

.splash-enter-active,
.splash-leave-active {
  transition:
    opacity 0.35s ease,
    visibility 0.35s ease;
}

.splash-leave-to {
  opacity: 0;
  visibility: hidden;
}


/* =========================
   NAVIGATION
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


/* =========================
   MOBILE
========================= */

@media (max-width: 480px) {
  .bottom-navigation {
    gap: 60px;
  }

  .app-content {
    padding-left: 16px;
    padding-right: 16px;
  }

  .splash-logo {
    width: 115px;
    height: 115px;
  }
}


/* =========================
   ACCESSIBILITÉ
========================= */

@media (prefers-reduced-motion: reduce) {
  .splash-logo,
  .splash-loader span {
    animation: none;
  }

  .splash-enter-active,
  .splash-leave-active {
    transition: none;
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