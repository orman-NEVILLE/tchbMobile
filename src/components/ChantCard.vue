<script setup>
import {
  ChevronRight,
  Music2,
} from 'lucide-vue-next'

import { RouterLink } from 'vue-router'

const props = defineProps({
  chant: {
    type: Object,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <RouterLink
    :to="`/chants/${props.category}/${props.chant.id}`"
    class="chant-card"
  >
    <div class="chant-icon">
      <Music2 :size="20" />
    </div>

    <div class="chant-content">
      <h2>
        {{ props.chant.title }}
      </h2>

      <p v-if="props.chant.description">
        {{ props.chant.description }}
      </p>

      <span>
        {{ props.chant.artist_name }}
      </span>
    </div>

    <ChevronRight
      :size="19"
      class="chant-arrow"
    />
  </RouterLink>
</template>

<style scoped>
.chant-card {
  display: flex;
  align-items: center;
  gap: 13px;

  padding: 15px 4px;

  color: var(--color-text);
  text-decoration: none;

  border-bottom: 1px solid var(--color-border);

  transition: background-color 0.2s ease;
}

.chant-card:hover {
  background: var(--color-surface-hover);
}

.chant-icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 11px;

  background: var(--color-surface-secondary);
}

.chant-content {
  flex: 1;
  min-width: 0;
}

.chant-content h2 {
  margin: 0;

  font-size: 15px;
  font-weight: 600;
}

.chant-content p {
  margin: 4px 0;

  color: var(--color-text-muted);

  font-size: 13px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chant-content span {
  color: var(--color-text-muted);

  font-size: 12px;
}

.chant-arrow {
  flex-shrink: 0;
  color: var(--color-text-muted);
}
</style>