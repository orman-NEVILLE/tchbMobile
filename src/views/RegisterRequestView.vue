<script setup>
import {
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
  User,
} from 'lucide-vue-next'

import { ref } from 'vue'

import { submitAccountRequest } from '@/functions/accountRequest'

const name = ref('')
const phone_number = ref('')

const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

const submitForm = async () => {
  errorMessage.value = ''

  if (!name.value.trim()) {
    errorMessage.value =
      'Veuillez renseigner votre nom complet.'

    return
  }

  if (!phone_number.value.trim()) {
    errorMessage.value =
      'Veuillez renseigner votre numéro WhatsApp.'

    return
  }

  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await submitAccountRequest({
      name: name.value.trim(),
      phone_number: phone_number.value.trim(),
    })

    successMessage.value = response.message

    name.value = ''
    phone_number.value = ''

    showSuccessModal.value = true
  } catch (error) {
    console.error(
      'Erreur lors de l’envoi de la demande :',
      error
    )

    errorMessage.value =
      error.message ||
      'Impossible d’envoyer votre demande. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
  }
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}
</script>

<template>
  <main class="register-page">

    <!-- =========================
         LOGO
    ========================== -->

    <div class="register-brand">

      <RouterLink
        to="/"
        class="logo-link"
        aria-label="Retour à l'accueil"
      >
        <img
          src="/icons/logo-tchb.png"
          alt="Logo TCHB"
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
         CARTE
    ========================== -->

    <section class="register-card">

      <!-- Introduction -->

      <div class="register-heading">

        <h1>
          Créer un compte
        </h1>

        <p>
          Demandez votre accès à la bibliothèque
          des ressources TCHB.
        </p>

      </div>


      <!-- Formulaire -->

      <form
        class="register-form"
        @submit.prevent="submitForm"
      >

        <!-- Nom complet -->

        <div class="form-group">

          <label for="name">
            Nom complet
          </label>

          <div class="input-wrapper">

            <User
              :size="18"
              class="input-icon"
            />

            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Ex. Jean Dupont"
              autocomplete="name"
              required
            />

          </div>

        </div>


        <!-- Numéro WhatsApp -->

        <div class="form-group">

          <label for="phone_number">
            Numéro WhatsApp
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

          <p class="field-help">
            Utilisez un numéro WhatsApp auquel vous
            pouvez recevoir des messages.
          </p>

        </div>


        <!-- Erreur -->

        <div
          v-if="errorMessage"
          class="error-message"
          role="alert"
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

          <MessageCircle
            v-else
            :size="19"
          />

          <span>
            {{
              isSubmitting
                ? 'Envoi en cours...'
                : 'Envoyer ma demande'
            }}
          </span>

        </button>

      </form>


      <!-- Séparateur -->

      <div class="separator">
        <span></span>
        <small>INFORMATION</small>
        <span></span>
      </div>


      <!-- Information -->

      <div class="info-box">

        <div class="info-icon">
          <CheckCircle2
            :size="18"
          />
        </div>

        <div>
          <strong>
            Après votre demande
          </strong>

          <p>
            Votre demande sera examinée par
            l'administration. Après validation,
            vos identifiants vous seront envoyés
            par WhatsApp.
          </p>
        </div>

      </div>


      <!-- Retour connexion -->

      <div class="login-link-section">

        <span>
          Vous avez déjà un compte ?
        </span>

        <RouterLink
          to="/connexion"
          class="login-link"
        >
          Se connecter
        </RouterLink>

      </div>

    </section>


    <!-- =========================
         FOOTER
    ========================== -->

    <footer class="register-footer">

      <p>
        © {{ new Date().getFullYear() }} TCHB
      </p>

      <span>
        Accès réservé aux membres autorisés.
      </span>

    </footer>


    <!-- =========================
         MODAL SUCCÈS
    ========================== -->

    <div
      v-if="showSuccessModal"
      class="modal-overlay"
      @click.self="closeSuccessModal"
    >

      <div
        class="success-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >

        <div class="success-icon">

          <CheckCircle2
            :size="30"
            :stroke-width="2"
          />

        </div>

        <h2 id="success-title">
          Demande envoyée
        </h2>

        <p>
          {{ successMessage }}
        </p>

        <button
          type="button"
          class="modal-button"
          @click="closeSuccessModal"
        >
          Compris
        </button>

      </div>

    </div>

  </main>
</template>


<style scoped>

/* ========================================
   PAGE
======================================== */

.register-page {
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
    var(--color-background);

  color: var(--color-text);
}


/* ========================================
   BRAND
======================================== */

.register-brand {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 28px;

  text-align: center;
}

