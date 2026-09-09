<script setup>
import { User } from 'lucide-vue-next'

defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="profile-button"
    aria-label="Profil"
    @click="$emit('click')"
  >
    <span class="profile-avatar">
      <User
        :size="19"
        :stroke-width="2"
      />
    </span>
  </button>
</template>

<style scoped>
.profile-button {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
  border: none;
  border-radius: 50%;

  background: transparent;
  color: var(--color-text-secondary);

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.profile-button:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}

.profile-button:active {
  transform: scale(0.96);
}

.profile-avatar {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}
</style>