<script setup>
import {
  FastForward,
  Pause,
  Play,
  Rewind,
} from 'lucide-vue-next'

import {
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
})

const videoElement = ref(null)

const isPlaying = ref(false)
const hasError = ref(false)
const isReady = ref(false)


/* =========================
   LECTURE / PAUSE
========================= */

const togglePlay = async () => {
  const video = videoElement.value

  if (!video) {
    return
  }

  try {
    if (video.paused) {
      await video.play()
    } else {
      video.pause()
    }
  } catch (error) {
    console.error(
      'Impossible de lire la vidéo :',
      error
    )
  }
}


/* =========================
   RECULER
========================= */

const rewind = () => {
  const video = videoElement.value

  if (!video) {
    return
  }

  video.currentTime = Math.max(
    0,
    video.currentTime - 10
  )
}


/* =========================
   AVANCER
========================= */

const forward = () => {
  const video = videoElement.value

  if (
    !video ||
    !Number.isFinite(video.duration)
  ) {
    return
  }

  video.currentTime = Math.min(
    video.duration,
    video.currentTime + 10
  )
}


/* =========================
   CLIC SUR LA VIDÉO
========================= */

const handleVideoClick = (event) => {
  const video = videoElement.value

  if (!video || !isReady.value) {
    return
  }

  /*
   * On ne fait rien si le clic vient
   * d'un contrôle natif du navigateur.
   */

  const rect = video.getBoundingClientRect()

  const position =
    event.clientX - rect.left

  const middle = rect.width / 2

  if (position < middle) {
    rewind()
  } else {
    forward()
  }
}


/* =========================
   ÉVÉNEMENTS
========================= */

const handlePlay = () => {
  isPlaying.value = true
}

const handlePause = () => {
  isPlaying.value = false
}

const handleEnded = () => {
  isPlaying.value = false
}

const handleCanPlay = () => {
  isReady.value = true
  hasError.value = false
}

const handleError = () => {
  isPlaying.value = false
  isReady.value = false
  hasError.value = true

  const video = videoElement.value

  if (!video) {
    return
  }

  console.error(
    'Erreur lors du chargement de la vidéo :',
    {
      src: video.currentSrc,
      error: video.error,
    }
  )
}


/* =========================
   CHARGEMENT
========================= */

const loadVideo = () => {
  const video = videoElement.value

  if (!video || !props.src) {
    return
  }

  isPlaying.value = false
  isReady.value = false
  hasError.value = false

  video.load()
}


/* =========================
   MONTAGE
========================= */

onMounted(() => {
  const video = videoElement.value

  if (!video) {
    return
  }

  video.addEventListener(
    'play',
    handlePlay
  )

  video.addEventListener(
    'pause',
    handlePause
  )

  video.addEventListener(
    'ended',
    handleEnded
  )

  video.addEventListener(
    'canplay',
    handleCanPlay
  )

  video.addEventListener(
    'error',
    handleError
  )

  loadVideo()
})


/* =========================
   SOURCE
========================= */

watch(
  () => props.src,
  () => {
    loadVideo()
  }
)


/* =========================
   NETTOYAGE
========================= */

onBeforeUnmount(() => {
  const video = videoElement.value

  if (!video) {
    return
  }

  video.removeEventListener(
    'play',
    handlePlay
  )

  video.removeEventListener(
    'pause',
    handlePause
  )

  video.removeEventListener(
    'ended',
    handleEnded
  )

  video.removeEventListener(
    'canplay',
    handleCanPlay
  )

  video.removeEventListener(
    'error',
    handleError
  )
})
</script>


