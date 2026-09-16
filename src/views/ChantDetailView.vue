<script setup>
import {
  ArrowLeft,
  CalendarDays,
  Headphones,
  Music2,
  User,
  Video,
} from 'lucide-vue-next'

import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import AudioPlayer from '@/components/AudioPlayer.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const route = useRoute()

/*
|--------------------------------------------------------------------------
| Catégorie
|--------------------------------------------------------------------------
*/

const category = computed(() => {
  return route.params.category === 'meditation'
    ? 'Méditation'
    : 'Louange'
})

/*
|--------------------------------------------------------------------------
| Données temporaires
|--------------------------------------------------------------------------
| Ces données servent uniquement à tester l'affichage
| et les lecteurs avant l'intégration de l'API Laravel.
|--------------------------------------------------------------------------
*/

const chants = {
  louange: {
    1: {
      title: 'Dieu est fidèle',
      description:
        'Un chant de louange pour célébrer la fidélité de Dieu dans nos vies.',
      author: 'Équipe de louange',
      date: '12 septembre 2026',

      audio: '/media/chants/louange/dieu-est-fidele.mp3',
      video: '/media/chants/louange/dieu-est-fidele.mp4',
    },

    2: {
      title: 'Nous t’adorons',
      description:
        'Un moment de louange et d’adoration consacré à Dieu.',
      author: 'Groupe de louange TCHB',
      date: '07 septembre 2026',

      audio: '/media/chants/louange/nous-t-adorons.mp3',
      video: null,
    },

    3: {
      title: 'Élevons son nom',
      description:
        'Un chant pour célébrer et glorifier le nom de Dieu.',
      author: 'Équipe de louange',
      date: '31 août 2026',

      audio: null,
      video: '/media/chants/louange/elevons-son-nom.mp4',
    },

    4: {
      title: 'Nous célébrons ton nom',
      description:
        'Un chant de célébration et de reconnaissance.',
      author: 'Équipe de louange',
      date: '24 août 2026',

      audio: '/media/chants/louange/nous-celebrons-ton-nom.mp3',
      video: null,
    },
  },

  meditation: {
    1: {
      title: 'Dans ta présence',
      description:
        'Un moment de méditation dans la présence de Dieu.',
      author: 'Équipe TCHB',
      date: '10 septembre 2026',

      audio: '/media/chants/meditation/dans-ta-presence.mp3',
      video: '/media/chants/meditation/dans-ta-presence.mp4',
    },

    2: {
      title: 'Près de toi',
      description:
        'Un chant pour accompagner un moment de méditation.',
      author: 'Groupe de méditation',
      date: '03 septembre 2026',

      audio: '/media/chants/meditation/pres-de-toi.mp3',
      video: null,
    },

    3: {
      title: 'Ta Parole',
      description:
        'Une méditation autour de la Parole de Dieu.',
      author: 'Équipe TCHB',
      date: '28 août 2026',

      audio: null,
      video: '/media/chants/meditation/ta-parole.mp4',
    },
  },
}

/*
|--------------------------------------------------------------------------
| Chant courant
|--------------------------------------------------------------------------
*/

const chant = computed(() => {
  return chants[route.params.category]?.[route.params.id] ?? null
})

/*
|--------------------------------------------------------------------------
| Présence de médias
|--------------------------------------------------------------------------
*/

const hasAudio = computed(() => {
  return Boolean(chant.value?.audio)
})

const hasVideo = computed(() => {
  return Boolean(chant.value?.video)
})

const hasMedia = computed(() => {
  return hasAudio.value || hasVideo.value
})
</script>


