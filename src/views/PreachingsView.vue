<script setup>
import {
  LoaderCircle,
  Search,
  X,
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

    const category =
      preaching.category?.name?.toLowerCase() || ''

    return (
      title.includes(query) ||
      preacher.includes(query) ||
      category.includes(query)
    )
  })
})

const clearSearch = () => {
  search.value = ''
}

onMounted(() => {
  loadPreachings()
})
</script>

<template>
  <div class="preachings-page">

    <!-- =========================
         EN-TÊTE
    ========================== -->

    <header class="page-header">

      <div>
        <h1>
          Prédications
        </h1>

        <p>
          Retrouvez les enseignements de la Parole.
        </p>
      </div>

    </header>


    <!-- =========================
         RECHERCHE
    ========================== -->

    <div class="search-wrapper">

      <Search
        :size="18"
        :stroke-width="1.8"
        class="search-icon"
      />

      <input
        v-model="search"
        type="search"
        placeholder="Rechercher..."
        aria-label="Rechercher une prédication"
      />

      <button
        v-if="search"
        type="button"
        class="clear-search"
        aria-label="Effacer la recherche"
        @click="clearSearch"
      >
        <X
          :size="16"
          :stroke-width="2"
        />
      </button>

    </div>


    <!-- =========================
         CONTENU
    ========================== -->

    <main class="content">

      <div class="list-header">

        <div class="list-title">

          <span
            v-if="search.trim()"
            class="search-result-label"
          >
            Résultats pour
          </span>

          <h2>
            {{
              search.trim()
                ? `"${search.trim()}"`
                : 'Toutes les prédications'
            }}
          </h2>

        </div>

        <span class="count">
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
          :size="20"
          class="loading-icon"
        />

        <span>
          Chargement...
        </span>

      </div>


      <!-- =========================
           ERREUR
      ========================== -->

      <div
        v-else-if="errorMessage"
        class="state"
      >

        <h3>
          Impossible de charger les prédications
        </h3>

        <p>
          {{ errorMessage }}
        </p>

        <button
          type="button"
          class="state-button"
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
        class="state"
      >

        <div class="empty-search">
          <Search
            :size="19"
            :stroke-width="1.7"
          />
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
              : 'Les prédications apparaîtront ici lorsqu’elles seront disponibles.'
          }}
        </p>

        <button
          v-if="search.trim()"
          type="button"
          class="state-button secondary"
          @click="clearSearch"
        >
          Effacer la recherche
        </button>

      </div>

    </main>

  </div>
</template>

<style scoped>

/* =====================================================
   PAGE
===================================================== */

.preachings-page {
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 24px;

  color: var(--color-text);
}


/* =====================================================
   HEADER
===================================================== */

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  padding-top: 4px;
}

.page-header h1 {
  margin: 0;

  font-size: 27px;
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -0.6px;

  color: var(--color-text);
}

.page-header p {
  margin: 6px 0 0;

  color: var(--color-text-secondary);

  font-size: 13px;
  line-height: 1.5;
}


/* =====================================================
   SEARCH
===================================================== */

.search-wrapper {
  position: relative;

  width: 100%;
}

.search-icon {
  position: absolute;

  top: 50%;
  left: 15px;

  transform: translateY(-50%);

  color: var(--color-text-muted);

  pointer-events: none;
}

.search-wrapper input {
  width: 100%;
  height: 46px;

  box-sizing: border-box;

  padding: 0 42px 0 43px;

  border: 1px solid var(--color-border);
  border-radius: 11px;

  outline: none;

  background: var(--color-surface);
  color: var(--color-text);

  font-family: inherit;
  font-size: 13px;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-wrapper input::placeholder {
  color: var(--color-text-muted);
}

.search-wrapper input:focus {
  border-color: var(--color-text-secondary);

  box-shadow:
    0 0 0 3px rgba(128, 128, 128, 0.08);
}


/* Supprime l'icône native du champ search */

.search-wrapper input::-webkit-search-cancel-button {
  display: none;
}


/* =====================================================
   CLEAR SEARCH
===================================================== */

.clear-search {
  position: absolute;

  top: 50%;
  right: 10px;

  width: 28px;
  height: 28px;

  transform: translateY(-50%);

  display: grid;
  place-items: center;

  padding: 0;

  border: 0;
  border-radius: 7px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.clear-search:hover {
  background: var(--color-border);
  color: var(--color-text);
}


/* =====================================================
   CONTENT
===================================================== */

.content {
  display: flex;
  flex-direction: column;

  gap: 14px;
}


/* =====================================================
   LIST HEADER
===================================================== */

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  min-height: 30px;
}

.list-title {
  min-width: 0;
}

.list-title h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
}

.search-result-label {
  display: block;

  margin-bottom: 2px;

  color: var(--color-text-muted);

  font-size: 10px;
  font-weight: 600;
}

.count {
  min-width: 25px;
  height: 25px;

  padding: 0 7px;

  box-sizing: border-box;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);

  font-size: 11px;
  font-weight: 700;
}


/* =====================================================
   LIST
===================================================== */

.preachings-list {
  display: flex;
  flex-direction: column;

  gap: 10px;
}


/* =====================================================
   LOADING
===================================================== */

.loading-state {
  min-height: 160px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 9px;

  color: var(--color-text-muted);

  font-size: 12px;
}

.loading-icon {
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


/* =====================================================
   EMPTY / ERROR
===================================================== */

.state {
  min-height: 190px;

  padding: 30px 20px;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  border: 1px solid var(--color-border);
  border-radius: 13px;

  background: var(--color-surface);
}

.empty-search {
  width: 42px;
  height: 42px;

  display: grid;
  place-items: center;

  margin-bottom: 12px;

  border-radius: 10px;

  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.state h3 {
  margin: 0;

  color: var(--color-text);

  font-size: 14px;
  font-weight: 700;
}

.state p {
  max-width: 320px;

  margin: 6px 0 0;

  color: var(--color-text-secondary);

  font-size: 12px;
  line-height: 1.55;
}


/* =====================================================
   BUTTON
===================================================== */

.state-button {
  min-height: 36px;

  margin-top: 16px;
  padding: 0 14px;

  border: 0;
  border-radius: 8px;

  background: var(--color-text);
  color: var(--color-surface);

  cursor: pointer;

  font-family: inherit;
  font-size: 12px;
  font-weight: 650;

  transition:
    opacity 0.2s ease,
    transform 0.15s ease;
}

.state-button:hover {
  opacity: 0.86;
}

.state-button:active {
  transform: scale(0.97);
}

.state-button.secondary {
  border: 1px solid var(--color-border);

  background: var(--color-surface);
  color: var(--color-text);
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {

  .preachings-page {
    gap: 20px;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .page-header p {
    font-size: 12px;
  }

  .search-wrapper input {
    height: 44px;

    font-size: 13px;
  }

  .list-title h2 {
    font-size: 15px;
  }

}

</style>