<template>
  <div class="video-player">

    <!-- =========================
         VIDÉO
    ========================== -->

    <div class="video-wrapper">

      <video
        ref="videoElement"
        class="video"
        controls
        preload="metadata"
        playsinline
        :src="props.src"
        @click="handleVideoClick"
      >
        Votre navigateur ne prend pas en charge
        la lecture vidéo.
      </video>


      <!-- ERREUR -->

      <div
        v-if="hasError"
        class="video-error"
      >
        <p>
          Impossible de charger cette vidéo.
        </p>

        <button
          type="button"
          @click="loadVideo"
        >
          Réessayer
        </button>
      </div>

    </div>


    <!-- =========================
         CONTRÔLES RAPIDES
    ========================== -->

    <div class="quick-controls">

      <button
        type="button"
        class="quick-button"
        aria-label="Reculer de 10 secondes"
        title="Reculer de 10 secondes"
        @click="rewind"
      >
        <Rewind
          :size="17"
          :stroke-width="1.9"
        />

        <span>
          10
        </span>
      </button>


      <button
        type="button"
        class="play-button"
        :aria-label="
          isPlaying
            ? 'Mettre en pause'
            : 'Lire la vidéo'
        "
        :title="
          isPlaying
            ? 'Mettre en pause'
            : 'Lire la vidéo'
        "
        @click="togglePlay"
      >
        <Pause
          v-if="isPlaying"
          :size="20"
          :stroke-width="2.2"
          fill="currentColor"
        />

        <Play
          v-else
          :size="20"
          :stroke-width="2.2"
          fill="currentColor"
        />
      </button>


      <button
        type="button"
        class="quick-button"
        aria-label="Avancer de 10 secondes"
        title="Avancer de 10 secondes"
        @click="forward"
      >
        <FastForward
          :size="17"
          :stroke-width="1.9"
        />

        <span>
          10
        </span>
      </button>

    </div>

  </div>
</template>


<style scoped>
/* =========================
   CONTENEUR
========================= */

.video-player {
  width: 100%;

  overflow: hidden;

  background: #000;

  border-radius: 14px;
}


/* =========================
   VIDÉO
========================= */

.video-wrapper {
  position: relative;

  width: 100%;

  background: #000;
}

.video {
  display: block;

  width: 100%;
  height: auto;

  aspect-ratio: 16 / 9;

  object-fit: contain;

  background: #000;
}


/* =========================
   CONTRÔLES RAPIDES
========================= */

.quick-controls {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 10px;

  min-height: 58px;

  padding: 9px 14px;

  background: var(--color-surface);

  border-top: 1px solid var(--color-border);
}


/* =========================
   BOUTONS SECONDAIRES
========================= */

.quick-button {
  position: relative;

  width: 42px;
  height: 38px;

  display: flex;

  align-items: center;
  justify-content: center;

  gap: 2px;

  padding: 0;

  border: 0;
  border-radius: 8px;

  background: transparent;

  color: var(--color-text-secondary);

  cursor: pointer;

  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.quick-button:hover {
  background: var(--color-surface-secondary);

  color: var(--color-text);
}

.quick-button:active {
  transform: scale(0.96);
}

.quick-button span {
  font-size: 8px;

  font-weight: 700;

  line-height: 1;
}


/* =========================
   PLAY
========================= */

.play-button {
  width: 42px;
  height: 42px;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 0;

  border: 0;
  border-radius: 10px;

  background: var(--color-text);

  color: var(--color-surface);

  cursor: pointer;

  transition:
    opacity 0.18s ease,
    transform 0.15s ease;
}

.play-button:hover {
  opacity: 0.88;
}

.play-button:active {
  transform: scale(0.95);
}


/* =========================
   ERREUR
========================= */

.video-error {
  position: absolute;

  inset: 0;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 10px;

  padding: 20px;

  background: rgba(0, 0, 0, 0.82);

  color: #fff;

  text-align: center;
}

.video-error p {
  margin: 0;

  font-size: 13px;
}

.video-error button {
  min-height: 34px;

  padding: 0 13px;

  border: 1px solid rgba(255, 255, 255, 0.3);

  border-radius: 8px;

  background: transparent;

  color: #fff;

  font-size: 12px;
  font-weight: 600;

  cursor: pointer;
}

.video-error button:hover {
  background: rgba(255, 255, 255, 0.1);
}


/* =========================
   MOBILE
========================= */

@media (max-width: 480px) {

  .quick-controls {
    min-height: 54px;

    gap: 7px;

    padding: 7px 10px;
  }

  .quick-button {
    width: 40px;
    height: 36px;
  }

  .play-button {
    width: 40px;
    height: 40px;
  }
}
</style>