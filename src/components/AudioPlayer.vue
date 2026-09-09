<script setup>
import {
  FastForward,
  Mic2,
  Pause,
  Play,
  Rewind,
  RotateCcw,
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

/* =========================
   Lecture / pause
========================= */

const togglePlay = async () => {
  if (!audioElement.value) {
    return
  }

  try {
    if (isPlaying.value) {
      audioElement.value.pause()
    } else {
      await audioElement.value.play()
    }
  } catch (error) {
    console.error(
      'Impossible de lire l’audio :',
      error
    )
  }
}

/* =========================
   Temps
========================= */

const updateTime = () => {
  if (!audioElement.value) {
    return
  }

  currentTime.value =
    audioElement.value.currentTime
}

const setDuration = () => {
  if (!audioElement.value) {
    return
  }

  duration.value =
    audioElement.value.duration
}

/* =========================
   Événements audio
========================= */

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

/* =========================
   Avancer de 10 secondes
========================= */

const forward = () => {
  if (
    !audioElement.value ||
    !Number.isFinite(duration.value)
  ) {
    return
  }

  audioElement.value.currentTime = Math.min(
    duration.value,
    audioElement.value.currentTime + 10
  )
}

/* =========================
   Reculer de 10 secondes
========================= */

const rewind = () => {
  if (!audioElement.value) {
    return
  }

  audioElement.value.currentTime = Math.max(
    0,
    audioElement.value.currentTime - 10
  )
}

/* =========================
   Recommencer
========================= */

const restart = () => {
  if (!audioElement.value) {
    return
  }

  audioElement.value.currentTime = 0
  currentTime.value = 0
}

/* =========================
   Barre de progression
========================= */

const seek = (event) => {
  if (
    !audioElement.value ||
    !Number.isFinite(duration.value) ||
    duration.value <= 0
  ) {
    return
  }

  const rect =
    event.currentTarget.getBoundingClientRect()

  const position =
    event.clientX - rect.left

  const percentage = Math.max(
    0,
    Math.min(
      1,
      position / rect.width
    )
  )

  audioElement.value.currentTime =
    percentage * duration.value
}

/* =========================
   Format du temps
========================= */

const formatTime = (time) => {
  if (!Number.isFinite(time)) {
    return '00:00'
  }

  const minutes =
    Math.floor(time / 60)

  const seconds =
    Math.floor(time % 60)

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

/* =========================
   Montage
========================= */

onMounted(() => {
  if (!audioElement.value) {
    return
  }

  audioElement.value.addEventListener(
    'loadedmetadata',
    setDuration
  )

  audioElement.value.addEventListener(
    'durationchange',
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

/* =========================
   Nettoyage
========================= */

onBeforeUnmount(() => {
  if (!audioElement.value) {
    return
  }

  audioElement.value.removeEventListener(
    'loadedmetadata',
    setDuration
  )

  audioElement.value.removeEventListener(
    'durationchange',
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

    <!-- =========================
         En-tête
    ========================== -->

    <div class="audio-player-header">

      <div class="audio-player-icon">
        <Mic2
          :size="20"
          :stroke-width="2"
        />
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

    <!-- =========================
         Lecteur natif du navigateur
    ========================== -->

    <audio
      ref="audioElement"
      class="native-audio"
      controls
      preload="metadata"
      :src="props.src"
    >
      Votre navigateur ne prend pas en charge
      la lecture audio.
    </audio>

    <!-- =========================
         Contrôles TCHB
    ========================== -->

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

    <!-- =========================
         Progression TCHB
    ========================== -->

    <div
      class="progress-container"
      role="slider"
      tabindex="0"
      :aria-valuemin="0"
      :aria-valuemax="duration || 0"
      :aria-valuenow="currentTime"
      aria-label="Progression de la lecture"
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

    <!-- =========================
         Temps
    ========================== -->

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
  width: 100%;
  box-sizing: border-box;

  padding: 20px;

  background: var(--color-surface);

  border: 1px solid var(--color-border);
  border-radius: 14px;

  color: var(--color-text);

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;
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

  background: var(--color-text);
  color: var(--color-surface);

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.audio-player-info {
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 4px;
}

.audio-player-info span {
  color: var(--color-text-muted);

  font-size: 11px;

  transition:
    color 0.25s ease;
}

.audio-player-info strong {
  overflow: hidden;

  color: var(--color-text);

  font-size: 14px;
  font-weight: 650;

  text-overflow: ellipsis;
  white-space: nowrap;

  transition:
    color 0.25s ease;
}

/* =========================
   Lecteur natif
========================= */

.native-audio {
  display: block;

  width: 100%;

  margin: 0 0 20px;

  border-radius: 8px;

  /*
   * Permet au navigateur d'adapter
   * ses contrôles au thème de l'application.
   */
  color-scheme: light dark;
}

/* =========================
   Contrôles personnalisés
========================= */

.custom-controls {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;

  margin-bottom: 12px;
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

/* =========================
   Progression
========================= */

.progress-container {
  width: 100%;

  padding: 8px 0;

  cursor: pointer;

  outline: none;
}

.progress-bar {
  width: 100%;
  height: 5px;

  overflow: hidden;

  border-radius: 10px;

  background: var(--color-surface-secondary);

  transition:
    background-color 0.25s ease;
}

.progress {
  height: 100%;

  border-radius: inherit;

  background: var(--color-text);

  transition:
    background-color 0.25s ease,
    width 0.1s linear;
}

/* =========================
   Temps
========================= */

.time-container {
  display: flex;
  justify-content: space-between;

  margin-top: 3px;

  color: var(--color-text-muted);

  font-size: 11px;

  transition:
    color 0.25s ease;
}

/* =========================
   Mobile
========================= */

@media (max-width: 480px) {

  .audio-player {
    padding: 16px;
  }

  .audio-player-header {
    margin-bottom: 16px;
  }

  .custom-controls {
    gap: 10px;
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