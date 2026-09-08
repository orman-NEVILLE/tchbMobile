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

    <!-- Introduction -->
    <section class="hero">
      <p class="welcome">Bienvenue sur TCHB</p>

      <h1>
        Nourrissez votre foi<br />
        à travers la Parole.
      </h1>

      <p class="description">
        Retrouvez les dernières prédications et écoutez
        les enseignements de la Parole de Dieu.
      </p>
    </section>

    <!-- Prédications récentes -->
    <section class="recent-section">

      <div class="section-header">
        <h2>Prédications récentes</h2>

        <RouterLink to="/predications" class="see-all">
          <span>Voir toutes</span>
          <ChevronRight :size="17" />
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
.home {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* =========================
   HERO
========================= */

.hero {
  padding-top: 8px;
}

.welcome {
  margin: 0 0 10px;

  color: #6b7280;

  font-size: 14px;
  font-weight: 500;
}

.hero h1 {
  margin: 0;

  color: #111827;

  font-size: 28px;
  font-weight: 750;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.description {
  max-width: 520px;

  margin: 14px 0 0;

  color: #6b7280;

  font-size: 14px;
  line-height: 1.6;
}

/* =========================
   SECTION
========================= */

.recent-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.section-header h2 {
  margin: 0;

  color: #111827;

  font-size: 18px;
  font-weight: 700;
}

.see-all {
  display: inline-flex;
  align-items: center;
  gap: 2px;

  color: #374151;

  font-size: 13px;
  font-weight: 600;

  text-decoration: none;

  white-space: nowrap;
}

.see-all:hover {
  color: #000000;
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
   MOBILE
========================= */

@media (max-width: 480px) {
  .hero h1 {
    font-size: 26px;
  }

  .description {
    font-size: 13px;
  }

  .section-header h2 {
    font-size: 17px;
  }
}
</style>