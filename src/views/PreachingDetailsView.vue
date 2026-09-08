<script setup>
import {
  ArrowLeft,
  Play,
  CalendarDays,
  Clock,
  User,
  Share2,
} from 'lucide-vue-next'

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const preachings = [
  {
    id: 1,
    title: 'La foi qui transforme',
    preacher: 'Pasteur Jean',
    date: '07 Septembre 2026',
    duration: '32:15',
    description:
      'Un enseignement sur la puissance de la foi et son impact dans notre vie quotidienne.',
  },
  {
    id: 2,
    title: 'Le chemin de la foi',
    preacher: 'Pasteur David',
    date: '05 Septembre 2026',
    duration: '41:20',
    description:
      'Découvrez les étapes essentielles pour avancer avec confiance dans le chemin de la foi.',
  },
  {
    id: 3,
    title: 'Marcher dans la lumière',
    preacher: 'Pasteur Jean',
    date: '01 Septembre 2026',
    duration: '36:42',
    description:
      'Un message qui nous encourage à vivre chaque jour dans la lumière et la vérité.',
  },
  {
    id: 4,
    title: 'Une foi persévérante',
    preacher: 'Pasteur David',
    date: '28 Août 2026',
    duration: '29:18',
    description:
      'Apprenons à garder une foi solide même lorsque les circonstances deviennent difficiles.',
  },
  {
    id: 5,
    title: 'La puissance de la Parole',
    preacher: 'Pasteur Michel',
    date: '24 Août 2026',
    duration: '44:07',
    description:
      'Une réflexion sur la place de la Parole dans la vie du croyant.',
  },
]

const preaching = computed(() => {
  return preachings.find(
    item => item.id === Number(route.params.id)
  )
})

function goBack() {
  router.back()
}

function sharePreaching() {
  // Fonctionnalité à connecter plus tard
  console.log('Partager la prédication')
}
</script>

<template>
  <div
    v-if="preaching"
    class="detail-page"
  >

    <!-- Retour -->
    <div class="top-bar">

      <button
        class="back-button"
        type="button"
        aria-label="Retour"
        @click="goBack"
      >
        <ArrowLeft :size="21" />
      </button>

      <h1>Prédication</h1>

      <button
        class="share-button"
        type="button"
        aria-label="Partager"
        @click="sharePreaching"
      >
        <Share2 :size="20" />
      </button>

    </div>

    <!-- Lecteur -->
    <section class="player">

      <div class="player-background">
        <div class="player-content">

          <div class="player-icon">
            <Play
              :size="30"
              fill="currentColor"
            />
          </div>

          <span class="player-label">
            Prédication
          </span>

        </div>
      </div>

      <div class="player-controls">

        <div class="progress">
          <div class="progress-bar"></div>
        </div>

        <div class="player-time">
          <span>00:00</span>
          <span>{{ preaching.duration }}</span>
        </div>

      </div>

    </section>

    <!-- Informations -->
    <section class="preaching-info">

      <h2>
        {{ preaching.title }}
      </h2>

      <div class="preacher">
        <User :size="17" />
        <span>{{ preaching.preacher }}</span>
      </div>

      <div class="metadata">

        <div class="metadata-item">
          <CalendarDays :size="16" />
          <span>{{ preaching.date }}</span>
        </div>

        <div class="metadata-item">
          <Clock :size="16" />
          <span>{{ preaching.duration }}</span>
        </div>

      </div>

    </section>

    <!-- Description -->
    <section class="description-section">

      <h3>À propos de cette prédication</h3>

      <p>
        {{ preaching.description }}
      </p>

    </section>

  </div>

  <!-- Prédication introuvable -->
  <div
    v-else
    class="not-found"
  >
    <h2>Prédication introuvable</h2>

    <button
      type="button"
      @click="router.push('/predications')"
    >
      Retour aux prédications
    </button>
  </div>
</template>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* =========================
   TOP BAR
========================= */

.top-bar {
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  gap: 10px;
}

.top-bar h1 {
  margin: 0;

  text-align: center;

  color: #111827;

  font-size: 16px;
  font-weight: 650;
}

.back-button,
.share-button {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #e5e7eb;
  border-radius: 10px;

  background: #ffffff;
  color: #374151;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.back-button:hover,
.share-button:hover {
  background: #f3f4f6;
}

.back-button:active,
.share-button:active {
  transform: scale(0.96);
}

/* =========================
   PLAYER
========================= */

.player {
  overflow: hidden;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 16px;
}

.player-background {
  height: 220px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #111827;
}

.player-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  color: #ffffff;
}

.player-icon {
  width: 64px;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.1);
}

.player-label {
  font-size: 13px;
  font-weight: 500;

  opacity: 0.8;
}

.player-controls {
  padding: 14px 16px 12px;
}

.progress {
  width: 100%;
  height: 4px;

  overflow: hidden;

  border-radius: 10px;

  background: #e5e7eb;
}

.progress-bar {
  width: 0%;
  height: 100%;

  background: #111827;
}

.player-time {
  display: flex;
  justify-content: space-between;

  margin-top: 7px;

  color: #9ca3af;

  font-size: 11px;
}

/* =========================
   INFORMATIONS
========================= */

.preaching-info h2 {
  margin: 0;

  color: #111827;

  font-size: 24px;
  font-weight: 750;
  line-height: 1.25;
  letter-spacing: -0.3px;
}

.preacher {
  display: flex;
  align-items: center;
  gap: 7px;

  margin-top: 12px;

  color: #4b5563;

  font-size: 14px;
  font-weight: 500;
}

.metadata {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;

  margin-top: 14px;
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 6px;

  color: #9ca3af;

  font-size: 12px;
}

/* =========================
   DESCRIPTION
========================= */

.description-section {
  padding-top: 4px;
}

.description-section h3 {
  margin: 0 0 8px;

  color: #111827;

  font-size: 16px;
  font-weight: 700;
}

.description-section p {
  margin: 0;

  color: #6b7280;

  font-size: 14px;
  line-height: 1.7;
}

/* =========================
   NOT FOUND
========================= */

.not-found {
  min-height: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.not-found h2 {
  color: #111827;
}

.not-found button {
  padding: 10px 16px;

  border: none;
  border-radius: 10px;

  background: #111827;
  color: #ffffff;

  cursor: pointer;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 480px) {
  .player-background {
    height: 190px;
  }

  .preaching-info h2 {
    font-size: 22px;
  }
}
</style>