<script setup>
import {
  LoaderCircle,
  Mic2,
  Search,
} from 'lucide-vue-next'

import {
  computed,
  onMounted,
  ref,
} from 'vue'

import PreachingCard from '@/components/PreachingCard.vue'
import { getSermons } from '@/functions/sermons'

const search = ref('')

const preachings = ref([])

const isLoading = ref(true)
const errorMessage = ref('')

const loadPreachings = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getSermons()

    preachings.value = response.data || []
  } catch (error) {
    console.error(
      'Erreur lors du chargement des prédications :',
      error
    )

    errorMessage.value =
      error.message ||
      'Impossible de charger les prédications.'
  } finally {
    isLoading.value = false
  }
}

const filteredPreachings = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) {
    return preachings.value
  }

  return preachings.value.filter((preaching) => {
    const title =
      preaching.title?.toLowerCase() || ''

    const preacher =
      preaching.preacher_name?.toLowerCase() || ''

    return (
      title.includes(query) ||
      preacher.includes(query)
    )
  })
})

onMounted(() => {
  loadPreachings()
})
</script>

<template>
  <div class="preachings-page">

    <!-- =========================
         EN-TÊTE
    ========================== -->

    <section class="page-header">

      <div class="page-icon">
        <Mic2
          :size="22"
          :stroke-width="2"
        />
      </div>

      <div class="page-header-content">
        <h1>
          Prédications
        </h1>

        <p>
          Découvrez nos enseignements et grandissez dans la foi.
        </p>
      </div>

    </section>


    <!-- =========================
         RECHERCHE
    ========================== -->

    <div class="search-box">

      <Search
        :size="19"
        :stroke-width="2"
        class="search-icon"
      />

      <input
        v-model="search"
        type="search"
        placeholder="Rechercher une prédication..."
        aria-label="Rechercher une prédication"
      />

    </div>


    <!-- =========================
         RÉSULTATS
    ========================== -->

    <section class="results-section">

      <div class="results-header">

        <h2>
          {{
            search.trim()
              ? 'Résultats'
              : 'Toutes les prédications'
          }}
        </h2>

        <span class="results-count">
          {{ filteredPreachings.length }}
        </span>

      </div>


      <!-- =========================
           CHARGEMENT
      ========================== -->

      <div
        v-if="isLoading"
        class="loading-state"
      >
        <LoaderCircle
          :size="22"
          class="loading-icon"
        />

        <span>
          Chargement des prédications...
        </span>
      </div>


      <!-- =========================
           ERREUR
      ========================== -->

      <div
        v-else-if="errorMessage"
        class="error-state"
      >

        <div class="error-icon">
          <Search :size="22" />
        </div>

        <h3>
          Impossible de charger les prédications
        </h3>

        <p>
          {{ errorMessage }}
        </p>

        <button
          type="button"
          class="retry-button"
          @click="loadPreachings"
        >
          Réessayer
        </button>

      </div>


      <!-- =========================
           LISTE
      ========================== -->

      <div
        v-else-if="filteredPreachings.length"
        class="preachings-list"
      >

        <PreachingCard
          v-for="preaching in filteredPreachings"
          :key="preaching.id"
          :preaching="preaching"
        />

      </div>


      <!-- =========================
           AUCUN RÉSULTAT
      ========================== -->

      <div
        v-else
        class="empty-state"
      >

        <div class="empty-icon">
          <Search :size="24" />
        </div>

        <h3>
          {{
            search.trim()
              ? 'Aucune prédication trouvée'
              : 'Aucune prédication disponible'
          }}
        </h3>

        <p>
          {{
            search.trim()
              ? 'Essayez avec un autre titre ou nom de prédicateur.'
              : 'Les prédications seront affichées ici dès qu’elles seront disponibles.'
          }}
        </p>

      </div>

    </section>

  </div>
</template>

<style scoped>
/* =========================
   PAGE
========================= */

.preachings-page {
  display: flex;
  flex-direction: column;

  gap: 24px;

  color: var(--color-text);

  transition: color 0.25s ease;
}


