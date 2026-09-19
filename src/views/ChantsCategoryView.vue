<script setup>
import {
  ArrowLeft,
  LoaderCircle,
  Music2,
} from 'lucide-vue-next'

import {
  computed,
  onMounted,
  ref,
} from 'vue'

import {
  RouterLink,
  useRoute,
} from 'vue-router'

import ChantCard from '@/components/ChantCard.vue'
import { getChants } from '@/functions/chants'

const route = useRoute()

const chants = ref([])

const isLoading = ref(true)
const errorMessage = ref('')

const category = computed(() => {
  return route.params.category === 'meditation'
    ? 'Méditation'
    : 'Louange'
})

const loadChants = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getChants()

    chants.value = response.data || []
  } catch (error) {
    console.error(
      'Erreur lors du chargement des chants :',
      error
    )

    errorMessage.value =
      error.message ||
      'Impossible de charger les chants.'
  } finally {
    isLoading.value = false
  }
}

const filteredChants = computed(() => {
  const selectedCategory = category.value.toLowerCase()

  return chants.value.filter((chant) => {
    return (
      chant.category?.name?.toLowerCase() ===
      selectedCategory
    )
  })
})

onMounted(() => {
  loadChants()
})
</script>

<template>
  <section class="category-view">

    <RouterLink
      to="/chants"
      class="back-link"
    >
      <ArrowLeft :size="18" />

      <span>Chants</span>
    </RouterLink>

    <header class="page-header">
      <div class="page-icon">
        <Music2 :size="23" />
      </div>

      <div>
        <h1>{{ category }}</h1>

        <p>
          {{ filteredChants.length }}
          contenu{{ filteredChants.length > 1 ? 's' : '' }}
        </p>
      </div>
    </header>

    <!-- Chargement -->
    <div
      v-if="isLoading"
      class="state-message"
    >
      <LoaderCircle
        :size="22"
        class="loading-icon"
      />

      <span>Chargement des chants...</span>
    </div>

    <!-- Erreur -->
    <div
      v-else-if="errorMessage"
      class="state-message error"
    >
      <span>{{ errorMessage }}</span>

      <button
        type="button"
        class="retry-button"
        @click="loadChants"
      >
        Réessayer
      </button>
    </div>

    <!-- Liste -->
    <div
      v-else-if="filteredChants.length"
      class="chants-list"
    >
      <ChantCard
        v-for="chant in filteredChants"
        :key="chant.id"
        :chant="chant"
        :category="route.params.category"
      />
    </div>

    <!-- Aucun résultat -->
    <div
      v-else
      class="state-message"
    >
      <Music2 :size="22" />

      <span>
        Aucun chant disponible dans cette catégorie.
      </span>
    </div>

  </section>
</template>

<style scoped>
.category-view {
  display: flex;
  flex-direction: column;
  gap: 24px;

.state-message {
  min-height: 160px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;

  padding: 24px;

  border: 1px solid var(--color-border);
  border-radius: 14px;

  background: var(--color-surface);

  color: var(--color-text-muted);

  font-size: 14px;
  text-align: center;
}

.loading-icon {
  animation: spin 0.9s linear infinite;
  color: var(--color-text-secondary);
}

.state-message.error {
  color: var(--color-text-secondary);
}

.retry-button {
  padding: 8px 14px;

  border: 1px solid var(--color-border);
  border-radius: 8px;

  background: var(--color-surface-secondary);
  color: var(--color-text);

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.retry-button:hover {
  background: var(--color-surface-hover);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  width: fit-content;

  color: var(--color-text-muted);
  text-decoration: none;

  font-size: 14px;
  font-weight: 500;
}

.back-link:hover {
  color: var(--color-text);
}

.page-header {
  display: flex;
  align-items: center;
  gap: 13px;
}

.page-icon {
  width: 46px;
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 13px;

  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.page-header h1 {
  margin: 0;

  font-size: 24px;
  font-weight: 700;
}

.page-header p {
  margin: 4px 0 0;

  color: var(--color-text-muted);

  font-size: 13px;
}

.chants-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>