<script setup>
import {
  ArrowLeft,
  Film,
  Headphones,
  Music2,
  PlayCircle,
} from 'lucide-vue-next'

import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const category = computed(() => {
  return route.params.category === 'meditation'
    ? 'Méditation'
    : 'Louange'
})

const categoryDescription = computed(() => {
  return category.value === 'Méditation'
    ? 'Des chants et des moments pour accompagner votre méditation.'
    : 'Retrouvez les chants et les moments de louange.'
})

const chants = ref([
  {
    id: 1,
    title: 'Moment de louange',
    description: 'Un temps de louange et d’adoration.',
    type: 'audio',
    file: '/media/audio/louange-1.mp3',
  },
  {
    id: 2,
    title: 'Chant de méditation',
    description: 'Un moment calme pour méditer la Parole.',
    type: 'video',
    file: '/media/videos/meditation-1.mp4',
  },
])
</script>

<template>
  <section class="category-view">
    <RouterLink
      to="/chants"
      class="back-link"
    >
      <ArrowLeft :size="18" />

      <span>Chants</span>
    </RouterLink>

    <header class="page-header">
      <div class="header-icon">
        <Music2 :size="25" />
      </div>

      <div>
        <h1>{{ category }}</h1>

        <p>
          {{ categoryDescription }}
        </p>
      </div>
    </header>

    <div
      v-if="chants.length"
      class="chants-list"
    >
      <article
        v-for="chant in chants"
        :key="chant.id"
        class="chant-item"
      >
        <div class="chant-heading">
          <div class="chant-type">
            <Headphones
              v-if="chant.type === 'audio'"
              :size="19"
            />

            <Film
              v-else
              :size="19"
            />
          </div>

          <div class="chant-information">
            <h2>{{ chant.title }}</h2>

            <p>
              {{ chant.description }}
            </p>
          </div>
        </div>

        <audio
          v-if="chant.type === 'audio'"
          class="media-player"
          controls
          preload="metadata"
          :src="chant.file"
        />

        <video
          v-else
          class="media-player"
          controls
          preload="metadata"
          playsinline
          :src="chant.file"
        />

        <div class="chant-footer">
          <span>
            {{ chant.type === 'audio' ? 'Audio' : 'Vidéo' }}
          </span>

          <PlayCircle :size="17" />
        </div>
      </article>
    </div>

    <div
      v-else
      class="empty-state"
    >
      <Music2 :size="32" />

      <h2>Aucun contenu disponible</h2>

      <p>
        Aucun chant n’est encore disponible dans cette catégorie.
      </p>
    </div>
  </section>
</template>

<style scoped>
.category-view {
  display: flex;
  flex-direction: column;
  gap: 26px;
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

  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-text);
}

.page-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  flex-shrink: 0;

  color: var(--color-text);
  background: var(--color-surface-secondary);

  border-radius: 14px;
}

.page-header h1 {
  margin: 0;

  color: var(--color-text);

  font-size: 24px;
  font-weight: 700;
}

.page-header p {
  margin: 6px 0 0;

  color: var(--color-text-muted);

  font-size: 14px;
  line-height: 1.5;
}

.chants-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.chant-item {
  padding: 18px;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 18px;
}

.chant-heading {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.chant-type {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  flex-shrink: 0;

  color: var(--color-text);
  background: var(--color-surface-secondary);

  border-radius: 11px;
}

.chant-information {
  min-width: 0;
  flex: 1;
}

.chant-information h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 16px;
  font-weight: 650;
}

.chant-information p {
  margin: 5px 0 0;

  color: var(--color-text-muted);

  font-size: 13px;
  line-height: 1.5;
}

.media-player {
  display: block;

  width: 100%;

  margin-top: 18px;

  border-radius: 12px;
}

video.media-player {
  aspect-ratio: 16 / 9;
  object-fit: cover;

  background: #000;
}

.chant-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 14px;

  color: var(--color-text-muted);

  font-size: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 48px 20px;

  color: var(--color-text-muted);

  text-align: center;
}

.empty-state h2 {
  margin: 16px 0 6px;

  color: var(--color-text);

  font-size: 17px;
}

.empty-state p {
  max-width: 300px;

  margin: 0;

  font-size: 14px;
  line-height: 1.5;
}
</style>