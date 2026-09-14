<script setup>
import {
  CalendarDays,
  ChevronRight,
  Headphones,
  Video,
} from 'lucide-vue-next'

import { computed } from 'vue'

const props = defineProps({
  preaching: {
    type: Object,
    required: true,
  },
})

const formatDate = (date) => {
  if (!date) {
    return ''
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
}

const hasAudio = computed(() => {
  return props.preaching.media?.some(
    (media) => media.type === 'audio'
  )
})

const hasVideo = computed(() => {
  return props.preaching.media?.some(
    (media) => media.type === 'video'
  )
})

const mediaType = computed(() => {
  if (hasAudio.value && hasVideo.value) {
    return 'Audio & vidéo'
  }

  if (hasVideo.value) {
    return 'Vidéo'
  }

  if (hasAudio.value) {
    return 'Audio'
  }

  return null
})
</script>

<template>
  <RouterLink
    :to="`/predications/${preaching.id}`"
    class="preaching-card"
  >

    <!-- =========================
         MEDIA
    ========================== -->

    <div class="media-preview">

      <div class="media-symbol">

        <Video
          v-if="hasVideo"
          :size="23"
          :stroke-width="1.7"
        />

        <Headphones
          v-else
          :size="23"
          :stroke-width="1.7"
        />

      </div>

      <span class="media-action">
        Ouvrir
      </span>

    </div>


    <!-- =========================
         CONTENU
    ========================== -->

    <div class="content">

      <p class="category">
        {{ preaching.category?.name || 'Prédication' }}
      </p>

      <h3 class="title">
        {{ preaching.title }}
      </h3>

      <p class="preacher">
        {{ preaching.preacher_name }}
      </p>

      <div class="metadata">

        <span class="date">
          <CalendarDays
            :size="13"
            :stroke-width="1.8"
          />

          {{ formatDate(preaching.preached_at) }}
        </span>

        <span
          v-if="mediaType"
          class="media-type"
        >
          {{ mediaType }}
        </span>

      </div>

    </div>


    <!-- =========================
         NAVIGATION
    ========================== -->

    <ChevronRight
      class="arrow"
      :size="20"
      :stroke-width="1.7"
    />

  </RouterLink>
</template>

<style scoped>

/* =====================================================
   CARD
===================================================== */

.preaching-card {
  position: relative;

  width: 100%;
  min-height: 124px;

  box-sizing: border-box;

  display: flex;
  align-items: stretch;

  gap: 16px;

  padding: 12px;

  border: 1px solid var(--color-border);
  border-radius: 16px;

  background: var(--color-surface);

  color: var(--color-text);
  text-decoration: none;

  overflow: hidden;

  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.preaching-card:hover {
  border-color: var(--color-text-muted);

  background: var(--color-surface-hover);

  transform: translateY(-1px);

  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.05);
}

.preaching-card:active {
  transform: scale(0.99);
}


/* =====================================================
   MEDIA
===================================================== */

.media-preview {
  position: relative;

  width: 105px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: var(--color-surface-secondary);

  color: var(--color-text-secondary);

  overflow: hidden;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.preaching-card:hover .media-preview {
  color: var(--color-text);
}


/* Icône centrale */

.media-symbol {
  width: 46px;
  height: 46px;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: var(--color-surface);

  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.preaching-card:hover .media-symbol {
  transform: scale(1.05);

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.08);
}


/* Petit texte */

.media-action {
  position: absolute;

  left: 9px;
  bottom: 8px;

  color: var(--color-text-muted);

  font-size: 9px;
  font-weight: 650;

  letter-spacing: 0.2px;
}


/* =====================================================
   CONTENU
===================================================== */

.content {
  min-width: 0;

  flex: 1;

  display: flex;
  flex-direction: column;

  justify-content: center;
}


/* =====================================================
   CATÉGORIE
===================================================== */

.category {
  margin: 0 0 5px;

  color: var(--color-text-muted);

  font-size: 9px;
  font-weight: 700;

  letter-spacing: 0.7px;
  text-transform: uppercase;
}


/* =====================================================
   TITRE
===================================================== */

.title {
  margin: 0;

  color: var(--color-text);

  font-size: 15px;
  font-weight: 720;
  line-height: 1.35;
  letter-spacing: -0.15px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  overflow: hidden;
}


/* =====================================================
   PRÉDICATEUR
===================================================== */

.preacher {
  margin: 5px 0 9px;

  overflow: hidden;

  color: var(--color-text-secondary);

  font-size: 11px;
  font-weight: 500;

  white-space: nowrap;
  text-overflow: ellipsis;
}


/* =====================================================
   MÉTADONNÉES
===================================================== */

.metadata {
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 9px;

  color: var(--color-text-muted);

  font-size: 10px;
}

.date {
  min-width: 0;

  display: inline-flex;
  align-items: center;

  gap: 5px;

  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
}

.media-type {
  flex-shrink: 0;

  padding-left: 9px;

  border-left: 1px solid var(--color-border);

  font-weight: 600;
}


/* =====================================================
   FLÈCHE
===================================================== */

.arrow {
  align-self: center;

  flex-shrink: 0;

  margin-right: 3px;

  color: var(--color-text-muted);

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.preaching-card:hover .arrow {
  color: var(--color-text);

  transform: translateX(3px);
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {

  .preaching-card {
    min-height: 108px;

    gap: 12px;

    padding: 9px;

    border-radius: 14px;
  }

  .media-preview {
    width: 82px;

    border-radius: 10px;
  }

  .media-symbol {
    width: 40px;
    height: 40px;
  }

  .media-action {
    left: 7px;
    bottom: 6px;

    font-size: 8px;
  }

  .category {
    margin-bottom: 4px;

    font-size: 8px;
  }

  .title {
    font-size: 13px;
    line-height: 1.35;
  }

  .preacher {
    margin: 4px 0 7px;

    font-size: 10px;
  }

  .metadata {
    gap: 7px;

    font-size: 9px;
  }

  .media-type {
    padding-left: 7px;
  }

  .arrow {
    margin-right: 1px;

    width: 17px;
  }

}


/* Très petits écrans */

@media (max-width: 380px) {

  .preaching-card {
    gap: 10px;
  }

  .media-preview {
    width: 72px;
  }

  .title {
    font-size: 12px;
  }

  .preacher {
    font-size: 9px;
  }

  .media-type {
    display: none;
  }

}

</style>