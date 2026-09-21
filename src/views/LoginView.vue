<script setup>
import {
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
  <main class="login-page">

    <!-- =========================
         LOGO
    ========================== -->

    <div class="login-brand">
      <RouterLink
        to="/"
        class="logo-link"
        aria-label="Retour à l'accueil"
      >
        <img
          src="/icons/logo-tchb.png"
          alt="TCHB"
          class="logo"
        />
      </RouterLink>

      <div class="brand-name">
        TCHB
      </div>

      <p class="brand-subtitle">
        Bibliothèque des prédications
      </p>
    </div>

    <!-- =========================
         DÉJÀ CONNECTÉ
    ========================== -->

    <div
      v-if="isAuthenticated"
      class="login-card"
    >
      <div class="connected-state">

        <div class="connected-icon">
          <LogIn
            :size="22"
            :stroke-width="2"
          />
        </div>

        <div class="connected-content">
          <h1>
            Vous êtes déjà connecté
          </h1>

          <p>
            Votre session TCHB est actuellement active.
          </p>
        </div>

        <RouterLink
          to="/profil"
          class="primary-button"
        >
          Mon profil
        </RouterLink>
      </div>
    </div>

    <!-- =========================
         CONNEXION
    ========================== -->

    <section
      v-else
      class="login-card"
    >

      <div class="login-heading">
        <h1>
          Bienvenue
        </h1>

        <p>
          Connectez-vous à votre espace pour accéder
          à vos prédications.
        </p>
      </div>

      <form
        class="login-form"
        @submit.prevent="submitLogin"
      >

        <!-- Téléphone -->
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

          <div class="label-row">
            <label for="password">
              Mot de passe
            </label>
          </div>

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
          role="alert"
        >
          <span>
            {{ errorMessage }}
          </span>
        </div>

        <!-- Connexion -->
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

        <div class="register-separator">
          <span></span>
          <small>OU</small>
          <span></span>
        </div>

        <p>
          Vous n'avez pas encore de compte ?
        </p>

        <button
          type="button"
          class="register-button"
          @click="goToRegister"
        >
          <UserPlus :size="17" />

          <span>
            Demander un compte
          </span>
        </button>

      </div>

    </section>

    <!-- =========================
         FOOTER
    ========================== -->

    <footer class="login-footer">
      <p>
        © {{ new Date().getFullYear() }} TCHB
      </p>

      <span>
        Vos identifiants vous sont communiqués
        après validation de votre demande.
      </span>
    </footer>

  </main>
</template>

<style scoped>
/* ========================================
   PAGE
======================================== */

.login-page {
  min-height: 100vh;
  width: 100%;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px 20px 28px;

  background:
    radial-gradient(
      circle at 50% 0%,
      color-mix(
        in srgb,
        var(--color-text) 4%,
        transparent
      ),
      transparent 420px
    ),
    var(--color-background, var(--color-surface));

  color: var(--color-text);
}

/* ========================================
   BRAND / LOGO
======================================== */

.login-brand {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 28px;

  text-align: center;
}

.logo-link {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 82px;
  height: 82px;

  margin-bottom: 13px;

  border-radius: 20px;

  background: var(--color-surface);

  border: 1px solid var(--color-border);

  box-shadow:
    0 8px 24px
    color-mix(
      in srgb,
      var(--color-text) 7%,
      transparent
    );

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.logo-link:hover {
  transform: translateY(-2px);

  box-shadow:
    0 12px 30px
    color-mix(
      in srgb,
      var(--color-text) 10%,
      transparent
    );
}

.logo {
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
}

.brand-name {
  color: var(--color-text);

  font-size: 20px;
  font-weight: 750;
  letter-spacing: 0.08em;
}

.brand-subtitle {
  margin: 5px 0 0;

  color: var(--color-text-muted);

  font-size: 12px;
}

/* ========================================
   CARD
======================================== */

.login-card {
  width: 100%;
  max-width: 430px;

  box-sizing: border-box;

  padding: 30px;

  background: var(--color-surface);

  border: 1px solid var(--color-border);

  border-radius: 18px;

  box-shadow:
    0 18px 45px
    color-mix(
      in srgb,
      var(--color-text) 7%,
      transparent
    );
}

/* ========================================
   HEADING
======================================== */

.login-heading {
  margin-bottom: 26px;
}

.login-heading h1 {
  margin: 0;

  color: var(--color-text);

  font-size: 24px;
  font-weight: 720;

  letter-spacing: -0.02em;
}

.login-heading p {
  margin: 8px 0 0;

  color: var(--color-text-secondary);

  font-size: 13px;
  line-height: 1.55;
}

/* ========================================
   FORM
======================================== */

.login-form {
  display: flex;
  flex-direction: column;
  gap: 19px;
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

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ========================================
   INPUT
======================================== */

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
  height: 50px;

  box-sizing: border-box;

  padding:
    0 46px 0 43px;

  border: 1px solid var(--color-border);
  border-radius: 10px;

  outline: none;

  background: var(--color-surface);
  color: var(--color-text);

  font-family: inherit;
  font-size: 14px;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.input-wrapper input::placeholder {
  color: var(--color-text-muted);
}

.input-wrapper input:hover {
  border-color: var(--color-text-muted);
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

/* ========================================
   PASSWORD
======================================== */

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

/* ========================================
   ERROR
======================================== */

.error-message {
  padding: 11px 13px;

  border: 1px solid var(--color-border);

  border-radius: 9px;

  background: var(--color-surface-secondary);

  color: var(--color-text-secondary);

  font-size: 12px;
  line-height: 1.5;
}

/* ========================================
   SUBMIT
======================================== */

.submit-button {
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  margin-top: 3px;

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
  transform: scale(0.985);
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

/* ========================================
   REGISTER
======================================== */

.register-section {
  margin-top: 26px;

  text-align: center;
}

.register-separator {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 18px;
}

.register-separator span {
  flex: 1;

  height: 1px;

  background: var(--color-border);
}

.register-separator small {
  color: var(--color-text-muted);

  font-size: 9px;
  font-weight: 600;

  letter-spacing: 0.08em;
}

.register-section p {
  margin: 0 0 11px;

  color: var(--color-text-muted);

  font-size: 12px;
}

.register-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  min-height: 38px;

  padding: 0 14px;

  border: 1px solid var(--color-border);
  border-radius: 9px;

  background: var(--color-surface);

  color: var(--color-text);

  font-family: inherit;
  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease;
}

.register-button:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-text-muted);
}

.register-button:active {
  transform: scale(0.98);
}

/* ========================================
   ALREADY CONNECTED
======================================== */

.connected-state {
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
}

.connected-icon {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 15px;

  border-radius: 12px;

  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.connected-content h1 {
  margin: 0;

  color: var(--color-text);

  font-size: 19px;
  font-weight: 700;
}

.connected-content p {
  margin: 7px 0 22px;

  color: var(--color-text-muted);

  font-size: 12px;
}

.primary-button {
  width: 100%;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  border-radius: 9px;

  background: var(--color-text);
  color: var(--color-surface);

  text-decoration: none;

  font-size: 13px;
  font-weight: 600;
}

/* ========================================
   FOOTER
======================================== */

.login-footer {
  width: 100%;
  max-width: 430px;

  margin-top: 24px;

  text-align: center;
}

.login-footer p {
  margin: 0 0 4px;

  color: var(--color-text-secondary);

  font-size: 11px;
  font-weight: 600;
}

.login-footer span {
  display: block;

  color: var(--color-text-muted);

  font-size: 10px;
  line-height: 1.5;
}

/* ========================================
   MOBILE
======================================== */

@media (max-width: 480px) {
  .login-page {
    min-height: 100dvh;

    padding:
      28px 16px 22px;

    justify-content: center;
  }

  .login-brand {
    margin-bottom: 22px;
  }

  .logo-link {
    width: 70px;
    height: 70px;

    border-radius: 17px;
  }

  .brand-name {
    font-size: 18px;
  }

  .login-card {
    padding: 24px 20px;

    border-radius: 15px;
  }

  .login-heading h1 {
    font-size: 22px;
  }

  .login-footer {
    margin-top: 20px;
  }
}
</style>

