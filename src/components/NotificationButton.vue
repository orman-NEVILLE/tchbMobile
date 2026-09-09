<script setup>
import { Bell } from 'lucide-vue-next'

const props = defineProps({
  count: {
    type: Number,
    default: 2,
  },
})
</script>

<template>
  <button
    type="button"
    class="notification-button"
    aria-label="Notifications"
  >
    <Bell
      :size="21"
      :stroke-width="2"
    />

    <span
      v-if="props.count > 0"
      class="notification-badge"
    >
      {{ props.count > 9 ? '9+' : props.count }}
    </span>
  </button>
</template>

<style scoped>
.notification-button {
  position: relative;
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
  border: none;
  border-radius: 50%;

  background: transparent;
  color: #4b5563;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.notification-button:hover {
  background: #f3f4f6;
  color: #111827;
}

.notification-button:active {
  transform: scale(0.96);
}

/* Badge */
.notification-badge {
  position: absolute;
  top: 4px;
  right: 3px;

  min-width: 15px;
  height: 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 3px;
  box-sizing: border-box;

  border: 2px solid #ffffff;
  border-radius: 20px;

  background: #111827;
  color: #ffffff;

  font-size: 8px;
  font-weight: 700;
  line-height: 1;
}
</style>