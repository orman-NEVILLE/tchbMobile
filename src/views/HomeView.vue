<script setup>
import {
  BookOpen,
  ChevronRight,
  LoaderCircle,
  RefreshCw,
} from 'lucide-vue-next'

import { computed, onMounted, ref } from 'vue'

import PreachingCard from '@/components/PreachingCard.vue'
import { getSermons } from '@/functions/sermons'

const recentPreachings = ref([])

const isLoading = ref(true)
const errorMessage = ref('')

const bibleVerses = [
  {
    text: 'Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.',
    reference: 'Psaume 119:105',
  },
  {
    text: 'Je puis tout par celui qui me fortifie.',
    reference: 'Philippiens 4:13',
  },
  {
    text: 'L’Éternel est ma lumière et mon salut : de qui aurais-je crainte ?',
    reference: 'Psaume 27:1',
  },
  {
    text: 'Confie-toi en l’Éternel de tout ton cœur, et ne t’appuie pas sur ta sagesse.',
    reference: 'Proverbes 3:5',
  },
  {
    text: 'Tout ce que vous faites, faites-le de bon cœur, comme pour le Seigneur.',
    reference: 'Colossiens 3:23',
  },
  {
    text: 'Demeurez en moi, et je demeurerai en vous.',
    reference: 'Jean 15:4',
  },
  {
    text: 'Fortifie-toi et prends courage. Ne crains point et ne t’effraie point.',
    reference: 'Josué 1:9',
  },
  {
    text: 'L’Éternel est mon berger : je ne manquerai de rien.',
    reference: 'Psaume 23:1',
  },
  {
    text: 'Recommande ton sort à l’Éternel, mets en lui ta confiance, et il agira.',
    reference: 'Psaume 37:5',
  },
  {
    text: 'Cherchez premièrement le royaume et la justice de Dieu.',
    reference: 'Matthieu 6:33',
  },
]

const currentVerse = ref(null)

const selectRandomVerse = () => {
  const index = Math.floor(
    Math.random() * bibleVerses.length
  )

  currentVerse.value = bibleVerses[index]
}

const loadRecentPreachings = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getSermons()

    recentPreachings.value =
      response.data?.slice(0, 2) || []
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

const hasPreachings = computed(() => {
  return recentPreachings.value.length > 0
})

onMounted(() => {
  selectRandomVerse()
  loadRecentPreachings()
})
</script>

<template>
  <div class="home">

    <!-- =========================
         VERSET DU JOUR
    ========================== -->

    <section class="verse-section">
      <div class="verse-header">
        <div class="verse-icon">
          <BookOpen :size="18" :stroke-width="1.8" />
        </div>

        <span>Parole du jour</span>
      </div>

      <div
        v-if="currentVerse"
        class="verse-content"
      >
        <p class="verse-text">
          « {{ currentVerse.text }} »
        </p>

        <p class="verse-reference">
          {{ currentVerse.reference }}
        </p>
      </div>

      <button
        type="button"
        class="new-verse-button"
        aria-label="Afficher un autre verset"
        @click="selectRandomVerse"
      >
        <RefreshCw :size="15" />
        <span>Autre verset</span>
      </button>
    </section>


    <!-- =========================
         PRÉDICATIONS RÉCENTES
    ========================== -->

    <section class="recent-section">

      <div class="section-header">

        <div>
          <p class="section-label">
            Dernières publications
          </p>

          <h2>
            Prédications récentes
          </h2>
        </div>

        <RouterLink
          to="/predications"
          class="see-all"
        >
          <span>Tout voir</span>

          <ChevronRight
            :size="16"
            :stroke-width="2"
          />
        </RouterLink>

      </div>


      <!-- CHARGEMENT -->

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


      <!-- ERREUR -->

      <div
        v-else-if="errorMessage"
        class="message-state"
      >
        <strong>
          Impossible de charger les prédications
        </strong>

        <span>
          {{ errorMessage }}
        </span>

        <button
          type="button"
          class="retry-button"
          @click="loadRecentPreachings"
        >
          Réessayer
        </button>
      </div>


      <!-- PRÉDICATIONS -->

      <div
        v-else-if="hasPreachings"
        class="preachings-list"
      >
        <PreachingCard
          v-for="preaching in recentPreachings"
          :key="preaching.id"
          :preaching="preaching"
        />
      </div>


      <!-- AUCUNE PRÉDICATION -->

      <div
        v-else
        class="empty-state"
      >
        <BookOpen
          :size="22"
          :stroke-width="1.7"
        />

        <strong>
          Aucune prédication disponible
        </strong>

        <span>
          Les nouvelles prédications apparaîtront ici.
        </span>
      </div>

    </section>

  </div>
