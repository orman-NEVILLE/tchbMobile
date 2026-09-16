<script setup>
import {
  ArrowLeft,
  Music2,
} from 'lucide-vue-next'

import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import ChantCard from '@/components/ChantCard.vue'

const route = useRoute()

const category = computed(() => {
  return route.params.category === 'meditation'
    ? 'Méditation'
    : 'Louange'
})

const chants = computed(() => {
  if (route.params.category === 'meditation') {
    return [
      {
        id: 1,
        title: 'Dans ta présence',
        description: 'Un moment de méditation dans la présence de Dieu.',
        author: 'Équipe TCHB',
      },
      {
        id: 2,
        title: 'Près de toi',
        description: 'Un chant pour accompagner la méditation.',
        author: 'Groupe de méditation',
      },
      {
        id: 3,
        title: 'Ta Parole',
        description: 'Méditation autour de la Parole de Dieu.',
        author: 'Équipe TCHB',
      },
    ]
  }

  return [
    {
      id: 1,
      title: 'Dieu est fidèle',
      description: 'Un chant de louange pour célébrer la fidélité de Dieu.',
      author: 'Équipe de louange',
    },
    {
      id: 2,
      title: 'Nous t’adorons',
      description: 'Un moment de louange et d’adoration.',
      author: 'Groupe de louange TCHB',
    },
    {
      id: 3,
      title: 'Élevons son nom',
      description: 'Un chant pour célébrer et glorifier Dieu.',
      author: 'Équipe de louange',
    },
  ]
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
          {{ chants.length }}
          contenu{{ chants.length > 1 ? 's' : '' }}
        </p>
      </div>
    </header>

    <div class="chants-list">
      <ChantCard
        v-for="chant in chants"
        :key="chant.id"
        :chant="chant"
        :category="route.params.category"
      />
    </div>

  </section>
</template>

<style scoped>
.category-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
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