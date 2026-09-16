<script setup>
import { Music2, PlayCircle } from 'lucide-vue-next'
</script>

<template>
  <section class="chants-view">
    <header class="page-header">
      <div class="page-icon">
        <Music2 :size="24" :stroke-width="2" />
      </div>

      <div>
        <h1>Chants</h1>
        <p>
          Retrouvez les chants de louange et les méditations en audio ou en vidéo.
        </p>
      </div>
    </header>

    <div class="chant-categories">
      <RouterLink
        to="/chants/louange"
        class="category-item"
      >
        <Music2 :size="22" />

        <div>
          <h2>Louange</h2>
          <p>Chants et moments de louange</p>
        </div>

        <PlayCircle :size="20" />
      </RouterLink>

      <RouterLink
        to="/chants/meditation"
        class="category-item"
      >
        <Music2 :size="22" />

        <div>
          <h2>Méditation</h2>
          <p>Chants et moments de méditation</p>
        </div>

        <PlayCircle :size="20" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.chants-view {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.page-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  border-radius: 14px;

  background: var(--color-surface-secondary);
  color: var(--color-text);
}

.page-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.page-header p {
  margin: 6px 0 0;
  color: var(--color-text-muted);
  font-size: 14px;
  line-height: 1.5;
}

.chant-categories {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 18px;

  color: var(--color-text);
  background: var(--color-surface);

  border: 1px solid var(--color-border);
  border-radius: 16px;

  text-decoration: none;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.category-item:hover {
  background: var(--color-surface-hover);
  transform: translateY(-2px);
}

.category-item > div {
  flex: 1;
}

.category-item h2 {
  margin: 0;

  font-size: 16px;
  font-weight: 600;
}

.category-item p {
  margin: 4px 0 0;

  color: var(--color-text-muted);
  font-size: 13px;
}
</style>