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
  color: #374151;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.profile-button:hover {
  background: #f3f4f6;
  color: #111827;
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

  background: #f1f3f5;
  color: #374151;
}
</style>