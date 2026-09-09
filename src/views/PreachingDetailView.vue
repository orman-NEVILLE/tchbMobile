<script setup>
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Mic2,
  User,
} from 'lucide-vue-next'

import AudioPlayer from '@/components/AudioPlayer.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const preachings = [
  {
    id: 1,
    title: 'La foi qui transforme',
    preacher: 'Pasteur Jean',
    date: '07 Septembre 2026',
    duration: '32:15',
    description:
      'Un enseignement sur la foi et son pouvoir de transformer notre manière de vivre, de penser et de marcher avec Dieu.',
    video: '/media/videos/predication-1.mp4',
    audio: '/media/audio/predication-1.mp3',
  },
  {
    id: 2,
    title: 'Le chemin de la foi',
    preacher: 'Pasteur David',
    date: '05 Septembre 2026',
    duration: '41:20',
    description:
      'Un enseignement sur le cheminement de la foi et les différentes étapes de notre marche avec Dieu.',
  },
  {
    id: 3,
    title: 'Marcher dans la lumière',
    preacher: 'Pasteur Jean',
    date: '01 Septembre 2026',
    duration: '36:42',
    description:
      'Une réflexion sur l’importance de marcher dans la lumière et de rester attaché à la Parole de Dieu.',
  },
  {
    id: 4,
    title: 'Une foi persévérante',
    preacher: 'Pasteur David',
    date: '28 Août 2026',
    duration: '29:18',
    description:
      'Un enseignement consacré à la persévérance dans la foi malgré les difficultés rencontrées.',
  },
  {
    id: 5,
    title: 'La puissance de la Parole',
    preacher: 'Pasteur Michel',
    date: '24 Août 2026',
    duration: '44:07',
    description:
      'Découvrez l’importance de la Parole de Dieu dans notre vie et dans notre croissance spirituelle.',
  },
]

const preaching = computed(() => {
  return preachings.find(
    (item) => item.id === Number(route.params.id)
  )
})
</script>

<template>
  <div class="detail-page">

    <!-- Retour -->
    <RouterLink
      to="/predications"
      class="back-link"
    >
      <ArrowLeft :size="18" />

      <span>
        Retour aux prédications
      </span>
    </RouterLink>

    <!-- Prédication trouvée -->
    <template v-if="preaching">

      <!-- En-tête -->
      <section class="detail-header">

        <div class="detail-icon">
          <Mic2
            :size="28"
            :stroke-width="2"
          />
        </div>

        <div class="detail-title">

          <h1>
            {{ preaching.title }}
          </h1>

          <p>
            Une prédication pour fortifier votre foi
            et votre marche avec Dieu.
          </p>

        </div>

      </section>

      <!-- Vidéo -->
      <section
        v-if="preaching.video"
        class="video-card"
      >
        <VideoPlayer
          :src="preaching.video"
        />
      </section>

      <!-- Audio -->
      <section
        v-if="preaching.audio"
        class="audio-card"
      >
        <AudioPlayer
          :src="preaching.audio"
        />
      </section>

      <!-- Informations -->
      <section class="info-card">

        <!-- Prédicateur -->
        <div class="info-item">

          <User :size="18" />

          <div>
            <span>
              Prédicateur
            </span>

            <strong>
              {{ preaching.preacher }}
            </strong>
          </div>

        </div>

        <!-- Date -->
        <div class="info-item">

          <CalendarDays :size="18" />

          <div>
            <span>
              Date
            </span>

            <strong>
              {{ preaching.date }}
            </strong>
          </div>

        </div>

        <!-- Durée -->
        <div class="info-item">

          <Clock :size="18" />

          <div>
            <span>
              Durée
            </span>

            <strong>
              {{ preaching.duration }}
            </strong>
          </div>

        </div>

      </section>

      <!-- Description -->
      <section class="description-card">

        <h2>
          À propos de cette prédication
        </h2>

        <p>
          {{ preaching.description }}
        </p>

      </section>

    </template>

    <!-- Prédication inexistante -->
    <section
      v-else
      class="not-found"
    >

      <div class="not-found-icon">
        <Mic2 :size="24" />
      </div>

      <h2>
        Prédication introuvable
      </h2>

      <p>
        La prédication demandée n'existe pas ou n'est plus disponible.
      </p>

      <RouterLink
        to="/predications"
        class="back-to-list"
      >
        Voir les prédications
      </RouterLink>

    </section>

  </div>
