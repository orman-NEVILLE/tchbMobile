<script setup>
import {
  Check,
  ChevronRight,
  LogIn,
  Moon,
  Sun,
  Monitor,
  User,
} from 'lucide-vue-next'

import { ref } from 'vue'

import { useTheme } from '@/composables/useTheme'

const { theme, setTheme } = useTheme()

const showAppearance = ref(false)

const themes = [
  {
    id: 'light',
    label: 'Clair',
    icon: Sun,
  },
  {
    id: 'dark',
    label: 'Sombre',
    icon: Moon,
  },
  {
    id: 'system',
    label: 'Système',
    icon: Monitor,
  },
]

const selectTheme = (themeId) => {
  setTheme(themeId)
}
</script>

<template>
  <div class="profile-menu">

    <!-- Menu principal -->

    <template v-if="!showAppearance">

      <button
        type="button"
        class="menu-item"
      >
        <span class="menu-icon">
          <User :size="18" />
        </span>

        <span class="menu-content">
          <strong>Mon profil</strong>
          <small>Voir mon profil</small>
        </span>
      </button>

      <button
        type="button"
        class="menu-item"
        @click="showAppearance = true"
      >
        <span class="menu-icon">
          <Sun :size="18" />
        </span>

        <span class="menu-content">
          <strong>Apparence</strong>
          <small>Modifier le thème</small>
        </span>

        <ChevronRight
          class="menu-arrow"
          :size="17"
        />
      </button>

      <div class="menu-separator"></div>

      <button
        type="button"
        class="menu-item"
      >
        <span class="menu-icon">
          <LogIn :size="18" />
        </span>

        <span class="menu-content">
          <strong>Connexion</strong>
          <small>Se connecter à TCHB</small>
        </span>
      </button>

    </template>

    <!-- Sous-menu Apparence -->

    <template v-else>

      <div class="appearance-header">

        <button
          type="button"
          class="back-button"
          @click="showAppearance = false"
        >
          <ChevronRight
            :size="17"
            class="back-icon"
          />
        </button>

        <div>
          <strong>Apparence</strong>
          <small>Choisissez votre thème</small>
        </div>

      </div>

      <div class="menu-separator"></div>

      <button
        v-for="item in themes"
        :key="item.id"
        type="button"
        class="theme-item"
        :class="{ active: theme === item.id }"
        @click="selectTheme(item.id)"
      >
        <span class="theme-icon">
          <component
            :is="item.icon"
            :size="18"
          />
        </span>

        <span class="theme-label">
          {{ item.label }}
        </span>

        <span class="theme-check">
          <Check
            v-if="theme === item.id"
            :size="16"
            :stroke-width="2.5"
          />
        </span>
      </button>

    </template>

  </div>
</template>

<style scoped>
.profile-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;

  width: 250px;

  padding: 8px;

  background: var(--color-surface);

  border: 1px solid var(--color-border);
  border-radius: 14px;

  box-shadow: var(--shadow-menu);

  z-index: 200;

  transition:
    background 0.25s ease,
    border-color 0.25s ease;
}

/* Menu */

.menu-item {
  width: 100%;

  display: flex;
  align-items: center;
  gap: 11px;

  padding: 10px;

  border: none;
  border-radius: 10px;

  background: transparent;
  color: var(--color-text);

  text-align: left;

  cursor: pointer;

  transition: background 0.2s ease;
}

.menu-item:hover {
  background: var(--color-surface-hover);
}

.menu-icon {
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.menu-content {
  min-width: 0;
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-content strong {
  color: var(--color-text);

  font-size: 13px;
  font-weight: 600;
}

.menu-content small {
  color: var(--color-text-muted);

  font-size: 11px;
}

.menu-arrow {
  color: var(--color-text-muted);
}

.menu-separator {
  height: 1px;

  margin: 6px 8px;

  background: var(--color-border);
}

/* Apparence */

.appearance-header {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 8px 6px;
}

.appearance-header strong {
  display: block;

  color: var(--color-text);

  font-size: 13px;
  font-weight: 600;
}

.appearance-header small {
  display: block;

  margin-top: 2px;

  color: var(--color-text-muted);

  font-size: 11px;
}

.back-button {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;
  border-radius: 9px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);

  cursor: pointer;
}

.back-button:hover {
  background: var(--color-surface-hover);
}

.back-icon {
  transform: rotate(180deg);
}

/* Thèmes */

.theme-item {
  width: 100%;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 9px;

  border: none;
  border-radius: 9px;

  background: transparent;
  color: var(--color-text);

  text-align: left;

  cursor: pointer;

  transition: background 0.2s ease;
}

.theme-item:hover,
.theme-item.active {
  background: var(--color-surface-hover);
}

.theme-icon {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.theme-label {
  flex: 1;

  font-size: 13px;
  font-weight: 500;
}

.theme-check {
  width: 26px;
  height: 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  color: var(--color-text);
}

@media (max-width: 480px) {
  .profile-menu {
    width: 230px;
    right: -4px;
  }
}
</style>