<script setup>
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
  User,
} from 'lucide-vue-next'

import { ref } from 'vue'

const fullName = ref('')
const whatsapp = ref('')
const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const submitRequest = async () => {
  if (!fullName.value.trim() || !whatsapp.value.trim()) {
    return
  }

  isSubmitting.value = true

  // Simulation de l'envoi
  await new Promise((resolve) => {
    setTimeout(resolve, 800)
  })

  isSubmitting.value = false
  showSuccessModal.value = true

  fullName.value = ''
  whatsapp.value = ''
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}
</script>

<template>
  <div class="register-page">

    <!-- Retour -->
    <div class="page-header">
      <RouterLink
        to="/"
        class="back-button"
        aria-label="Retour"
      >
        <ArrowLeft :size="20" />
      </RouterLink>

      <div class="page-header-content">
        <h1>Créer un compte</h1>
        <p>Demandez votre accès à TCHB</p>
      </div>
    </div>

    <!-- Introduction -->
    <section class="intro-section">
      <div class="intro-icon">
        <User
          :size="24"
          :stroke-width="2"
        />
      </div>

      <div>
        <h2>Demande d'inscription</h2>

        <p>
          Remplissez le formulaire ci-dessous pour
          demander votre compte TCHB.
        </p>
      </div>
    </section>

    <!-- Formulaire -->
    <form
      class="register-form"
      @submit.prevent="submitRequest"
    >

      <!-- Nom complet -->
      <div class="form-group">

        <label for="fullName">
          Nom complet
        </label>

        <div class="input-wrapper">
          <User
            :size="18"
            class="input-icon"
          />

          <input
            id="fullName"
            v-model="fullName"
            type="text"
            placeholder="Ex. Jean Dupont"
            autocomplete="name"
            required
          />
        </div>

      </div>

      <!-- WhatsApp -->
      <div class="form-group">

        <label for="whatsapp">
          Numéro WhatsApp
        </label>

        <div class="input-wrapper">
          <MessageCircle
            :size="18"
            class="input-icon"
          />

          <input
            id="whatsapp"
            v-model="whatsapp"
            type="tel"
            placeholder="Ex. +243 81 234 56 78"
            autocomplete="tel"
            required
          />
        </div>

        <p class="field-help">
          Utilisez un numéro WhatsApp auquel vous
          pouvez recevoir des messages.
        </p>

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
              : 'Envoyer la demande'
          }}
        </span>
      </button>

    </form>

    <!-- Information -->
    <div class="info-box">
      <CheckCircle2 :size="18" />

      <p>
        Après validation de votre demande, vous
        recevrez vos identifiants de connexion par
        WhatsApp.
      </p>
    </div>

    <!-- =========================
         Popup de succès
    ========================== -->

    <div
      v-if="showSuccessModal"
      class="modal-overlay"
      @click.self="closeSuccessModal"
    >
      <div class="success-modal">

        <div class="success-icon">
          <CheckCircle2
            :size="30"
            :stroke-width="2"
          />
        </div>

        <h2>
          Demande envoyée
        </h2>

        <p>
          Votre demande a été envoyée avec succès.
          Vous recevrez un message contenant vos
          identifiants de connexion.
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

  </div>
</template>

<style scoped>
.register-page {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}

/* =========================
   En-tête
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

  border-radius: 50%;

  background: var(--color-surface);
  border: 1px solid var(--color-border);

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
   Introduction
========================= */

.intro-section {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  padding: 18px;

  margin-bottom: 26px;

  background: var(--color-surface-secondary);

  border: 1px solid var(--color-border);
  border-radius: 14px;
}

.intro-icon {
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

.intro-section h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 15px;
  font-weight: 650;
}

.intro-section p {
  margin: 5px 0 0;

  color: var(--color-text-secondary);

  font-size: 13px;
  line-height: 1.5;
}

/* =========================
   Formulaire
========================= */

.register-form {
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

  transition: color 0.2s ease;
}

.input-wrapper:focus-within .input-icon {
  color: var(--color-text);
}

.input-wrapper input {
  width: 100%;
  height: 48px;

  box-sizing: border-box;

  padding: 0 14px 0 42px;

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

.field-help {
  margin: 0;

  color: var(--color-text-muted);

  font-size: 11px;
  line-height: 1.5;
}

/* =========================
   Bouton
========================= */

.submit-button {
  width: 100%;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  margin-top: 4px;

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
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease,
    opacity 0.2s ease;
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
   Information
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
   Popup
========================= */

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

  animation: modal-in 0.2s ease-out;
}

.success-icon {
  width: 58px;
  height: 58px;

  margin: 0 auto 16px;

  display: flex;
  align-items: center;
  justify-content: center;

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
  margin: 10px 0 22px;

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
    transform: translateY(8px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* =========================
   Mobile
========================= */

@media (max-width: 480px) {
  .page-header {
    margin-bottom: 22px;
  }

  .page-header-content h1 {
    font-size: 20px;
  }

  .intro-section {
    padding: 15px;
  }

  .audio-player {
    padding: 16px;
  }

  .success-modal {
    max-width: 340px;
  }
}
</style>