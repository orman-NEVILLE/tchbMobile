<script setup>
import { Search, Mic2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import PreachingCard from '@/components/PreachingCard.vue'

const search = ref('')

const preachings = [
  {
    id: 1,
    title: 'La foi qui transforme',
    preacher: 'Pasteur Jean',
    date: '07 Septembre 2026',
    duration: '32:15',
  },
  {
    id: 2,
    title: 'Le chemin de la foi',
    preacher: 'Pasteur David',
    date: '05 Septembre 2026',
    duration: '41:20',
  },
  {
    id: 3,
    title: 'Marcher dans la lumière',
    preacher: 'Pasteur Jean',
    date: '01 Septembre 2026',
    duration: '36:42',
  },
  {
    id: 4,
    title: 'Une foi persévérante',
    preacher: 'Pasteur David',
    date: '28 Août 2026',
    duration: '29:18',
  },
  {
    id: 5,
    title: 'La puissance de la Parole',
    preacher: 'Pasteur Michel',
    date: '24 Août 2026',
    duration: '44:07',
  },
]

const filteredPreachings = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) {
    return preachings
  }

  return preachings.filter((preaching) =>
    preaching.title.toLowerCase().includes(query) ||
    preaching.preacher.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="preachings-page">

    <!-- En-tête -->
    <section class="page-header">

      <div class="page-icon">
        <Mic2 :size="22" :stroke-width="2" />
      </div>

      <div>
        <h1>Prédications</h1>

        <p>
          Découvrez nos enseignements et grandissez dans la foi.
        </p>
      </div>

    </section>

    <!-- Recherche -->
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

    <!-- Résultats -->
    <section class="results-section">

      <div class="results-header">
        <h2>
          {{ search ? 'Résultats' : 'Toutes les prédications' }}
        </h2>

        <span>
          {{ filteredPreachings.length }}
        </span>
      </div>

      <!-- Liste -->
      <div
        v-if="filteredPreachings.length"
        class="preachings-list"
      >
        <PreachingCard
          v-for="preaching in filteredPreachings"
          :key="preaching.id"
          :preaching="preaching"
        />
      </div>

      <!-- Aucun résultat -->
      <div
        v-else
        class="empty-state"
      >
        <div class="empty-icon">
          <Search :size="24" />
        </div>

        <h3>Aucune prédication trouvée</h3>

        <p>
          Essayez avec un autre titre ou nom de prédicateur.
        </p>
      </div>

    </section>

  </div>
</template>

<style scoped>
.preachings-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

  background: #111827;
  color: #ffffff;
}

.page-header h1 {
  margin: 0;

  color: #111827;

  font-size: 24px;
  font-weight: 750;
  letter-spacing: -0.3px;
}

.page-header p {
  margin: 4px 0 0;

  color: #6b7280;

  font-size: 13px;
  line-height: 1.5;
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

  color: #9ca3af;

  pointer-events: none;
}

.search-box input {
  width: 100%;
  height: 48px;

  box-sizing: border-box;

  padding: 0 16px 0 45px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  outline: none;

  background: #ffffff;

  color: #111827;

  font-family: inherit;
  font-size: 14px;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-box input::placeholder {
  color: #9ca3af;
}

.search-box input:focus {
  border-color: #9ca3af;

  box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.06);
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
}

.results-header h2 {
  margin: 0;

  color: #111827;

  font-size: 17px;
  font-weight: 700;
}

.results-header span {
  min-width: 24px;
  height: 24px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0 7px;

  box-sizing: border-box;

  border-radius: 20px;

  background: #eef0f3;

  color: #6b7280;

  font-size: 12px;
  font-weight: 600;
}

.preachings-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* =========================
   EMPTY STATE
========================= */

.empty-state {
  padding: 40px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  background: #ffffff;

  border: 1px solid #e9ecef;
  border-radius: 14px;
}

.empty-icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 14px;

  border-radius: 50%;

  background: #f1f3f5;
  color: #6b7280;
}

.empty-state h3 {
  margin: 0;

  color: #111827;

  font-size: 15px;
  font-weight: 650;
}

.empty-state p {
  max-width: 280px;

  margin: 6px 0 0;

  color: #9ca3af;

  font-size: 13px;
  line-height: 1.5;
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
}
</style>