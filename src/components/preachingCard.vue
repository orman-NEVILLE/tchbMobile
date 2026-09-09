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
  <RouterLink
    :to="`/predications/${preaching.id}`"
    class="preaching-card"
  >
    <div class="thumbnail">
      <div class="play-button">
        <Play
          :size="20"
          :stroke-width="2.5"
          fill="currentColor"
        />
      </div>
    </div>

    <div class="content">
      <h3 class="title">
        {{ preaching.title }}
      </h3>

      <p class="preacher">
        {{ preaching.preacher }}
      </p>

      <div class="metadata">
        <span>{{ preaching.date }}</span>

        <span class="separator">•</span>

        <span class="duration">
          <Clock :size="14" />
          {{ preaching.duration }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.preaching-card {
  display: flex;
  gap: 14px;

  width: 100%;
  box-sizing: border-box;

  padding: 12px;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;

  text-decoration: none;
  color: var(--color-text);

  cursor: pointer;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    transform 0.2s ease;
}

.preaching-card:hover {
  background: var(--color-surface-hover);
}

.preaching-card:active {
  transform: scale(0.99);
}

/* Miniature */

.thumbnail {
  width: 92px;
  height: 92px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: var(--color-surface-secondary);

  transition: background-color 0.25s ease;
}

/* Bouton lecture */

.play-button {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background: var(--color-text);
  color: var(--color-surface);

  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    transform 0.2s ease;
}

.preaching-card:hover .play-button {
  transform: scale(1.05);
}

/* Contenu */

.content {
  min-width: 0;
  flex: 1;
}

/* Titre */

.title {
  margin: 0;

  color: var(--color-text);

  font-size: 15px;
  font-weight: 650;

  transition: color 0.25s ease;
}

/* Prédicateur */

.preacher {
  margin: 6px 0 10px;

  color: var(--color-text-secondary);

  font-size: 13px;

  transition: color 0.25s ease;
}

/* Métadonnées */

.metadata {
  display: flex;
  align-items: center;
  gap: 6px;

  color: var(--color-text-muted);

  font-size: 12px;

  transition: color 0.25s ease;
}

.duration {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.separator {
  color: var(--color-border);
}
</style>