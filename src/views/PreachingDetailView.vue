<script setup>
import {
  ArrowLeft,
  CalendarDays,
  Headphones,
  LoaderCircle,
  User,
  Video,
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

    preaching.value = response.data

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
   TYPE DE MÉDIA
========================= */

const mediaLabel = computed(() => {
  if (videoMedia.value && audioMedia.value) {
    return 'Audio et vidéo'
  }

  if (videoMedia.value) {
    return 'Vidéo'
  }

  if (audioMedia.value) {
    return 'Audio'
  }

  return null
})


onMounted(() => {
  loadPreaching()
})
</script>

<template>
  <main class="detail-page">

    <!-- RETOUR -->

    <RouterLink
      to="/predications"
      class="back-link"
    >
      <ArrowLeft
        :size="17"
        :stroke-width="1.8"
      />

      <span>
        Prédications
      </span>
    </RouterLink>


    <!-- CHARGEMENT -->

    <section
      v-if="isLoading"
      class="loading-state"
    >
      <LoaderCircle
        :size="25"
        class="loading-icon"
        :stroke-width="1.7"
      />

      <span>
        Chargement...
      </span>
    </section>


    <!-- ERREUR -->

    <section
      v-else-if="errorMessage"
      class="not-found"
    >
      <h1>
        Prédication introuvable
      </h1>

      <p>
        {{ errorMessage }}
      </p>

      <RouterLink
        to="/predications"
        class="back-button"
      >
        Retour aux prédications
      </RouterLink>
    </section>


    <!-- CONTENU -->

    <template v-else-if="preaching">

      <!-- =========================
           EN-TÊTE
      ========================== -->

      <header class="sermon-header">

        <div class="category">
          {{ preaching.category?.name || 'Prédication' }}
        </div>

        <h1 class="title">
          {{ preaching.title }}
        </h1>

        <div class="header-meta">

          <span>
            <User
              :size="15"
              :stroke-width="1.8"
            />

            {{ preaching.preacher_name }}
          </span>

          <span class="separator">
            ·
          </span>

          <span>
            <CalendarDays
              :size="15"
              :stroke-width="1.8"
            />

            {{ formattedDate }}
          </span>

        </div>

      </header>


      <!-- =========================
           VIDÉO
      ========================== -->

      <section
        v-if="videoMedia"
        class="video-section"
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
        class="audio-section"
      >
        <div class="section-label">

          <div class="section-label-icon">
            <Headphones
              :size="16"
              :stroke-width="1.8"
            />
          </div>

          <span>
            Écouter la prédication
          </span>

        </div>

        <AudioPlayer
          :src="audioMedia.url"
        />
      </section>


      <!-- =========================
           INFORMATIONS
      ========================== -->

      <div class="sermon-meta">

        <div class="meta-item">

          <User
            :size="17"
            :stroke-width="1.7"
          />

          <div>
            <span>
              Prédicateur
            </span>

            <strong>
              {{ preaching.preacher_name }}
            </strong>
          </div>

        </div>


        <div class="meta-item">

          <CalendarDays
            :size="17"
            :stroke-width="1.7"
          />

          <div>
            <span>
              Date
            </span>

            <strong>
              {{ formattedDate }}
            </strong>
          </div>

        </div>


        <div
          v-if="mediaLabel"
          class="meta-item"
        >

          <Video
            v-if="videoMedia"
            :size="17"
            :stroke-width="1.7"
          />

          <Headphones
            v-else
            :size="17"
            :stroke-width="1.7"
          />

          <div>
            <span>
              Disponible en
            </span>

            <strong>
              {{ mediaLabel }}
            </strong>
          </div>

        </div>

      </div>


      <!-- =========================
           DESCRIPTION
      ========================== -->

      <section
        v-if="preaching.description"
        class="description-section"
      >

        <h2>
          À propos
        </h2>

        <p>
          {{ preaching.description }}
        </p>

      </section>

    </template>

  </main>
</template>

<style scoped>
/* =========================
   PAGE
========================= */

.detail-page {
  width: 100%;
  max-width: 760px;

  margin: 0 auto;

  display: flex;
  flex-direction: column;

  gap: 28px;

  color: var(--color-text);
}


/* =========================
   RETOUR
========================= */

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  width: fit-content;

  color: var(--color-text-muted);

  text-decoration: none;

  font-size: 12px;
  font-weight: 550;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.back-link:hover {
  color: var(--color-text);

  transform: translateX(-2px);
}


/* =========================
   EN-TÊTE
========================= */

.sermon-header {
  display: flex;
  flex-direction: column;

  gap: 9px;

  padding-bottom: 4px;
}

.category {
  width: fit-content;

  color: var(--color-text-muted);

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 1px;

  text-transform: uppercase;
}

.title {
  max-width: 700px;

  margin: 0;

  color: var(--color-text);

  font-size: 30px;
  line-height: 1.2;

  font-weight: 760;

  letter-spacing: -0.7px;
}

.header-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 9px;

  margin-top: 3px;

  color: var(--color-text-secondary);

  font-size: 12px;
}