</template>

<style scoped>

.home {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 32px;

  color: var(--color-text);
}


/* =========================
   VERSET
========================= */

.verse-section {
  position: relative;

  padding: 24px 22px;

  border: 1px solid var(--color-border);
  border-radius: 16px;

  background: var(--color-surface);
}

.verse-header {
  display: flex;
  align-items: center;
  gap: 9px;

  color: var(--color-text-secondary);

  font-size: 12px;
  font-weight: 700;
}

.verse-icon {
  width: 32px;
  height: 32px;

  display: grid;
  place-items: center;

  border-radius: 9px;

  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.verse-content {
  padding: 22px 4px 8px;
}

.verse-text {
  max-width: 620px;

  margin: 0;

  color: var(--color-text);

  font-size: 20px;
  font-weight: 500;
  line-height: 1.55;
  letter-spacing: -0.2px;
}

.verse-reference {
  margin: 13px 0 0;

  color: var(--color-text-secondary);

  font-size: 12px;
  font-weight: 700;
}

.new-verse-button {
  margin-top: 14px;
  padding: 0;

  display: inline-flex;
  align-items: center;
  gap: 6px;

  border: 0;

  background: transparent;
  color: var(--color-text-secondary);

  cursor: pointer;

  font-family: inherit;
  font-size: 11px;
  font-weight: 650;

  transition: color 0.2s ease;
}

.new-verse-button:hover {
  color: var(--color-text);
}


/* =========================
   PRÉDICATIONS
========================= */

.recent-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 16px;
}

.section-label {
  margin: 0 0 4px;

  color: var(--color-text-muted);

  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: uppercase;
}

.section-header h2 {
  margin: 0;

  color: var(--color-text);

  font-size: 19px;
  font-weight: 750;
  letter-spacing: -0.25px;
}

.see-all {
  display: inline-flex;
  align-items: center;
  gap: 2px;

  color: var(--color-text-secondary);

  text-decoration: none;
  white-space: nowrap;

  font-size: 12px;
  font-weight: 650;

  transition: color 0.2s ease;
}

.see-all:hover {
  color: var(--color-text);
}

.preachings-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}


/* =========================
   CHARGEMENT
========================= */

.loading-state {
  min-height: 110px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  color: var(--color-text-secondary);

  font-size: 12px;
}

.loading-icon {
  animation: spin 0.9s linear infinite;
}


/* =========================
   ERREUR / VIDE
========================= */

.message-state,
.empty-state {
  padding: 28px 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;

  border: 1px solid var(--color-border);
  border-radius: 14px;

  background: var(--color-surface-secondary);

  text-align: center;
}

.message-state strong,
.empty-state strong {
  font-size: 13px;
}

.message-state span,
.empty-state span {
  color: var(--color-text-secondary);

  font-size: 11px;
  line-height: 1.5;
}

.empty-state {
  color: var(--color-text-secondary);
}

.retry-button {
  margin-top: 8px;
  padding: 8px 13px;

  border: 1px solid var(--color-border);
  border-radius: 8px;

  background: var(--color-surface);
  color: var(--color-text);

  cursor: pointer;

  font-family: inherit;
  font-size: 11px;
  font-weight: 650;
}


/* =========================
   ANIMATION
========================= */

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

  .home {
    gap: 26px;
  }

  .verse-section {
    padding: 20px 18px;
    border-radius: 14px;
  }

  .verse-content {
    padding-top: 18px;
  }

  .verse-text {
    font-size: 18px;
    line-height: 1.5;
  }

  .section-header {
    align-items: center;
  }

  .section-header h2 {
    font-size: 17px;
  }

  .section-label {
    font-size: 9px;
  }

}

</style>