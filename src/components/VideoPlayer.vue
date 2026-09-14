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
const videoError = ref(null)

/* =========================
   Lecture / pause
========================= */

const togglePlay = async () => {
  if (!videoElement.value) {
    return
  }

  try {
    if (isPlaying.value) {
      videoElement.value.pause()
    } else {
      await videoElement.value.play()
    }
  } catch (error) {
    console.error(
      'Impossible de lire la vidéo :',
      error
    )
  }
}

/* =========================
   Événements vidéo
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

const handleLoadedMetadata = () => {
  console.log(
    'Métadonnées vidéo chargées :',
    videoElement.value?.duration
  )
}

const handleLoadedData = () => {
  console.log('Données vidéo chargées.')
}

const handleCanPlay = () => {
  console.log('Vidéo prête à être lue.')
}

const handleVideoError = () => {
  const video = videoElement.value

  if (!video) {
    return
  }

  const error = video.error

  videoError.value = error

  console.error('Erreur vidéo :', {
    code: error?.code,
    message: error?.message,
    src: video.currentSrc,
    networkState: video.networkState,
    readyState: video.readyState,
  })
}

/* =========================
   Reculer de 10 secondes
========================= */

const rewind = () => {
  if (!videoElement.value) {
    return
  }

  videoElement.value.currentTime = Math.max(
    0,
    videoElement.value.currentTime - 10
  )
}

/* =========================
   Avancer de 10 secondes
========================= */

const forward = () => {
  if (
    !videoElement.value ||
    !Number.isFinite(videoElement.value.duration)
  ) {
    return
  }

  videoElement.value.currentTime = Math.min(
    videoElement.value.duration,
    videoElement.value.currentTime + 10
  )
}

/* =========================
   Clic sur la vidéo
========================= */

const handleVideoClick = (event) => {
  if (!videoElement.value) {
    return
  }

  const video = videoElement.value
  const rect = video.getBoundingClientRect()

  const clickPosition =
    event.clientX - rect.left

  const middle = rect.width / 2

  if (clickPosition < middle) {
    rewind()
  } else {
    forward()
  }
}

/* =========================
   Chargement de la source
========================= */

const loadVideo = () => {
  if (!videoElement.value || !props.src) {
    return
  }

  console.log(
    'Chargement vidéo :',
    props.src
  )

  videoError.value = null

  videoElement.value.load()
}

/* =========================
   Montage
========================= */

onMounted(() => {
  if (!videoElement.value) {
    return
  }

  videoElement.value.addEventListener(
    'play',
    handlePlay
  )

  videoElement.value.addEventListener(
    'pause',
    handlePause
  )

  videoElement.value.addEventListener(
    'ended',
    handleEnded
  )

  videoElement.value.addEventListener(
    'loadedmetadata',
    handleLoadedMetadata
  )

  videoElement.value.addEventListener(
    'loadeddata',
    handleLoadedData
  )

  videoElement.value.addEventListener(
    'canplay',
    handleCanPlay
  )

  videoElement.value.addEventListener(
    'error',
    handleVideoError
  )

  loadVideo()
})

/* =========================
   Changement de source
========================= */

watch(
  () => props.src,
  () => {
    loadVideo()
  }
)

/* =========================
   Nettoyage
========================= */

onBeforeUnmount(() => {
  if (!videoElement.value) {
    return
  }

  videoElement.value.removeEventListener(
    'play',
    handlePlay
  )

  videoElement.value.removeEventListener(
    'pause',
    handlePause
  )

  videoElement.value.removeEventListener(
    'ended',
    handleEnded
  )

  videoElement.value.removeEventListener(
    'loadedmetadata',
    handleLoadedMetadata
  )

  videoElement.value.removeEventListener(
    'loadeddata',
    handleLoadedData
  )

  videoElement.value.removeEventListener(
    'canplay',
    handleCanPlay
  )

  videoElement.value.removeEventListener(
    'error',
    handleVideoError
  )
})
</script>

<template>
  <div class="video-player">

    <!-- Vidéo -->
    <video
      ref="videoElement"
      class="video"
      controls
      preload="metadata"
      :src="props.src"
      @click="handleVideoClick"
    >
      Votre navigateur ne prend pas en charge
      la lecture vidéo.
    </video>

    <!-- Contrôles supplémentaires -->
    <div class="video-controls">

      <button
        type="button"
        class="control-button secondary"
        aria-label="Reculer de 10 secondes"
        title="Reculer de 10 secondes"
        @click="rewind"
      >
        <Rewind :size="18" />
      </button>

      <button
        type="button"
        class="control-button play"
        :aria-label="
          isPlaying
            ? 'Mettre en pause'
            : 'Lire'
        "
        :title="
          isPlaying
            ? 'Mettre en pause'
            : 'Lire'
        "
        @click="togglePlay"
      >
        <Pause
          v-if="isPlaying"
          :size="22"
          :stroke-width="2.5"
          fill="currentColor"
        />

        <Play
          v-else
          :size="22"
          :stroke-width="2.5"
          fill="currentColor"
        />
      </button>

      <button
        type="button"
        class="control-button secondary"
        aria-label="Avancer de 10 secondes"
        title="Avancer de 10 secondes"
        @click="forward"
      >
        <FastForward :size="18" />
      </button>

    </div>

  </div>
</template>

<style scoped>
.video-player {
  width: 100%;
  overflow: hidden;

  background: #000000;

  border: 1px solid var(--color-border);
  border-radius: 14px;

  transition: border-color 0.25s ease;
}

.video {
  display: block;

  width: 100%;

  aspect-ratio: 16 / 9;

  background: #000000;
}

.video-controls {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;

  padding: 14px;

  background: var(--color-surface);

  transition: background-color 0.25s ease;
}

.control-button {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;

  cursor: pointer;

  transition:
    transform 0.15s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.control-button:hover {
  transform: scale(1.05);
}

.control-button:active {
  transform: scale(0.96);
}

.control-button.secondary {
  width: 38px;
  height: 38px;

  border-radius: 50%;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);

  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    transform 0.15s ease;
}

.control-button.secondary:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}

.control-button.play {
  width: 50px;
  height: 50px;

  border-radius: 50%;

  background: var(--color-text);
  color: var(--color-surface);

  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    transform 0.15s ease;
}

@media (max-width: 480px) {
  .video-controls {
    gap: 10px;

    padding: 12px;
  }

  .control-button.secondary {
    width: 36px;
    height: 36px;
  }

  .control-button.play {
    width: 48px;
    height: 48px;
  }
}
</style>