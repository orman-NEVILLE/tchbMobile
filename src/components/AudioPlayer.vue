<script setup>
import {
  Mic2,
  Pause,
  Play,
  RotateCcw,
  Rewind,
  FastForward,
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

  title: {
    type: String,
    default: 'Audio de la prédication',
  },
})

const audioElement = ref(null)

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const togglePlay = () => {
  if (!audioElement.value) {
    return
  }

  if (isPlaying.value) {
    audioElement.value.pause()
  } else {
    audioElement.value.play()
  }
}

const updateTime = () => {
  if (!audioElement.value) {
    return
  }

  currentTime.value = audioElement.value.currentTime
}

const setDuration = () => {
  if (!audioElement.value) {
    return
  }

  duration.value = audioElement.value.duration
}

const handlePlay = () => {
  isPlaying.value = true
}

const handlePause = () => {
  isPlaying.value = false
}

const handleEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
}

/**
 * Avancer de 10 secondes
 */
const forward = () => {
  if (!audioElement.value) {
    return
  }

  audioElement.value.currentTime = Math.min(
    audioElement.value.duration,
    audioElement.value.currentTime + 10
  )
}

/**
 * Reculer de 10 secondes
 */
const rewind = () => {
  if (!audioElement.value) {
    return
  }

  audioElement.value.currentTime = Math.max(
    0,
    audioElement.value.currentTime - 10
  )
}

/**
 * Recommencer
 */
const restart = () => {
  if (!audioElement.value) {
    return
  }

  audioElement.value.currentTime = 0
  currentTime.value = 0
}

/**
 * Cliquer sur la barre de progression
 */
const seek = (event) => {
  if (!audioElement.value || !duration.value) {
    return
  }

  const rect = event.currentTarget.getBoundingClientRect()

  const position = event.clientX - rect.left

  const percentage = position / rect.width

  audioElement.value.currentTime =
    percentage * duration.value
}

/**
 * Format du temps
 */
const formatTime = (time) => {
  if (!Number.isFinite(time)) {
    return '00:00'
  }

  const minutes = Math.floor(time / 60)

  const seconds = Math.floor(time % 60)

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

onMounted(() => {
  if (!audioElement.value) {
    return
  }

  audioElement.value.addEventListener(
    'loadedmetadata',
    setDuration
  )

  audioElement.value.addEventListener(
    'timeupdate',
    updateTime
  )

  audioElement.value.addEventListener(
    'play',
    handlePlay
  )

  audioElement.value.addEventListener(
    'pause',
    handlePause
  )

  audioElement.value.addEventListener(
    'ended',
    handleEnded
  )
})

onBeforeUnmount(() => {
  if (!audioElement.value) {
    return
  }

  audioElement.value.removeEventListener(
    'loadedmetadata',
    setDuration
  )

  audioElement.value.removeEventListener(
    'timeupdate',
    updateTime
  )

  audioElement.value.removeEventListener(
    'play',
    handlePlay
  )

  audioElement.value.removeEventListener(
    'pause',
    handlePause
  )

  audioElement.value.removeEventListener(
    'ended',
    handleEnded
  )
})
</script>

<template>
  <div class="audio-player">

    <!-- En-tête -->
    <div class="audio-player-header">

      <div class="audio-player-icon">
        <Mic2 :size="20" />
      </div>

      <div class="audio-player-info">

        <span>
          Écouter la prédication
        </span>

        <strong>
          {{ props.title }}
        </strong>

      </div>

    </div>

    <!-- Lecteur natif -->
    <audio
      ref="audioElement"
      class="native-audio"
      controls
      preload="metadata"
      :src="props.src"
    >
      Votre navigateur ne prend pas en charge la lecture audio.
    </audio>

    <!-- Contrôles personnalisés -->
    <div class="custom-controls">

      <!-- Reculer -->
      <button
        type="button"
        class="control-button secondary"
        aria-label="Reculer de 10 secondes"
        title="Reculer de 10 secondes"
        @click="rewind"
      >
        <Rewind :size="18" />
      </button>

      <!-- Recommencer -->
      <button
        type="button"
        class="control-button secondary"
        aria-label="Recommencer"
        title="Recommencer"
        @click="restart"
      >
        <RotateCcw :size="18" />
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

      <!-- Avancer -->
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

    <!-- Progression personnalisée -->
    <div
      class="progress-container"
      @click="seek"
    >
      <div class="progress-bar">

        <div
          class="progress"
          :style="{
            width: duration
              ? `${(currentTime / duration) * 100}%`
              : '0%'
          }"
        ></div>

      </div>
    </div>

    <div class="time-container">

      <span>
        {{ formatTime(currentTime) }}
      </span>

      <span>
        {{ formatTime(duration) }}
      </span>

    </div>

  </div>
</template>

<style scoped>
.audio-player {
  padding: 20px;

  background: #ffffff;

  border: 1px solid #e9ecef;
  border-radius: 14px;
}

/* =========================
   En-tête
========================= */

.audio-player-header {
  display: flex;
  align-items: center;
  gap: 12px;

  margin-bottom: 18px;
}

.audio-player-icon {
  width: 44px;
  height: 44px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 11px;

  background: #111827;
  color: #ffffff;
}

.audio-player-info {
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 4px;
}

.audio-player-info span {
  color: #9ca3af;

  font-size: 11px;
}

.audio-player-info strong {
  overflow: hidden;

  color: #111827;

  font-size: 14px;
  font-weight: 650;

  text-overflow: ellipsis;
  white-space: nowrap;
}

/* =========================
   Lecteur natif
========================= */

.native-audio {
  display: block;

  width: 100%;

  margin-bottom: 18px;
}

/* =========================
   Progression
========================= */

.progress-container {
  width: 100%;

  padding: 8px 0;

  cursor: pointer;
}

.progress-bar {
  width: 100%;
  height: 5px;

  overflow: hidden;

  border-radius: 10px;

  background: #e5e7eb;
}

.progress {
  height: 100%;

  border-radius: inherit;

  background: #111827;

  transition: width 0.1s linear;
}

.time-container {
  display: flex;
  justify-content: space-between;

  margin-top: 3px;

  color: #9ca3af;

  font-size: 11px;
}

/* =========================
   Contrôles
========================= */

.custom-controls {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;

  margin-bottom: 4px;
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