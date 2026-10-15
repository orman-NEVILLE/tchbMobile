
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  ArrowLeft,
  BookOpen,
  BookText,
  CalendarDays,
  ChevronRight,
  LoaderCircle,
  MessageSquareText,
  Search,
  X,
} from 'lucide-vue-next'

import { getSermonReferences } from '@/functions/sermons'

const route = useRoute()

const references = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const activeTab = ref('bible')
const searchQuery = ref('')

const bibleReferences = computed(
  () => references.value?.bible_references ?? [],
)

const brochureReferences = computed(
  () => references.value?.brochure_references ?? [],
)

const currentReferences = computed(() =>
  activeTab.value === 'bible'
    ? bibleReferences.value
    : brochureReferences.value,
)

const filteredReferences = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('fr')

  if (!query) return currentReferences.value

  return currentReferences.value.filter((reference) => {
    const searchableText =
      activeTab.value === 'bible'
        ? [
            reference.formatted_reference,
            reference.book,
            reference.chapter,
            reference.verse_start,
            reference.verse_end,
            reference.note,
          ]
        : [
            reference.message_title,
            reference.message_date,
            reference.paragraphs,
            reference.note,
          ]

    return searchableText
      .filter((value) => value !== null && value !== undefined)
      .join(' ')
      .toLocaleLowerCase('fr')
      .includes(query)
  })
})

const formatDate = (date) => {
  if (!date) return ''

  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(date)
  const parsedDate = new Date(
    isDateOnly ? `${date}T12:00:00Z` : date,
  )

  if (Number.isNaN(parsedDate.getTime())) return date

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsedDate)
}

const selectTab = (tab) => {
  activeTab.value = tab
  searchQuery.value = ''
}

