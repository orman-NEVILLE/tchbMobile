<script setup>
import {
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  LogIn,
  MessageCircle,
  UserPlus,
} from 'lucide-vue-next'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuth } from '@/composables/useAuth'
import { login as loginRequest } from '@/functions/auth'

const router = useRouter()

const {
  isAuthenticated,
  setSession,
} = useAuth()

const phone_number = ref('')
const password = ref('')

const showPassword = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')

const submitLogin = async () => {
  errorMessage.value = ''

  if (!phone_number.value.trim()) {
    errorMessage.value =
      'Veuillez renseigner votre numéro de téléphone.'

    return
  }

  if (!password.value) {
    errorMessage.value =
      'Veuillez renseigner votre mot de passe.'

    return
  }

  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await loginRequest({
      phone_number: phone_number.value.trim(),
      password: password.value,
    })

    setSession({
      user: response.user,
      token: response.token,
    })

    router.push('/')
  } catch (error) {
    console.error(
      'Erreur lors de la connexion :',
      error
    )

    errorMessage.value =
      error.message ||
      'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
  }
}

const goToRegister = () => {
  router.push('/inscription')
}
</script>

<template>
  <div class="login-page">

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
        <h1>Connexion</h1>

        <p>
          Accédez à votre espace TCHB
        </p>
      </div>
    </div>

    <!-- Déjà connecté -->
    <div
      v-if="isAuthenticated"
      class="already-connected"
    >
      <div class="already-connected-icon">
        <LogIn
          :size="20"
          :stroke-width="2"
        />
      </div>

      <div class="already-connected-content">
        <strong>
          Vous êtes déjà connecté
        </strong>

        <span>
          Votre session TCHB est active.
        </span>
      </div>

      <RouterLink
        to="/profil"
        class="profile-link"
      >
        Mon profil
      </RouterLink>
    </div>

    <!-- Formulaire -->
    <template v-else>

      <!-- Introduction -->
      <section class="login-intro">
        <div class="login-icon">
          <LogIn
            :size="24"
            :stroke-width="2"
          />
        </div>

        <div>
          <h2>Bienvenue</h2>

          <p>
            Connectez-vous avec les identifiants
            qui vous ont été communiqués.
          </p>
        </div>
      </section>

      <form
        class="login-form"
        @submit.prevent="submitLogin"
      >

        <!-- Numéro de téléphone -->
        <div class="form-group">
          <label for="phone_number">
            Numéro de téléphone
          </label>

          <div class="input-wrapper">
            <MessageCircle
              :size="18"
              class="input-icon"
            />

            <input
              id="phone_number"
              v-model="phone_number"
              type="tel"
              inputmode="tel"
              placeholder="+243 81 234 56 78"
              autocomplete="tel"
              required
            />
          </div>
        </div>

        <!-- Mot de passe -->
        <div class="form-group">
          <label for="password">
            Mot de passe
          </label>

          <div class="input-wrapper">
            <KeyRound
              :size="18"
              class="input-icon"
            />

            <input
              id="password"
              v-model="password"
              :type="
                showPassword
                  ? 'text'
                  : 'password'
              "
              placeholder="Votre mot de passe"
              autocomplete="current-password"
              required
            />

            <button
              type="button"
              class="password-toggle"
              :aria-label="
                showPassword
                  ? 'Masquer le mot de passe'
                  : 'Afficher le mot de passe'
              "
              :title="
                showPassword
                  ? 'Masquer le mot de passe'
                  : 'Afficher le mot de passe'
              "
              @click="
                showPassword = !showPassword
              "
            >
              <EyeOff
                v-if="showPassword"
                :size="18"
              />

              <Eye
                v-else
                :size="18"
              />
            </button>
          </div>
        </div>

        <!-- Erreur -->
        <div
          v-if="errorMessage"
          class="error-message"
        >
          {{ errorMessage }}
        </div>

        <!-- Bouton -->
        <button
          type="submit"
          class="submit-button"
          :disabled="isSubmitting"
        >
          <LoaderCircle
            v-if="isSubmitting"
            class="loading-icon"
            :size="19"
          />

          <LogIn
            v-else
            :size="19"
          />

          <span>
            {{
              isSubmitting
                ? 'Connexion en cours...'
                : 'Se connecter'
            }}
          </span>
        </button>
      </form>

      <!-- Inscription -->
      <div class="register-section">
        <span>
          Vous n'avez pas encore de compte ?
        </span>

        <button
          type="button"
          class="register-button"
          @click="goToRegister"
        >
          <UserPlus :size="17" />

          <span>
            Créer un compte
          </span>
        </button>
      </div>

      <!-- Information -->
      <div class="info-box">
        <MessageCircle :size="18" />

        <p>
          Vos identifiants de connexion vous sont
          communiqués après validation de votre
          demande d'inscription.
        </p>
      </div>

    </template>

  </div>