.header-meta span {
  display: inline-flex;
  align-items: center;

  gap: 5px;
}

.header-meta .separator {
  color: var(--color-text-muted);

  font-size: 15px;
}


/* =========================
   VIDÉO
========================= */

.video-section {
  width: 100%;

  overflow: hidden;

  border-radius: 14px;

  background: #000;
}


/* =========================
   AUDIO
========================= */

.audio-section {
  display: flex;
  flex-direction: column;

  gap: 12px;

  padding: 16px 0;

  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.section-label {
  display: flex;
  align-items: center;

  gap: 8px;

  color: var(--color-text-secondary);

  font-size: 12px;
  font-weight: 650;
}

.section-label-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-text-muted);
}


/* =========================
   INFORMATIONS
========================= */

.sermon-meta {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.meta-item {
  display: flex;
  align-items: center;

  gap: 9px;

  min-width: 0;

  padding: 15px 16px;

  color: var(--color-text-muted);
}

.meta-item + .meta-item {
  border-left: 1px solid var(--color-border);
}

.meta-item > div {
  display: flex;
  flex-direction: column;

  min-width: 0;

  gap: 3px;
}

.meta-item span {
  color: var(--color-text-muted);

  font-size: 9px;

  font-weight: 600;

  text-transform: uppercase;

  letter-spacing: 0.5px;
}

.meta-item strong {
  overflow: hidden;

  color: var(--color-text);

  font-size: 11px;

  font-weight: 600;

  white-space: nowrap;

  text-overflow: ellipsis;
}


/* =========================
   DESCRIPTION
========================= */

.description-section {
  max-width: 680px;

  padding-bottom: 20px;
}

.description-section h2 {
  margin: 0 0 9px;

  color: var(--color-text);

  font-size: 15px;

  font-weight: 700;
}

.description-section p {
  margin: 0;

  color: var(--color-text-secondary);

  font-size: 13px;

  line-height: 1.75;
}


/* =========================
   CHARGEMENT
========================= */

.loading-state {
  min-height: 300px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 10px;

  color: var(--color-text-muted);

  font-size: 12px;
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
   ERREUR
========================= */

.not-found {
  min-height: 280px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 30px;

  text-align: center;
}

.not-found h1 {
  margin: 0;

  color: var(--color-text);

  font-size: 20px;
  font-weight: 700;
}

.not-found p {
  max-width: 400px;

  margin: 8px 0 20px;

  color: var(--color-text-secondary);

  font-size: 13px;

  line-height: 1.6;
}

.back-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-height: 38px;

  padding: 0 15px;

  border-radius: 9px;

  background: var(--color-text);
  color: var(--color-surface);

  text-decoration: none;

  font-size: 12px;
  font-weight: 650;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

  .detail-page {
    gap: 22px;
  }

  .title {
    font-size: 23px;

    letter-spacing: -0.4px;
  }

  .header-meta {
    gap: 7px;

    font-size: 11px;
  }

  .sermon-meta {
    grid-template-columns: 1fr;
  }

  .meta-item {
    padding: 13px 0;
  }

  .meta-item + .meta-item {
    border-top: 1px solid var(--color-border);
    border-left: 0;
  }

  .description-section {
    padding-bottom: 10px;
  }

  .description-section p {
    font-size: 12px;
  }
}
</style>