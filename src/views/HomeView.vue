<script setup>
import {
  ChevronRight,
  LoaderCircle,
} from 'lucide-vue-next'

import { onMounted, ref } from 'vue'

import PreachingCard from '@/components/PreachingCard.vue'
import { getSermons } from '@/functions/sermons'

const recentPreachings = ref([])

const isLoading = ref(true)
const errorMessage = ref('')

const loadRecentPreachings = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getSermons()

    recentPreachings.value = response.data.slice(0, 2)
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

onMounted(() => {
  loadRecentPreachings()
})
</script>

<template>
  <div class="home">

    <!-- =========================
         INTRODUCTION
    ========================== -->

    <section class="hero">
      <p class="welcome">
        Bienvenue sur TCHB
      </p>

      <h1>
        Nourrissez votre foi<br />
        à travers la Parole.
      </h1>

      <p class="description">
        Retrouvez les dernières prédications et écoutez
        les enseignements de la Parole de Dieu.
      </p>
    </section>

    <!-- =========================
         PRÉDICATIONS RÉCENTES
    ========================== -->

    <section class="recent-section">

      <div class="section-header">

        <h2>
          Prédications récentes
        </h2>

        <RouterLink
          to="/predications"
          class="see-all"
        >
          <span>Voir toutes</span>

          <ChevronRight
            :size="17"
            :stroke-width="2"
          />
        </RouterLink>

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
        {{ errorMessage }}
      </div>

      <!-- =========================
           PRÉDICATIONS
      ========================== -->

      <div
        v-else-if="recentPreachings.length"
        class="preachings-list"
      >

        <PreachingCard
          v-for="preaching in recentPreachings"
          :key="preaching.id"
          :preaching="preaching"
        />

      </div>

      <!-- =========================
           AUCUNE PRÉDICATION
      ========================== -->

      <div
        v-else
        class="empty-state"
      >
        Aucune prédication disponible pour le moment.
      </div>

    </section>

  </div>
</template>

<style scoped>
/* =========================
   PAGE
========================= */

.home {
  display: flex;
  flex-direction: column;
  gap: 32px;

  color: var(--color-text);

  transition:
    color 0.25s ease;
}


/* =========================
   HERO
========================= */

.hero {
  padding-top: 8px;
}

.welcome {
  margin: 0 0 10px;

  color: var(--color-text-secondary);

  font-size: 14px;
  font-weight: 500;

  transition: color 0.25s ease;
}

.hero h1 {
  margin: 0;

  color: var(--color-text);

  font-size: 28px;
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -0.5px;

  transition: color 0.25s ease;
}

.description {
  max-width: 520px;

  margin: 14px 0 0;

  color: var(--color-text-secondary);

  font-size: 14px;
  line-height: 1.6;

  transition: color 0.25s ease;
}


/* =========================
   SECTION RÉCENTE
========================= */

.recent-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}


/* =========================
   EN-TÊTE DE SECTION
========================= */

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;
}

.section-header h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 18px;
  font-weight: 700;

  transition: color 0.25s ease;
}


/* =========================
   VOIR TOUTES
========================= */

.see-all {
  display: inline-flex;
  align-items: center;

  gap: 2px;

  color: var(--color-text-secondary);

  font-size: 13px;
  font-weight: 600;

  text-decoration: none;
  white-space: nowrap;

  transition:
    color 0.2s ease,
    opacity 0.2s ease;
}

.see-all:hover {
  color: var(--color-text);
}


/* =========================
   LISTE DES PRÉDICATIONS
========================= */

.preachings-list {
  display: flex;
  flex-direction: column;

  gap: 12px;
}


/* =========================
   CHARGEMENT
========================= */

.loading-state {
  min-height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  color: var(--color-text-muted);

  font-size: 13px;
}

.loading-icon {
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


/* =========================
   ERREUR
========================= */

.error-state {
  padding: 16px;

  border: 1px solid var(--color-border);
  border-radius: 12px;

  background: var(--color-surface-secondary);

  color: var(--color-text-secondary);

  font-size: 13px;
  line-height: 1.5;
}


/* =========================
   ÉTAT VIDE
========================= */

.empty-state {
  padding: 24px 16px;

  border: 1px solid var(--color-border);
  border-radius: 12px;

  background: var(--color-surface-secondary);

  color: var(--color-text-muted);

  font-size: 13px;
  text-align: center;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 480px) {
  .home {
    gap: 28px;
  }

  .hero {
    padding-top: 4px;
  }

  .hero h1 {
    font-size: 26px;
    line-height: 1.22;
  }

  .description {
    margin-top: 12px;

    font-size: 13px;
    line-height: 1.55;
  }

  .section-header h2 {
    font-size: 17px;
  }

  .see-all {
    font-size: 12px;
  }
}
</style>