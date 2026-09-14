<script setup>
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  LoaderCircle,
  Mic2,
  User,
} from 'lucide-vue-next'

import {
  computed,
  onMounted,
  ref,
} from 'vue'

import { useRoute } from 'vue-router'

import AudioPlayer from '@/components/AudioPlayer.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

import { getSermon } from '@/functions/sermons'

const route = useRoute()

const preaching = ref(null)

const isLoading = ref(true)
const errorMessage = ref('')

const loadPreaching = async () => {
  isLoading.value = true
  errorMessage.value = ''
  preaching.value = null

  try {
    const id = route.params.id

    if (!id) {
      errorMessage.value =
        'Identifiant de prédication invalide.'

      return
    }

    const response = await getSermon(id)

    console.log('Réponse API :', response)

    preaching.value = response.data

    console.log('Prédication :', preaching.value)
    console.log('Médias :', preaching.value?.media)

  } catch (error) {
    console.error(
      'Erreur lors du chargement de la prédication :',
      error
    )

    if (error.status === 404) {
      errorMessage.value =
        'La prédication demandée n’existe pas ou n’est plus disponible.'
    } else {
      errorMessage.value =
        error.message ||
        'Impossible de charger cette prédication.'
    }
  } finally {
    isLoading.value = false
  }
}


/* =========================
   MÉDIAS
========================= */

const audioMedia = computed(() => {
  return preaching.value?.media?.find(
    (media) => media.type === 'audio'
  ) || null
})

const videoMedia = computed(() => {
  return preaching.value?.media?.find(
    (media) => media.type === 'video'
  ) || null
})


/* =========================
   DATE
========================= */

const formattedDate = computed(() => {
  const date = preaching.value?.preached_at

  if (!date) {
    return 'Date inconnue'
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsedDate)
})


/* =========================
   DURÉE
========================= */

const duration = computed(() => {
  return (
    audioMedia.value?.duration ||
    videoMedia.value?.duration ||
    preaching.value?.duration ||
    null
  )
})


onMounted(() => {
  loadPreaching()
})
</script>

<template>
  <div class="detail-page">

    <!-- =========================
         RETOUR
    ========================== -->

    <RouterLink
      to="/predications"
      class="back-link"
    >
      <ArrowLeft :size="18" />

      <span>
        Retour aux prédications
      </span>
    </RouterLink>


    <!-- =========================
         CHARGEMENT
    ========================== -->

    <section
      v-if="isLoading"
      class="loading-state"
    >
      <LoaderCircle
        :size="26"
        class="loading-icon"
      />

      <span>
        Chargement de la prédication...
      </span>
    </section>


    <!-- =========================
         ERREUR / INTRouvable
    ========================== -->

    <section
      v-else-if="errorMessage"
      class="not-found"
    >

      <div class="not-found-icon">
        <Mic2 :size="24" />
      </div>

      <h2>
        Prédication introuvable
      </h2>

      <p>
        {{ errorMessage }}
      </p>

      <RouterLink
        to="/predications"
        class="back-to-list"
      >
        Voir les prédications
      </RouterLink>

    </section>


    <!-- =========================
         PRÉDICATION
    ========================== -->

    <template v-else-if="preaching">

      <!-- =========================
           EN-TÊTE
      ========================== -->

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
            {{
              preaching.description ||
              'Une prédication pour fortifier votre foi et votre marche avec Dieu.'
            }}
          </p>

        </div>

      </section>


      <!-- =========================
           VIDÉO
      ========================== -->

      <section
        v-if="videoMedia"
        class="video-card"
      >
        <VideoPlayer
          :src="videoMedia.url"
        />
      </section>


      <!-- =========================
           AUDIO
      ========================== -->

      <section
        v-if="audioMedia"
        class="audio-card"
      >
        <AudioPlayer
          :src="audioMedia.url"
        />
      </section>


      <!-- =========================
           INFORMATIONS
      ========================== -->

      <section class="info-card">

        <!-- Prédicateur -->

        <div class="info-item">

          <User :size="18" />

          <div>

            <span>
              Prédicateur
            </span>

            <strong>
              {{ preaching.preacher_name }}
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
              {{ formattedDate }}
            </strong>

          </div>

        </div>


        <!-- Durée -->

        <div
          v-if="duration"
          class="info-item"
        >

          <Clock :size="18" />

          <div>

            <span>
              Durée
            </span>

            <strong>
              {{ duration }}
            </strong>

          </div>

        </div>

      </section>


      <!-- =========================
           DESCRIPTION
      ========================== -->

      <section
        v-if="preaching.description"
        class="description-card"
      >

        <h2>
          À propos de cette prédication
        </h2>

        <p>
          {{ preaching.description }}
        </p>

      </section>

    </template>

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
   Chargement
========================= */

.loading-state {
  min-height: 220px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;

  color: var(--color-text-muted);

  font-size: 13px;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
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
   Introuvable
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
  max-width: 340px;

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