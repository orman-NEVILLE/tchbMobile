<script setup>
import {
  LogIn,
  Palette,
  User,
} from 'lucide-vue-next'
</script>

<template>
  <div class="profile-menu">

    <!-- Profil -->
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

    <!-- Apparence -->
    <button
      type="button"
      class="menu-item"
    >
      <span class="menu-icon">
        <Palette :size="18" />
      </span>

      <span class="menu-content">
        <strong>Apparence</strong>
        <small>Modifier le thème</small>
      </span>
    </button>

    <div class="menu-separator"></div>

    <!-- Connexion -->
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

  </div>
</template>

<style scoped>
.profile-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;

  width: 250px;

  padding: 8px;

  background: #ffffff;

  border: 1px solid #e9ecef;
  border-radius: 14px;

  box-shadow:
    0 10px 30px rgba(17, 24, 39, 0.10),
    0 2px 8px rgba(17, 24, 39, 0.06);

  z-index: 200;
}

.menu-item {
  width: 100%;

  display: flex;
  align-items: center;
  gap: 11px;

  padding: 10px;

  border: none;
  border-radius: 10px;

  background: transparent;
  color: #111827;

  text-align: left;

  cursor: pointer;

  transition: background 0.2s ease;
}

.menu-item:hover {
  background: #f8f9fb;
}

.menu-icon {
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: #f1f3f5;
  color: #374151;
}

.menu-content {
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-content strong {
  color: #111827;

  font-size: 13px;
  font-weight: 600;
}

.menu-content small {
  color: #9ca3af;

  font-size: 11px;
  line-height: 1.3;
}

.menu-separator {
  height: 1px;

  margin: 6px 8px;

  background: #eef0f2;
}

/* Mobile */

@media (max-width: 480px) {
  .profile-menu {
    width: 230px;
    right: -4px;
  }
}
</style>