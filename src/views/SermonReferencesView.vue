
<script setup>
import {
  ArrowLeft,
  BookOpen,
  BookText,
  CalendarDays,
  LoaderCircle,
  MessageSquareText,
} from 'lucide-vue-next'

import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getSermonReferences } from '@/functions/sermons'

const route = useRoute()

const references = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

const formatDate = (date) => {
  if (!date) return ''

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) return date

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsedDate)
}

const loadReferences = async () => {
  isLoading.value = true
  errorMessage.value = ''
  references.value = null

  try {
    const response = await getSermonReferences(route.params.id)
    references.value = response.data
  } catch (error) {
    console.error('Erreur de chargement des références :', error)
    errorMessage.value =
      error.message || 'Impossible de charger les références.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadReferences)

watch(() => route.params.id, loadReferences)
</script>

<template>
  <main class="references-view">
    <RouterLink
      :to="{
        name: 'preaching-detail',
        params: { id: route.params.id },
      }"
      class="back-link"
    >
      <ArrowLeft :size="18" />
      <span>Retour à la prédication</span>
    </RouterLink>

    <header class="page-header">
      <div class="page-icon">
        <BookOpen :size="24" />
      </div>

      <div>
        <h1>Références</h1>
      </div>
    </header>

    <div v-if="isLoading" class="state-message">
      <LoaderCircle :size="22" class="loading-icon" />
      <span>Chargement des références...</span>
    </div>

    <div v-else-if="errorMessage" class="state-message">
      <p>{{ errorMessage }}</p>
      <button type="button" class="retry-button" @click="loadReferences">
        Réessayer
      </button>
    </div>

    <template v-else-if="references">
      <section class="reference-section">
        <div class="section-heading">
          <BookOpen :size="20" />
          <h2>Références bibliques</h2>
          <span class="count">
            {{ references.bible_references?.length || 0 }}
          </span>
        </div>

        <article
          v-for="reference in references.bible_references || []"
          :key="reference.id"
          class="reference-card"
        >
          <h3>{{ reference.formatted_reference }}</h3>
          <p v-if="reference.note" class="note">
            <MessageSquareText :size="15" />
            <span>{{ reference.note }}</span>
          </p>
        </article>

        <p
          v-if="!references.bible_references?.length"
          class="empty-message"
        >
          Aucune référence biblique enregistrée.
        </p>
      </section>

      <section class="reference-section">
        <div class="section-heading">
          <BookText :size="20" />
          <h2>Références aux brochures</h2>
          <span class="count">
            {{ references.brochure_references?.length || 0 }}
          </span>
        </div>

        <article
          v-for="reference in references.brochure_references || []"
          :key="reference.id"
          class="reference-card"
        >
          <h3>{{ reference.message_title }}</h3>

          <p v-if="reference.message_date" class="reference-date">
            Date :
            {{ formatDate(reference.message_date) }}
          </p>

          <p v-if="reference.paragraphs" class="paragraphs">
            Paragraphes : {{ reference.paragraphs }}
          </p>

          <p v-if="reference.note" class="note">
            <MessageSquareText :size="15" />
            <span>{{ reference.note }}</span>
          </p>
        </article>

        <p
          v-if="!references.brochure_references?.length"
          class="empty-message"
        >
          Aucune référence à une brochure enregistrée.
        </p>
      </section>

      <p
        v-if="
          !references.bible_references?.length &&
          !references.brochure_references?.length
        "
        class="empty-message"
      >
        Aucune référence n'est disponible pour cette prédication.
      </p>
    </template>
  </main>
</template>

<style scoped>
.references-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--color-text);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  width: fit-content;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 14px;
}

.back-link:hover {
  color: var(--color-text);
}

.page-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.page-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 14px;
  background: var(--color-surface-secondary);
}

.page-header h1 {
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
}

.page-header p {
  margin: 5px 0 0;
  color: var(--color-text-muted);
  font-size: 13px;
  line-height: 1.5;
}

.reference-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 9px;
}

.section-heading h2 {
  flex: 1;
  margin: 0;
  font-size: 16px;
  font-weight: 650;
}

.count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 25px;
  height: 25px;
  padding: 0 6px;
  border-radius: 8px;
  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
  font-size: 12px;
}

.reference-card {
  padding: 15px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
}

.reference-card h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
}

.reference-date,
.paragraphs {
  margin: 8px 0 0;
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.6;
}

.reference-date,
.note {
  display: flex;
  align-items: flex-start;
  gap: 7px;
}

.reference-date svg,
.note svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.note {
  margin: 10px 0 0;
  color: var(--color-text-muted);
  font-size: 13px;
  line-height: 1.6;
}

.empty-message,
.state-message {
  color: var(--color-text-muted);
  font-size: 14px;
  line-height: 1.6;
}

.empty-message {
  margin: 0;
  padding: 15px;
  border-radius: 10px;
  background: var(--color-surface-secondary);
}

.state-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 150px;
  text-align: center;
}

.state-message p {
  margin: 0;
}

.loading-icon {
  animation: spin 0.9s linear infinite;
}

.retry-button {
  padding: 8px 14px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface-secondary);
  color: var(--color-text);
  font-weight: 600;
  cursor: pointer;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
