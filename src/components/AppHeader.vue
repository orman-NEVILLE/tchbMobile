<script setup>
import { ref } from 'vue'

import NotificationButton from '@/components/NotificationButton.vue'
import ProfileButton from '@/components/ProfileButton.vue'
import ProfileMenu from '@/components/ProfileMenu.vue'

const isProfileMenuOpen = ref(false)

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="header-content">

      <!-- Logo -->
      <RouterLink
        to="/"
        class="brand"
        aria-label="Accueil TCHB"
      >
        <div class="brand-logo">
          T
        </div>

        <span class="brand-name">
          TCHB
        </span>
      </RouterLink>

      <!-- Actions -->
      <div class="header-actions">

        <NotificationButton />

        <!-- Profil -->
        <div class="profile-wrapper">

          <ProfileButton
            @click="toggleProfileMenu"
          />

          <ProfileMenu
            v-if="isProfileMenuOpen"
          />

        </div>

      </div>

    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;

  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);

  border-bottom: 1px solid #e9ecef;
}

.header-content {
  width: 100%;
  max-width: 768px;
  height: 68px;

  margin: 0 auto;
  padding: 0 20px;

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand */

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  color: #111827;
  text-decoration: none;
}

.brand-logo {
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #111827;
  color: #ffffff;

  font-size: 16px;
  font-weight: 750;
}

.brand-name {
  color: #111827;

  font-size: 18px;
  font-weight: 750;
  letter-spacing: 0.3px;
}

/* Actions */

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Profile */

.profile-wrapper {
  position: relative;
}

/* Mobile */

@media (max-width: 480px) {
  .header-content {
    padding-left: 16px;
    padding-right: 16px;
  }

  .brand-logo {
    width: 34px;
    height: 34px;
  }

  .brand-name {
    font-size: 17px;
  }
}
</style>