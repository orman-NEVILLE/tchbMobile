<script setup>
import {
  ArrowLeft,
  CheckCircle2,
  LogOut,
  MessageCircle,
  User,
} from 'lucide-vue-next'

import { useRouter } from 'vue-router'

import { useAuth } from '@/composables/useAuth'

const router = useRouter()

const {
  user,
  isAuthenticated,
  logout,
} = useAuth()

const handleLogout = () => {
  logout()

  router.push('/')
}
</script>

<template>
  <div class="profile-page">

    <!-- En-tête -->
    <div class="page-header">
      <RouterLink
        to="/"
        class="back-button"
        aria-label="Retour"
      >
        <ArrowLeft :size="20" />
      </RouterLink>

      <div class="page-header-content">
        <h1>Mon profil</h1>

        <p>
          Gérez vos informations personnelles
        </p>
      </div>
    </div>

    <!-- Utilisateur non connecté -->
    <section
      v-if="!isAuthenticated"
      class="guest-card"
    >
      <div class="guest-icon">
        <User
          :size="28"
          :stroke-width="1.8"
        />
      </div>

      <div class="guest-content">
        <h2>Vous n'êtes pas connecté</h2>

        <p>
          Connectez-vous pour accéder à votre
          profil et à vos informations personnelles.
        </p>

        <RouterLink
          to="/connexion"
          class="login-link"
        >
          <LogOut
            :size="17"
            class="login-link-icon"
          />

          <span>
            Se connecter
          </span>
        </RouterLink>
      </div>
    </section>

    <!-- Profil connecté -->
    <template v-else>

      <!-- Profil principal -->
      <section class="profile-card">
        <div class="profile-avatar">
          <User
            :size="32"
            :stroke-width="1.8"
          />
        </div>

        <div class="profile-main-info">
          <h2>
            {{ user?.name }}
          </h2>

          <div class="profile-status">
            <CheckCircle2
              :size="14"
              :stroke-width="2"
            />

            <span>
              Compte actif
            </span>
          </div>
        </div>
      </section>

      <!-- Informations personnelles -->
      <section class="profile-section">
        <div class="section-heading">
          <h2>
            Informations personnelles
          </h2>

          <p>
            Vos informations de compte
          </p>
        </div>

        <div class="information-list">

          <!-- Nom -->
          <div class="information-item">
            <div class="information-icon">
              <User :size="18" />
            </div>

            <div class="information-content">
              <span class="information-label">
                Nom complet
              </span>

              <strong>
                {{ user?.name }}
              </strong>
            </div>
          </div>

          <!-- WhatsApp -->
          <div class="information-item">
            <div class="information-icon">
              <MessageCircle :size="18" />
            </div>

            <div class="information-content">
              <span class="information-label">
                Numéro WhatsApp
              </span>

              <strong>
                {{ user?.whatsapp }}
              </strong>
            </div>
          </div>

        </div>
      </section>

      <!-- Compte -->
      <section class="profile-section">
        <div class="section-heading">
          <h2>
            Compte
          </h2>

          <p>
            Gestion de votre session
          </p>
        </div>

        <button
          type="button"
          class="logout-button"
          @click="handleLogout"
        >
          <span class="logout-icon">
            <LogOut :size="18" />
          </span>

          <span class="logout-content">
            <strong>
              Déconnexion
            </strong>

            <small>
              Se déconnecter de votre compte
            </small>
          </span>
        </button>
      </section>

    </template>

  </div>
</template>

<style scoped>
.profile-page {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}

/* =========================
   HEADER
========================= */

.page-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.back-button {
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--color-border);
  border-radius: 50%;

  background: var(--color-surface);
  color: var(--color-text-secondary);

  text-decoration: none;

  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease;
}

.back-button:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}

.back-button:active {
  transform: scale(0.96);
}

.page-header-content {
  min-width: 0;
}

.page-header-content h1 {
  margin: 0;

  color: var(--color-text);

  font-size: 22px;
  font-weight: 700;
}

.page-header-content p {
  margin: 4px 0 0;

  color: var(--color-text-muted);

  font-size: 13px;
}

/* =========================
   GUEST
========================= */

.guest-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  padding: 20px;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
}

.guest-icon {
  width: 52px;
  height: 52px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.guest-content {
  min-width: 0;
}

.guest-content h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 16px;
  font-weight: 650;
}

.guest-content p {
  margin: 6px 0 16px;

  color: var(--color-text-secondary);

  font-size: 13px;
  line-height: 1.5;
}

.login-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  min-height: 40px;

  padding: 0 14px;

  border-radius: 9px;

  background: var(--color-text);
  color: var(--color-surface);

  text-decoration: none;

  font-size: 13px;
  font-weight: 600;

  transition:
    opacity 0.2s ease,
    transform 0.15s ease;
}

.login-link:hover {
  opacity: 0.88;
}

.login-link:active {
  transform: scale(0.98);
}

/* =========================
   PROFILE CARD
========================= */

.profile-card {
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 20px;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.profile-avatar {
  width: 64px;
  height: 64px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.profile-main-info {
  min-width: 0;
}

.profile-main-info h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 18px;
  font-weight: 700;
}

.profile-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;

  margin-top: 7px;

  color: var(--color-text-muted);

  font-size: 11px;
}

/* =========================
   SECTIONS
========================= */

.profile-section {
  margin-top: 26px;
}

.section-heading {
  margin-bottom: 12px;
}

.section-heading h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 15px;
  font-weight: 650;
}

.section-heading p {
  margin: 4px 0 0;

  color: var(--color-text-muted);

  font-size: 11px;
}

/* =========================
   INFORMATION
========================= */

.information-list {
  overflow: hidden;

  background: var(--color-surface);

  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.information-item {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px 15px;
}

.information-item + .information-item {
  border-top: 1px solid var(--color-border);
}

.information-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.information-content {
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 3px;
}

.information-label {
  color: var(--color-text-muted);

  font-size: 11px;
}

.information-content strong {
  color: var(--color-text);

  font-size: 13px;
  font-weight: 550;

  word-break: break-word;
}

/* =========================
   LOGOUT
========================= */

.logout-button {
  width: 100%;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 13px 14px;

  border: 1px solid var(--color-border);
  border-radius: 12px;

  background: var(--color-surface);

  color: var(--color-text);

  text-align: left;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease;
}

.logout-button:hover {
  background: var(--color-surface-hover);
}

.logout-button:active {
  transform: scale(0.99);
}

.logout-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.logout-content {
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 3px;
}

.logout-content strong {
  color: var(--color-text);

  font-size: 13px;
  font-weight: 600;
}

.logout-content small {
  color: var(--color-text-muted);

  font-size: 11px;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 480px) {
  .page-header {
    margin-bottom: 22px;
  }

  .page-header-content h1 {
    font-size: 20px;
  }

  .guest-card {
    padding: 17px;
  }

  .profile-card {
    padding: 17px;
  }

  .profile-avatar {
    width: 58px;
    height: 58px;
  }
}
</style>