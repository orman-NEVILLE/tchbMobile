<script setup>
import {
  ArrowLeft,
  CalendarDays,
  Headphones,
  LoaderCircle,
  Music2,
  User,
  Video,
} from 'lucide-vue-next'

import {
  computed,
  onMounted,
  ref,
} from 'vue'

import {
  RouterLink,
  useRoute,
} from 'vue-router'

import AudioPlayer from '@/components/AudioPlayer.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

import { getChant } from '@/functions/chants'

const route = useRoute()

const chant = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

const category = computed(() => {
  return route.params.category === 'meditation'
    ? 'Méditation'
    : 'Louange'
})

const audio = computed(() => {
  return chant.value?.media?.find(
    media => media.type === 'audio'
  ) || null
})

const video = computed(() => {
  return chant.value?.media?.find(
    media => media.type === 'video'
  ) || null
})

const formatDate = (date) => {
  if (!date) return ''

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsedDate)
}

const loadChant = async () => {
  isLoading.value = true
  errorMessage.value = ''
  chant.value = null

  try {
    const response = await getChant(route.params.id)

    chant.value = response.data
  } catch (error) {
    console.error(
      'Erreur lors du chargement du chant :',
      error
    )

    errorMessage.value =
      error.message ||
      'Impossible de charger ce chant.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadChant)
</script>

<template>
  <!-- Chargement -->
  <section
    v-if="isLoading"
    class="state"
  >
    <LoaderCircle
      :size="24"
      class="loading-icon"
    />

    <span>Chargement du chant...</span>
  </section>

  <!-- Erreur -->
  <section
    v-else-if="errorMessage"
    class="state"
  >
    <Music2 :size="28" />

    <p>{{ errorMessage }}</p>

    <button
      type="button"
      class="retry-button"
      @click="loadChant"
    >
      Réessayer
    </button>
  </section>

  <!-- Chant -->
  <section
    v-else-if="chant"
    class="detail-view"
  >
    <RouterLink
      :to="`/chants/${route.params.category}`"
      class="back-link"
    >
      <ArrowLeft :size="18" />
      <span>{{ category }}</span>
    </RouterLink>

    <header class="detail-header">
      <div class="detail-icon">
        <Music2 :size="25" />
      </div>

      <div class="detail-heading">
        <span class="category-label">
          {{ chant.category?.name || category }}
        </span>

        <h1>{{ chant.title }}</h1>
      </div>
    </header>

    <div class="metadata">
      <div
        v-if="chant.artist_name"
        class="metadata-item"
      >
        <User :size="17" />
        <span>{{ chant.artist_name }}</span>
      </div>

      <div
        v-if="chant.recorded_at"
        class="metadata-item"
      >
        <CalendarDays :size="17" />
        <span>{{ formatDate(chant.recorded_at) }}</span>
      </div>
    </div>

    <section
      v-if="chant.description"
      class="description-section"
    >
      <p>{{ chant.description }}</p>
    </section>

    <section class="media-section">
      <h2>Contenu</h2>

      <div
        v-if="audio"
        class="media-block"
      >
        <div class="media-heading">
          <div class="media-icon">
            <Headphones :size="20" />
          </div>

          <div class="media-content">
            <h3>Audio</h3>
            <p>Écouter ce chant</p>
          </div>
        </div>

        <AudioPlayer :src="audio.url" />
      </div>

      <div
        v-if="video"
        class="media-block"
      >
        <div class="media-heading">
          <div class="media-icon">
            <Video :size="20" />
          </div>

          <div class="media-content">
            <h3>Vidéo</h3>
            <p>Regarder ce chant</p>
          </div>
        </div>

        <VideoPlayer :src="video.url" />
      </div>

      <div
        v-if="!audio && !video"
        class="no-media"
      >
        Aucun contenu multimédia disponible.
      </div>
    </section>
  </section>

  <!-- Introuvable -->
  <section
    v-else
    class="not-found"
  >
    <Music2 :size="32" />

    <h1>Chant introuvable</h1>

    <p>
      Le contenu demandé n'existe pas ou n'est plus disponible.
    </p>

    <RouterLink to="/chants">
      Retour aux chants
    </RouterLink>
  </section>
</template>

<style scoped>
.detail-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  width: fit-content;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.back-link:hover {
  color: var(--color-text);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.detail-icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.detail-heading {
  min-width: 0;
}

.category-label {
  display: block;
  margin-bottom: 4px;
  color: var(--color-text-muted);
  font-size: 12px;
  font-weight: 500;
}

.detail-heading h1 {
  margin: 0;
  color: var(--color-text);
  font-size: 25px;
  font-weight: 700;
  line-height: 1.25;
}

.metadata {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  color: var(--color-text-muted);
  font-size: 13px;
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 7px;
}

.description-section {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.description-section p {
  margin: 0;
}

.media-section {
  padding-top: 4px;
}

.media-section h2 {
  margin: 0 0 14px;
  color: var(--color-text);
  font-size: 17px;
  font-weight: 650;
}

.media-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.media-block:last-child {
  margin-bottom: 0;
}

.media-heading {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 13px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
}

.media-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.media-content h3 {
  margin: 0;
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
}

.media-content p {
  margin: 3px 0 0;
  color: var(--color-text-muted);
  font-size: 12px;
}

.state,
.not-found {
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--color-text-muted);
  text-align: center;
}

.state p,
.not-found p {
  max-width: 320px;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.loading-icon {
  animation: spin 0.9s linear infinite;
}

.retry-button {
  padding: 8px 14px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface-secondary);
  color: var(--color-text);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.no-media {
  padding: 16px;
  color: var(--color-text-muted);
  background: var(--color-surface-secondary);
  border-radius: 12px;
  font-size: 13px;
}

.not-found h1 {
  margin: 4px 0 0;
  color: var(--color-text);
  font-size: 20px;
}

.not-found a {
  color: var(--color-text);
  font-size: 14px;
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>