</template>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  gap: 24px;

  color: var(--color-text);

  transition: color 0.25s ease;
}

/* =========================
   Retour
========================= */

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  width: fit-content;

  color: var(--color-text-secondary);

  text-decoration: none;

  font-size: 13px;
  font-weight: 500;

  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-text);
}

/* =========================
   En-tête
========================= */

.detail-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.detail-icon {
  width: 58px;
  height: 58px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;

  background: var(--color-text);
  color: var(--color-surface);

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.detail-title {
  min-width: 0;
}

.detail-title h1 {
  margin: 0;

  color: var(--color-text);

  font-size: 24px;
  font-weight: 750;
  letter-spacing: -0.3px;

  transition: color 0.25s ease;
}

.detail-title p {
  margin: 5px 0 0;

  color: var(--color-text-secondary);

  font-size: 13px;
  line-height: 1.5;

  transition: color 0.25s ease;
}

/* =========================
   Vidéo
========================= */

.video-card {
  width: 100%;

  overflow: hidden;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

/* =========================
   Audio
========================= */

.audio-card {
  width: 100%;
  box-sizing: border-box;

  padding: 16px;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

/* =========================
   Informations
========================= */

.info-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  padding: 16px;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 0;

  color: var(--color-text-secondary);

  transition: color 0.25s ease;
}

.info-item svg {
  flex-shrink: 0;
}

.info-item div {
  display: flex;
  flex-direction: column;
  gap: 3px;

  min-width: 0;
}

.info-item span {
  color: var(--color-text-muted);

  font-size: 11px;

  transition: color 0.25s ease;
}

.info-item strong {
  color: var(--color-text);

  font-size: 13px;
  font-weight: 600;

  transition: color 0.25s ease;
}

/* =========================
   Description
========================= */

.description-card {
  padding: 20px;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.description-card h2 {
  margin: 0 0 8px;

  color: var(--color-text);

  font-size: 16px;
  font-weight: 700;

  transition: color 0.25s ease;
}

.description-card p {
  margin: 0;

  color: var(--color-text-secondary);

  font-size: 13px;
  line-height: 1.7;

  transition: color 0.25s ease;
}

/* =========================
   Prédication introuvable
========================= */

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px 20px;

  text-align: center;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.not-found-icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 14px;

  border-radius: 50%;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.not-found h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 17px;
  font-weight: 700;

  transition: color 0.25s ease;
}

.not-found p {
  max-width: 300px;

  margin: 7px 0 18px;

  color: var(--color-text-muted);

  font-size: 13px;
  line-height: 1.5;

  transition: color 0.25s ease;
}

.back-to-list {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 40px;

  padding: 0 16px;

  border-radius: 10px;

  background: var(--color-text);
  color: var(--color-surface);

  text-decoration: none;

  font-size: 13px;
  font-weight: 600;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.back-to-list:hover {
  background: var(--color-text-secondary);
}

/* =========================
   Mobile
========================= */

@media (max-width: 600px) {

  .detail-page {
    gap: 20px;
  }

  .detail-header {
    gap: 12px;
  }

  .detail-icon {
    width: 52px;
    height: 52px;

    border-radius: 13px;
  }

  .detail-title h1 {
    font-size: 21px;
  }

  .detail-title p {
    font-size: 12px;
  }

  .info-card {
    grid-template-columns: 1fr;
  }

  .info-item {
    padding: 4px 0;
  }

  .description-card {
    padding: 16px;
  }
}
</style>