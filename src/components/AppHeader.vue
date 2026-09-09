<script setup>
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import NotificationButton from '@/components/NotificationButton.vue'
import ProfileButton from '@/components/ProfileButton.vue'
import ProfileMenu from '@/components/ProfileMenu.vue'

const isProfileMenuOpen = ref(false)

const profileWrapper = ref(null)

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false
}

const handleClickOutside = (event) => {
  if (
    profileWrapper.value &&
    !profileWrapper.value.contains(event.target)
  ) {
    closeProfileMenu()
  }
}

onMounted(() => {
  document.addEventListener(
    'click',
    handleClickOutside
  )
})

onBeforeUnmount(() => {
  document.removeEventListener(
    'click',
    handleClickOutside
  )
})
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
        <div
        ref="profileWrapper"
        class="profile-wrapper"
        @click.stop
        >

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

  background: var(--color-surface);
  backdrop-filter: blur(10px);

  border-bottom: 1px solid var(--color-border);

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
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

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  color: var(--color-text);
  text-decoration: none;
}

.brand-logo {
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: var(--color-text);
  color: var(--color-surface);

  font-size: 16px;
  font-weight: 750;
}

.brand-name {
  color: var(--color-text);

  font-size: 18px;
  font-weight: 750;
  letter-spacing: 0.3px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-wrapper {
  position: relative;
}

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