const loadReferences = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getSermonReferences(route.params.id)
    references.value = response.data
  } catch (error) {
    console.error('Erreur de chargement des références :', error)
    references.value = null
    errorMessage.value =
      error.message || 'Impossible de charger les références.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadReferences)

watch(() => route.params.id, () => {
  activeTab.value = 'bible'
  searchQuery.value = ''
  loadReferences()
})
</script>

<template>
  <main class="references-view">
    <!-- Navigation -->
    <RouterLink
      :to="{
        name: 'preaching-detail',
        params: { id: route.params.id },
      }"
      class="back-link"
    >
      <ArrowLeft :size="17" />
      <span>Retour à la prédication</span>
    </RouterLink>

    <!-- En-tête -->
    <header class="page-header">
      <div class="page-heading">

        <h1>Références</h1>
        <p class="sermon-title">
        Prédication : 
          {{ references?.sermon?.title || 'Références de la prédication' }}
        </p>

      </div>

    </header>

    <!-- Chargement -->
    <section
      v-if="isLoading"
      class="status-panel"
      role="status"
      aria-live="polite"
    >
      <LoaderCircle :size="24" class="loading-icon" />
      <p>Chargement des références...</p>
    </section>

    <!-- Erreur -->
    <section v-else-if="errorMessage" class="status-panel" role="alert">
      <p>{{ errorMessage }}</p>
      <button type="button" class="retry-button" @click="loadReferences">
        Réessayer
      </button>
    </section>

    <template v-else-if="references">
      <!-- Onglets -->
      <div class="tabs" role="tablist" aria-label="Types de références">
        <button
          id="tab-bible"
          type="button"
          role="tab"
          :aria-selected="activeTab === 'bible'"
          aria-controls="panel-references"
          :tabindex="activeTab === 'bible' ? 0 : -1"
          class="tab"
          :class="{ 'tab-active': activeTab === 'bible' }"
          @click="selectTab('bible')"
        >
          <BookOpen :size="18" />
          <span>Bible</span>
          <span class="tab-count">{{ bibleReferences.length }}</span>
        </button>

        <button
          id="tab-brochures"
          type="button"
          role="tab"
          :aria-selected="activeTab === 'brochures'"
          aria-controls="panel-references"
          :tabindex="activeTab === 'brochures' ? 0 : -1"
          class="tab"
          :class="{ 'tab-active': activeTab === 'brochures' }"
          @click="selectTab('brochures')"
        >
          <BookText :size="18" />
          <span>Brochures</span>
          <span class="tab-count">{{ brochureReferences.length }}</span>
        </button>
      </div>

      <!-- Contenu de l'onglet -->
      <section
        id="panel-references"
        class="references-panel"
        role="tabpanel"
        :aria-labelledby="activeTab === 'bible' ? 'tab-bible' : 'tab-brochures'"
      >

        <!-- Recherche -->
        <div class="search-field">
          <Search :size="18" aria-hidden="true" />

          <input
            v-model="searchQuery"
            type="search"
            :placeholder="
              activeTab === 'bible'
                ? 'Rechercher un passage...'
                : 'Rechercher un message...'
            "
            :aria-label="
              activeTab === 'bible'
                ? 'Rechercher une référence biblique'
                : 'Rechercher une brochure'
            "
          />

          <button
            v-if="searchQuery"
            type="button"
            class="clear-search"
            aria-label="Effacer la recherche"
            @click="searchQuery = ''"
          >
            <X :size="17" />
          </button>
        </div>

        <!-- Liste biblique -->
        <div v-if="filteredReferences.length" class="reference-list">
          <template v-if="activeTab === 'bible'">
            <article
              v-for="reference in filteredReferences"
              :key="reference.id"
              class="reference-item"
            >
              <div class="item-icon">
                <BookOpen :size="19" />
              </div>

              <div class="item-content">
                <h3>{{ reference.formatted_reference }}</h3>
                <p v-if="reference.note" class="item-note">
                  <MessageSquareText :size="14" />
                  <span>{{ reference.note }}</span>
                </p>
              </div>
            </article>
          </template>

          <!-- Liste des brochures -->
          <template v-else>
            <article
              v-for="reference in filteredReferences"
              :key="reference.id"
              class="reference-item brochure-item"
            >
              <div class="item-icon">
                <BookText :size="19" />
              </div>

              <div class="item-content">
                <h3>{{ reference.message_title }}</h3>

                <p v-if="reference.message_date" class="item-meta">
                  Date : 
                  <span>{{ formatDate(reference.message_date) }}</span>
                </p>

                <div v-if="reference.paragraphs" class="paragraphs">
                  <span class="paragraph-label">Paragraphes</span>
                  <span>{{ reference.paragraphs }}</span>
                </div>

                <p v-if="reference.note" class="item-note">
                  <MessageSquareText :size="14" />
                  <span>{{ reference.note }}</span>
                </p>
              </div>
            </article>
          </template>
        </div>

        <!-- Liste vide ou recherche sans résultat -->
        <div v-else class="empty-state">
          <div class="empty-icon">
            <Search v-if="searchQuery" :size="22" />
            <BookOpen v-else-if="activeTab === 'bible'" :size="22" />
            <BookText v-else :size="22" />
          </div>

          <h3>
            {{
              searchQuery
                ? 'Aucun résultat'
                : activeTab === 'bible'
                  ? 'Aucune référence biblique'
                  : 'Aucune référence aux brochures'
            }}
          </h3>

          <p>
            {{
              searchQuery
                ? 'Essaie un autre mot ou une autre référence.'
                : 'Aucune référence n’a encore été enregistrée dans cette catégorie.'
            }}
          </p>

          <button
            v-if="searchQuery"
            type="button"
            class="clear-button"
            @click="searchQuery = ''"
          >
            Effacer la recherche
          </button>
        </div>
      </section>

    </template>
  </main>
</template>

<style scoped>
.references-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 760px;
  margin-inline: auto;
  padding-bottom: 28px;
  color: var(--color-text);
}

/* Navigation */

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-text);
}

.back-link:focus-visible,
.tab:focus-visible,
.clear-search:focus-visible,
.retry-button:focus-visible,
.clear-button:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 3px;
}

/* En-tête */

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.page-heading {
  min-width: 0;
}

.eyebrow {
  margin: 0 0 7px;
  color: var(--color-text-muted);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.1px;
}

.page-header h1 {
  margin: 0;
  font-size: clamp(26px, 4vw, 31px);
  font-weight: 750;
  letter-spacing: -0.7px;
  line-height: 1.25;
}