<template>

  <!-- =====================================================
       CHANT TROUVÉ
  ====================================================== -->

  <section
    v-if="chant"
    class="detail-view"
  >

    <!-- =========================
         RETOUR
    ========================== -->

    <RouterLink
      :to="`/chants/${route.params.category}`"
      class="back-link"
    >
      <ArrowLeft
        :size="18"
        :stroke-width="2"
      />

      <span>
        {{ category }}
      </span>
    </RouterLink>


    <!-- =========================
         EN-TÊTE
    ========================== -->

    <header class="detail-header">

      <div class="detail-icon">
        <Music2
          :size="25"
          :stroke-width="2"
        />
      </div>

      <div class="detail-heading">

        <span class="category-label">
          {{ category }}
        </span>

        <h1>
          {{ chant.title }}
        </h1>

      </div>

    </header>


    <!-- =========================
         INFORMATIONS
    ========================== -->

    <div class="metadata">

      <div class="metadata-item">

        <User
          :size="17"
          :stroke-width="2"
        />

        <span>
          {{ chant.author }}
        </span>

      </div>


      <div class="metadata-item">

        <CalendarDays
          :size="17"
          :stroke-width="2"
        />

        <span>
          {{ chant.date }}
        </span>

      </div>

    </div>


    <!-- =========================
         DESCRIPTION
    ========================== -->

    <section
      v-if="chant.description"
      class="description-section"
    >

      <p>
        {{ chant.description }}
      </p>

    </section>


    <!-- =================================================
         CONTENU MULTIMÉDIA
    ================================================== -->

    <section class="media-section">

      <h2>
        Contenu
      </h2>


      <!-- =========================
           AUDIO
      ========================== -->

      <div
        v-if="hasAudio"
        class="media-block"
      >

        <div class="media-heading">

          <div class="media-icon">
            <Headphones
              :size="20"
              :stroke-width="2"
            />
          </div>

          <div class="media-content">

            <h3>
              Audio
            </h3>

            <p>
              Écouter ce chant
            </p>

          </div>

        </div>


        <AudioPlayer
          :src="chant.audio"
        />

      </div>


      <!-- =========================
           VIDÉO
      ========================== -->

      <div
        v-if="hasVideo"
        class="media-block"
      >

        <div class="media-heading">

          <div class="media-icon">

            <Video
              :size="20"
              :stroke-width="2"
            />

          </div>

          <div class="media-content">

            <h3>
              Vidéo
            </h3>

            <p>
              Regarder ce chant
            </p>

          </div>

        </div>


        <VideoPlayer
          :src="chant.video"
        />

      </div>


      <!-- =========================
           AUCUN MÉDIA
      ========================== -->

      <div
        v-if="!hasMedia"
        class="no-media"
      >
        Aucun contenu multimédia disponible.
      </div>

    </section>

  </section>


  <!-- =====================================================
       CHANT INTROUVABLE
  ====================================================== -->

  <section
    v-else
    class="not-found"
  >

    <Music2
      :size="32"
      :stroke-width="1.8"
    />

    <h1>
      Chant introuvable
    </h1>

    <p>
      Le contenu demandé n'existe pas ou n'est plus disponible.
    </p>

    <RouterLink to="/chants">
      Retour aux chants
    </RouterLink>

  </section>

</template>


<style scoped>

/* =========================
   CONTENEUR
========================= */

.detail-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

  font-size: 14px;
  font-weight: 500;

  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-text);
}


/* =========================
   EN-TÊTE
========================= */

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


/* =========================
   MÉTADONNÉES
========================= */

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


/* =========================
   DESCRIPTION
========================= */

.description-section {
  color: var(--color-text-secondary);

  font-size: 14px;
  line-height: 1.7;
}

.description-section p {
  margin: 0;
}


/* =========================
   MÉDIAS
========================= */

.media-section {
  padding-top: 4px;
}

.media-section h2 {
  margin: 0 0 14px;

  color: var(--color-text);

  font-size: 17px;
  font-weight: 650;
}


/* =========================
   BLOC MÉDIA
========================= */

.media-block {
  display: flex;
  flex-direction: column;

  gap: 12px;

  margin-bottom: 20px;
}

.media-block:last-child {
  margin-bottom: 0;
}


/* =========================
   EN-TÊTE MÉDIA
========================= */

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

.media-content {
  min-width: 0;
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


/* =========================
   AUCUN MÉDIA
========================= */

.no-media {
  padding: 16px;

  color: var(--color-text-muted);

  background: var(--color-surface-secondary);

  border-radius: 12px;

  font-size: 13px;
}


/* =========================
   INTRouvable
========================= */

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 60px 20px;

  color: var(--color-text-muted);

  text-align: center;
}

.not-found h1 {
  margin: 14px 0 6px;

  color: var(--color-text);

  font-size: 20px;
}

.not-found p {
  max-width: 320px;

  margin: 0 0 18px;

  font-size: 14px;
  line-height: 1.5;
}

.not-found a {
  color: var(--color-text);

  font-size: 14px;
  font-weight: 500;
}

</style>