/* =========================
   EN-TÊTE
========================= */

.page-header {
  display: flex;
  align-items: center;

  gap: 14px;
}

.page-icon {
  width: 46px;
  height: 46px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: var(--color-text);
  color: var(--color-surface);

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.page-header-content {
  min-width: 0;
}

.page-header h1 {
  margin: 0;

  color: var(--color-text);

  font-size: 24px;
  font-weight: 750;
  letter-spacing: -0.3px;

  transition: color 0.25s ease;
}

.page-header p {
  margin: 4px 0 0;

  color: var(--color-text-secondary);

  font-size: 13px;
  line-height: 1.5;

  transition: color 0.25s ease;
}


/* =========================
   RECHERCHE
========================= */

.search-box {
  position: relative;

  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;

  left: 15px;

  color: var(--color-text-muted);

  pointer-events: none;

  transition: color 0.25s ease;
}

.search-box input {
  width: 100%;
  height: 48px;

  box-sizing: border-box;

  padding: 0 16px 0 45px;

  border: 1px solid var(--color-border);
  border-radius: 12px;

  outline: none;

  background: var(--color-surface);
  color: var(--color-text);

  font-family: inherit;
  font-size: 14px;

  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-box input::placeholder {
  color: var(--color-text-muted);
}

.search-box input:focus {
  border-color: var(--color-text-secondary);

  box-shadow:
    0 0 0 3px rgba(156, 163, 175, 0.12);
}


/* =========================
   RÉSULTATS
========================= */

.results-section {
  display: flex;
  flex-direction: column;

  gap: 14px;
}

.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;
}

.results-header h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 17px;
  font-weight: 700;

  transition: color 0.25s ease;
}

.results-count {
  min-width: 24px;
  height: 24px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0 7px;

  box-sizing: border-box;

  border-radius: 20px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);

  font-size: 12px;
  font-weight: 600;

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}


/* =========================
   CHARGEMENT
========================= */

.loading-state {
  min-height: 140px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;

  color: var(--color-text-muted);

  font-size: 13px;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}


/* =========================
   LISTE
========================= */

.preachings-list {
  display: flex;
  flex-direction: column;

  gap: 12px;
}


/* =========================
   ERREUR
========================= */

.error-state {
  padding: 32px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  background: var(--color-surface);

  border: 1px solid var(--color-border);
  border-radius: 14px;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.error-icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 14px;

  border-radius: 50%;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.error-state h3 {
  margin: 0;

  color: var(--color-text);

  font-size: 15px;
  font-weight: 650;

  transition: color 0.25s ease;
}

.error-state p {
  max-width: 320px;

  margin: 6px 0 16px;

  color: var(--color-text-muted);

  font-size: 13px;
  line-height: 1.5;

  transition: color 0.25s ease;
}

.retry-button {
  min-height: 38px;

  padding: 0 16px;

  border: none;
  border-radius: 9px;

  background: var(--color-text);
  color: var(--color-surface);

  font-family: inherit;
  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.retry-button:hover {
  opacity: 0.88;
}

.retry-button:active {
  transform: scale(0.97);
}


/* =========================
   AUCUN RÉSULTAT
========================= */

.empty-state {
  padding: 40px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  background: var(--color-surface);

  border: 1px solid var(--color-border);
  border-radius: 14px;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.empty-icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 14px;

  border-radius: 50%;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.empty-state h3 {
  margin: 0;

  color: var(--color-text);

  font-size: 15px;
  font-weight: 650;

  transition: color 0.25s ease;
}

.empty-state p {
  max-width: 280px;

  margin: 6px 0 0;

  color: var(--color-text-muted);

  font-size: 13px;
  line-height: 1.5;

  transition: color 0.25s ease;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 22px;
  }

  .page-header p {
    font-size: 12px;
  }

  .search-box input {
    height: 46px;

    font-size: 13px;
  }

  .results-header h2 {
    font-size: 16px;
  }
}
</style>