.sermon-title {
  margin: 8px 0 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border: 1px solid var(--color-border);
  border-radius: 13px;
  background: var(--color-surface-secondary);
}

/* Onglets */

.tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 5px;
  padding: 5px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface-secondary);
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-width: 0;
  min-height: 46px;
  padding: 9px 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-secondary);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.tab-active {
  border-color: var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
}

.tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 23px;
  height: 23px;
  padding-inline: 5px;
  border-radius: 6px;
  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}

.tab-active .tab-count {
  background: var(--color-text);
  color: var(--color-background);
}

/* Contenu */

.references-panel {
  display: flex;
  flex-direction: column;
  gap: 17px;
  min-width: 0;
}

.list-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-heading h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.list-heading p {
  margin: 5px 0 0;
  color: var(--color-text-muted);
  font-size: 12px;
}

/* Recherche */

.search-field {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 46px;
  padding: 0 13px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  transition: border-color 0.2s ease;
}

.search-field:focus-within {
  border-color: var(--color-text-secondary);
}

.search-field input {
  width: 100%;
  min-width: 0;
  height: 44px;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 13px;
}

.search-field input::placeholder {
  color: var(--color-text-muted);
}

.search-field input::-webkit-search-cancel-button {
  display: none;
}

.clear-search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.clear-search:hover {
  background: var(--color-surface-secondary);
}

/* Liste des références */

.reference-list {
  overflow: hidden;
  border-top: 1px solid var(--color-border);
}

.reference-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
  padding: 18px 8px;
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s ease;
}

.reference-item:hover {
  background: var(--color-surface-secondary);
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.item-content {
  flex: 1;
  min-width: 0;
  padding-top: 1px;
}

.item-content h3 {
  margin: 0;
  overflow-wrap: anywhere;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
}

.item-note {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  margin: 6px 0 0;
  color: var(--color-text-secondary);
  font-size: 12px;
  line-height: 1.7;
}

.item-note svg {
  flex-shrink: 0;
  margin-top: 3px;
  color: var(--color-text-muted);
}

.item-note span {
  min-width: 0;
  overflow-wrap: anywhere;
}

/* Détails des brochures */

.brochure-item {
  padding-block: 20px;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 7px 0 0;
  color: var(--color-text-muted);
  font-size: 12px;
  line-height: 1.6;
}

.item-meta svg {
  flex-shrink: 0;
}

.paragraphs {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--color-surface-secondary);
  font-size: 12px;
  line-height: 1.6;
}

.paragraph-label {
  color: var(--color-text-muted);
}

/* État vide */

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 38px 20px;
  border: 1px dashed var(--color-border);
  border-radius: 12px;
  text-align: center;
}

.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  margin-bottom: 3px;
  border-radius: 12px;
  background: var(--color-surface-secondary);
  color: var(--color-text-secondary);
}

.empty-state h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}

.empty-state p {
  max-width: 350px;
  margin: 0;
  color: var(--color-text-muted);
  font-size: 12px;
  line-height: 1.7;
}

.clear-button,
.retry-button {
  min-height: 38px;
  padding: 8px 13px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.clear-button:hover,
.retry-button:hover {
  background: var(--color-surface-hover);
}

/* Chargement et erreur */

.status-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 190px;
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface);
  text-align: center;
}

.status-panel p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.7;
  overflow-wrap: anywhere;
}

.loading-icon {
  animation: spin 1s linear infinite;
  color: var(--color-text-secondary);
}

/* Pied de page */

.page-footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 11px;
  line-height: 1.6;
}

.footer-separator {
  color: var(--color-border);
}

/* Mobile */

@media (max-width: 480px) {
  .references-view {
    gap: 20px;
  }

  .page-header h1 {
    font-size: 27px;
  }

  .sermon-title {
    font-size: 13px;
  }

  .tab {
    gap: 7px;
    min-height: 44px;
    padding-inline: 7px;
    font-size: 12px;
  }

  .reference-item {
    gap: 11px;
    padding-inline: 2px;
  }

  .item-icon {
    width: 38px;
    height: 38px;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
