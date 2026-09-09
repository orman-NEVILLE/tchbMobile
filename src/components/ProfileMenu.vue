<script setup>
import {
  Check,
  ChevronRight,
  LogIn,
  LogOut,
  Moon,
  Sun,
  Monitor,
  User,
} from 'lucide-vue-next'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()

const {
  user,
  isAuthenticated,
  logout,
} = useAuth()

const {
  theme,
  setTheme,
} = useTheme()

const emit = defineEmits([
  'close',
])

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

const handleLogout = () => {
  logout()

  showAppearance.value = false

  emit('close')

  router.push('/')
}
</script>

<template>
  <div class="profile-menu">

    <!-- =========================
         MENU PRINCIPAL
    ========================== -->

    <template v-if="!showAppearance">

      <!-- UTILISATEUR NON CONNECTÉ -->
      <template v-if="!isAuthenticated">

        <RouterLink
          to="/profil"
          class="menu-item menu-link"
        >
          <span class="menu-icon">
            <User :size="18" />
          </span>

          <span class="menu-content">
            <strong>
              Mon profil
            </strong>

            <small>
              Voir mon profil
            </small>
          </span>
        </RouterLink>

        <button
          type="button"
          class="menu-item"
          @click="
            showAppearance = true
          "
        >
          <span class="menu-icon">
            <Sun :size="18" />
          </span>

          <span class="menu-content">
            <strong>
              Apparence
            </strong>

            <small>
              Modifier le thème
            </small>
          </span>

          <ChevronRight
            class="menu-arrow"
            :size="17"
          />
        </button>

        <div class="menu-separator"></div>

        <RouterLink
          to="/connexion"
          class="menu-item menu-link"
        >
          <span class="menu-icon">
            <LogIn :size="18" />
          </span>

          <span class="menu-content">
            <strong>
              Connexion
            </strong>

            <small>
              Se connecter à TCHB
            </small>
          </span>
        </RouterLink>

      </template>

      <!-- UTILISATEUR CONNECTÉ -->
      <template v-else>

        <RouterLink
          to="/profil"
          class="menu-item menu-link"
        >
          <span class="menu-icon">
            <User :size="18" />
          </span>

          <span class="menu-content">
            <strong>
              {{ user?.name }}
            </strong>

            <small>
              Voir mon profil
            </small>
          </span>
        </RouterLink>

        <button
          type="button"
          class="menu-item"
          @click="
            showAppearance = true
          "
        >
          <span class="menu-icon">
            <Sun :size="18" />
          </span>

          <span class="menu-content">
            <strong>
              Apparence
            </strong>

            <small>
              Modifier le thème
            </small>
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
          @click="handleLogout"
        >
          <span class="menu-icon">
            <LogOut :size="18" />
          </span>

          <span class="menu-content">
            <strong>
              Déconnexion
            </strong>

            <small>
              Se déconnecter de TCHB
            </small>
          </span>
        </button>

      </template>

    </template>

    <!-- =========================
         APPARENCE
    ========================== -->

    <template v-else>

      <div class="appearance-header">

        <button
          type="button"
          class="back-button"
          aria-label="Retour"
          @click="
            showAppearance = false
          "
        >
          <ChevronRight
            :size="17"
            class="back-icon"
          />
        </button>

        <div>
          <strong>
            Apparence
          </strong>

          <small>
            Choisissez votre thème
          </small>
        </div>

      </div>

      <div class="menu-separator"></div>

      <button
        v-for="item in themes"
        :key="item.id"
        type="button"
        class="theme-item"
        :class="{
          active: theme === item.id
        }"
        @click="
          selectTheme(item.id)
        "
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

  box-sizing: border-box;

  background: var(--color-surface);

  border: 1px solid var(--color-border);
  border-radius: 14px;

  box-shadow: var(--shadow-menu);

  z-index: 200;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

/* =========================
   MENU ITEM
========================= */

.menu-item {
  width: 100%;

  display: flex;
  align-items: center;
  gap: 11px;

  box-sizing: border-box;

  padding: 10px;

  border: none;
  border-radius: 10px;

  background: transparent;
  color: var(--color-text);

  text-align: left;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.menu-item:hover {
  background: var(--color-surface-hover);
}

.menu-link {
  text-decoration: none;
}

.menu-link:visited {
  color: var(--color-text);
}

.menu-link:hover {
  color: var(--color-text);
}

/* =========================
   ICON
========================= */

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

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

/* =========================
   CONTENT
========================= */

.menu-content {
  min-width: 0;
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-content strong {
  overflow: hidden;

  color: var(--color-text);

  font-size: 13px;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-content small {
  color: var(--color-text-muted);

  font-size: 11px;
}

.menu-arrow {
  flex-shrink: 0;

  color: var(--color-text-muted);
}

/* =========================
   SEPARATOR
========================= */

.menu-separator {
  height: 1px;

  margin: 6px 8px;

  background: var(--color-border);
}

/* =========================
   APPEARANCE HEADER
========================= */

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

/* =========================
   BACK BUTTON
========================= */

.back-button {
  width: 34px;
  height: 34px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;
  border-radius: 9px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.back-button:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}

.back-icon {
  transform: rotate(180deg);
}

/* =========================
   THEME
========================= */

.theme-item {
  width: 100%;

  display: flex;
  align-items: center;
  gap: 10px;

  box-sizing: border-box;

  padding: 9px;

  border: none;
  border-radius: 9px;

  background: transparent;
  color: var(--color-text);

  text-align: left;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.theme-item:hover,
.theme-item.active {
  background: var(--color-surface-hover);
}

.theme-icon {
  width: 34px;
  height: 34px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.theme-label {
  flex: 1;

  color: var(--color-text);

  font-size: 13px;
  font-weight: 500;
}

.theme-check {
  width: 26px;
  height: 26px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  color: var(--color-text);
}

/* =========================
   MOBILE
========================= */

@media (max-width: 480px) {
  .profile-menu {
    width: 230px;
    right: -4px;
  }
}
</style>