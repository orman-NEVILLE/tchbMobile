<script setup>
import { Play, Clock } from 'lucide-vue-next'

defineProps({
  preaching: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="preaching-card">

    <!-- Zone de lecture -->
    <div class="thumbnail">
      <button class="play-button" aria-label="Lire la prédication">
        <Play :size="20" :stroke-width="2.5" fill="currentColor" />
      </button>
    </div>

    <!-- Informations -->
    <div class="content">

      <h3 class="title">
        {{ preaching.title }}
      </h3>

      <p class="preacher">
        {{ preaching.preacher }}
      </p>

      <div class="metadata">

        <span>
          {{ preaching.date }}
        </span>

        <span class="separator">•</span>

        <span class="duration">
          <Clock :size="14" />
          {{ preaching.duration }}
        </span>

      </div>

    </div>

  </article>
</template>

<style scoped>
.preaching-card {
  display: flex;
  gap: 14px;

  padding: 12px;

  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 14px;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.preaching-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}

/* Image / lecture */

.thumbnail {
  flex-shrink: 0;

  width: 92px;
  height: 92px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #eef1f5;
}

.play-button {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background: #111827;
  color: #ffffff;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.play-button:hover {
  transform: scale(1.05);
  background: #000000;
}

/* Contenu */

.content {
  min-width: 0;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  margin: 0;

  color: #111827;

  font-size: 15px;
  font-weight: 650;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.preacher {
  margin: 6px 0 10px;

  color: #6b7280;

  font-size: 13px;
}

.metadata {
  display: flex;
  align-items: center;
  gap: 6px;

  color: #9ca3af;

  font-size: 12px;
}

.separator {
  color: #d1d5db;
}

.duration {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

/* Mobile */

@media (max-width: 380px) {
  .thumbnail {
    width: 78px;
    height: 78px;
  }

  .play-button {
    width: 38px;
    height: 38px;
  }
}
</style>