.logo-link {
  width: 82px;
  height: 82px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 13px;

  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: 20px;

  background: var(--color-surface);

  box-shadow:
    0 8px 24px
    color-mix(
      in srgb,
      var(--color-text) 7%,
      transparent
    );

  text-decoration: none;

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

.register-card {
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

.register-heading {
  margin-bottom: 26px;
}

.register-heading h1 {
  margin: 0;

  color: var(--color-text);

  font-size: 24px;
  font-weight: 720;

  letter-spacing: -0.02em;
}

.register-heading p {
  margin: 8px 0 0;

  color: var(--color-text-secondary);

  font-size: 13px;
  line-height: 1.55;
}


/* ========================================
   FORM
======================================== */

.register-form {
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
    0 14px 0 43px;

  border: 1px solid var(--color-border);
  border-radius: 10px;

  outline: none;

  background: var(--color-surface);
  color: var(--color-text);

  font-family: inherit;
  font-size: 14px;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
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
   AIDE
======================================== */

.field-help {
  margin: 0;

  color: var(--color-text-muted);

  font-size: 11px;
  line-height: 1.5;
}


/* ========================================
   ERREUR
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
   BOUTON
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
  animation:
    spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


/* ========================================
   SÉPARATEUR
======================================== */

.separator {
  display: flex;
  align-items: center;

  gap: 10px;

  margin:
    26px 0 18px;
}

.separator span {
  flex: 1;

  height: 1px;

  background: var(--color-border);
}

.separator small {
  color: var(--color-text-muted);

  font-size: 9px;
  font-weight: 600;

  letter-spacing: 0.08em;
}


/* ========================================
   INFORMATION
======================================== */

.info-box {
  display: flex;
  align-items: flex-start;

  gap: 11px;

  padding: 14px;

  border: 1px solid var(--color-border);
  border-radius: 10px;

  background: var(--color-surface-secondary);
}

.info-icon {
  flex-shrink: 0;

  color: var(--color-text-secondary);

  margin-top: 1px;
}

.info-box strong {
  display: block;

  margin-bottom: 4px;

  color: var(--color-text);

  font-size: 12px;
  font-weight: 650;
}

.info-box p {
  margin: 0;

  color: var(--color-text-muted);

  font-size: 11px;
  line-height: 1.5;
}


/* ========================================
   CONNEXION
======================================== */

.login-link-section {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 7px;

  margin-top: 24px;

  text-align: center;
}

.login-link-section > span {
  color: var(--color-text-muted);

  font-size: 12px;
}

.login-link {
  display: inline-flex;
  align-items: center;

  min-height: 36px;

  padding: 0 13px;

  border: 1px solid var(--color-border);
  border-radius: 9px;

  background: var(--color-surface);

  color: var(--color-text);

  text-decoration: none;

  font-size: 12px;
  font-weight: 600;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.login-link:hover {
  background: var(--color-surface-hover);

  border-color:
    var(--color-text-muted);
}


/* ========================================
   FOOTER
======================================== */

.register-footer {
  width: 100%;
  max-width: 430px;

  margin-top: 24px;

  text-align: center;
}

.register-footer p {
  margin: 0 0 4px;

  color: var(--color-text-secondary);

  font-size: 11px;
  font-weight: 600;
}

.register-footer span {
  display: block;

  color: var(--color-text-muted);

  font-size: 10px;
  line-height: 1.5;
}


/* ========================================
   MODAL
======================================== */

.modal-overlay {
  position: fixed;

  z-index: 200;

  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(0, 0, 0, 0.45);

  backdrop-filter: blur(4px);
}

.success-modal {
  width: 100%;
  max-width: 360px;

  box-sizing: border-box;

  padding: 26px 22px 22px;

  background: var(--color-surface);

  border: 1px solid var(--color-border);
  border-radius: 16px;

  text-align: center;

  box-shadow: var(--shadow-menu);

  animation:
    modal-in 0.2s ease-out;
}

.success-icon {
  width: 58px;
  height: 58px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto 16px;

  border-radius: 50%;

  background: var(--color-surface-secondary);

  color: var(--color-text);
}

.success-modal h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 18px;
  font-weight: 700;
}

.success-modal p {
  margin:
    10px 0 22px;

  color: var(--color-text-secondary);

  font-size: 13px;
  line-height: 1.6;
}

.modal-button {
  width: 100%;
  height: 44px;

  border: none;
  border-radius: 9px;

  background: var(--color-text);
  color: var(--color-surface);

  font-family: inherit;
  font-size: 13px;
  font-weight: 650;

  cursor: pointer;

  transition:
    opacity 0.2s ease,
    transform 0.15s ease;
}

.modal-button:hover {
  opacity: 0.88;
}

.modal-button:active {
  transform: scale(0.99);
}

@keyframes modal-in {
  from {
    opacity: 0;

    transform:
      translateY(8px)
      scale(0.98);
  }

  to {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);
  }
}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 480px) {

  .register-page {
    min-height: 100dvh;

    padding:
      28px 16px 22px;

    justify-content: center;
  }

  .register-brand {
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

  .register-card {
    padding:
      24px 20px;

    border-radius: 15px;
  }

  .register-heading h1 {
    font-size: 22px;
  }

  .register-footer {
    margin-top: 20px;
  }

  .success-modal {
    max-width: 340px;
  }
}
</style>