</template>

<style scoped>
.login-page {
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
   INTRO
========================= */

.login-intro {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  padding: 18px;
  margin-bottom: 26px;

  background: var(--color-surface-secondary);
  border: 1px solid var(--color-border);
  border-radius: 14px;
}

.login-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 11px;

  background: var(--color-text);
  color: var(--color-surface);
}

.login-intro h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 15px;
  font-weight: 650;
}

.login-intro p {
  margin: 5px 0 0;

  color: var(--color-text-secondary);

  font-size: 13px;
  line-height: 1.5;
}

/* =========================
   ALREADY CONNECTED
========================= */

.already-connected {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 16px;

  border: 1px solid var(--color-border);
  border-radius: 12px;

  background: var(--color-surface);
}

.already-connected-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.already-connected-content {
  min-width: 0;
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 3px;
}

.already-connected-content strong {
  color: var(--color-text);

  font-size: 13px;
  font-weight: 600;
}

.already-connected-content span {
  color: var(--color-text-muted);

  font-size: 11px;
}

.profile-link {
  flex-shrink: 0;

  padding: 8px 10px;

  border-radius: 8px;

  background: var(--color-surface-secondary);
  color: var(--color-text);

  text-decoration: none;

  font-size: 12px;
  font-weight: 600;

  transition:
    background-color 0.2s ease;
}

.profile-link:hover {
  background: var(--color-surface-hover);
}

/* =========================
   FORM
========================= */

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: var(--color-text);

  font-size: 13px;
  font-weight: 600;
}

/* =========================
   INPUT
========================= */

.input-wrapper {
  position: relative;

  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;

  color: var(--color-text-muted);

  pointer-events: none;

  transition:
    color 0.2s ease;
}

.input-wrapper:focus-within .input-icon {
  color: var(--color-text);
}

.input-wrapper input {
  width: 100%;
  height: 48px;

  box-sizing: border-box;

  padding: 0 46px 0 42px;

  border: 1px solid var(--color-border);
  border-radius: 10px;

  outline: none;

  background: var(--color-surface);
  color: var(--color-text);

  font-family: inherit;
  font-size: 14px;

  transition:
    border-color 0.2s ease,
    background-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.2s ease;
}

.input-wrapper input::placeholder {
  color: var(--color-text-muted);
}

.input-wrapper input:focus {
  border-color: var(--color-text-secondary);

  box-shadow:
    0 0 0 3px
    color-mix(
      in srgb,
      var(--color-text) 8%,
      transparent
    );
}

/* =========================
   PASSWORD
========================= */

.password-toggle {
  position: absolute;
  right: 7px;

  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;
  border-radius: 8px;

  background: transparent;
  color: var(--color-text-muted);

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.password-toggle:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}

/* =========================
   ERROR
========================= */

.error-message {
  padding: 12px 14px;

  border: 1px solid var(--color-border);
  border-radius: 9px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);

  font-size: 12px;
  line-height: 1.5;
}

/* =========================
   SUBMIT
========================= */

.submit-button {
  width: 100%;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  margin-top: 2px;
  padding: 0 18px;

  border: none;
  border-radius: 10px;

  background: var(--color-text);
  color: var(--color-surface);

  font-family: inherit;
  font-size: 14px;
  font-weight: 650;

  cursor: pointer;

  transition:
    opacity 0.2s ease,
    transform 0.15s ease;
}

.submit-button:hover:not(:disabled) {
  opacity: 0.88;
}

.submit-button:active:not(:disabled) {
  transform: scale(0.99);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-icon {
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================
   REGISTER
========================= */

.register-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;

  margin-top: 26px;

  color: var(--color-text-muted);

  font-size: 12px;
  text-align: center;
}

.register-button {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  padding: 7px 10px;

  border: none;
  border-radius: 8px;

  background: transparent;
  color: var(--color-text);

  font-family: inherit;
  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease;
}

.register-button:hover {
  background: var(--color-surface-hover);
}

/* =========================
   INFO
========================= */

.info-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;

  margin-top: 22px;
  padding: 14px;

  border: 1px solid var(--color-border);
  border-radius: 10px;

  background: var(--color-surface);
  color: var(--color-text-muted);
}

.info-box svg {
  flex-shrink: 0;
  margin-top: 1px;
}

.info-box p {
  margin: 0;

  font-size: 11px;
  line-height: 1.5;
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

  .login-intro {
    padding: 15px;
  }

  .already-connected {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .already-connected-content {
    min-width: calc(100% - 52px);
  }

  .profile-link {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
  }
}
</style>