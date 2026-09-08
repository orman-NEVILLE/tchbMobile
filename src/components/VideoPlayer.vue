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
} from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
})

const videoElement = ref(null)
const isPlaying = ref(false)

const togglePlay = () => {
  if (!videoElement.value) {
    return
  }

  if (isPlaying.value) {
    videoElement.value.pause()
  } else {
    videoElement.value.play()
  }
}

const handlePlay = () => {
  isPlaying.value = true
}

const handlePause = () => {
  isPlaying.value = false
}

const handleEnded = () => {
  isPlaying.value = false
}

/**
 * Reculer de 10 secondes
 */
const rewind = () => {
  if (!videoElement.value) {
    return
  }

  videoElement.value.currentTime = Math.max(
    0,
    videoElement.value.currentTime - 10
  )
}

/**
 * Avancer de 10 secondes
 */
const forward = () => {
  if (!videoElement.value) {
    return
  }

  videoElement.value.currentTime = Math.min(
    videoElement.value.duration,
    videoElement.value.currentTime + 10
  )
}

/**
 * Clic sur la vidéo
 *
 * Moitié gauche  → -10 secondes
 * Moitié droite → +10 secondes
 */
const handleVideoClick = (event) => {
  if (!videoElement.value) {
    return
  }

  const video = videoElement.value

  const rect = video.getBoundingClientRect()

  const clickPosition = event.clientX - rect.left

  const middle = rect.width / 2

  if (clickPosition < middle) {
    rewind()
  } else {
    forward()
  }
}

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
})

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

      <!-- -10 secondes -->
      <button
        type="button"
        class="control-button secondary"
        aria-label="Reculer de 10 secondes"
        title="Reculer de 10 secondes"
        @click="rewind"
      >
        <Rewind :size="18" />
      </button>

      <!-- Lecture / pause -->
      <button
        type="button"
        class="control-button play"
        :aria-label="isPlaying ? 'Mettre en pause' : 'Lire'"
        @click="togglePlay"
      >
        <Pause
          v-if="isPlaying"
          :size="22"
          fill="currentColor"
        />

        <Play
          v-else
          :size="22"
          fill="currentColor"
        />
      </button>

      <!-- +10 secondes -->
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
  overflow: hidden;

  background: #000000;

  border: 1px solid #e9ecef;
  border-radius: 14px;
}

/* =========================
   Vidéo
========================= */

.video {
  display: block;

  width: 100%;

  aspect-ratio: 16 / 9;

  background: #000000;
}

/* =========================
   Contrôles
========================= */

.video-controls {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;

  padding: 14px;

  background: #ffffff;
}

.control-button {
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;

  cursor: pointer;

  transition:
    transform 0.15s ease,
    background 0.2s ease;
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

  background: #f1f3f5;
  color: #6b7280;
}

.control-button.play {
  width: 50px;
  height: 50px;

  border-radius: 50%;

  background: #111827;
  color: #ffffff;
}
</style>