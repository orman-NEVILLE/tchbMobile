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
  >
    {{ preaching.title }}
  </RouterLink>
</template>