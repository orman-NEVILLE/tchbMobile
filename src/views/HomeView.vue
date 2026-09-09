<script setup>
import { ChevronRight } from 'lucide-vue-next'
import PreachingCard from '@/components/PreachingCard.vue'

const recentPreachings = [
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
]
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

      <div class="preachings-list">

        <PreachingCard
          v-for="preaching in recentPreachings"
          :key="preaching.id"
          :preaching="preaching"
        />

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

