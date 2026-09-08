<template>
  <RouterLink
    :to="`/predications/${preaching.id}`"
    class="preaching-card"
  >

    <!-- Zone de lecture -->
    <div class="thumbnail">
      <button
        class="play-button"
        aria-label="Lire la prédication"
      >
        <Play
          :size="20"
          :stroke-width="2.5"
          fill="currentColor"
        />
      </button>
    </div>

    <!-- Informations -->
    <div class="content">

      <h3 class="title">
        {{ preaching.title }}
      </h3>

      <p class="preacher">
        {{ preaching.preacher }}
      </p>

      <div class="metadata">

        <span>
          {{ preaching.date }}
        </span>

        <span class="separator">•</span>

        <span class="duration">
          <Clock :size="14" />
          {{ preaching.duration }}
        </span>

      </div>

    </div>

  </RouterLink>
</template>
<style scoped >
.preaching-card {
  display: flex;
  gap: 14px;

  width: 100%;
  box-sizing: border-box;

  padding: 12px;

  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 14px;

  text-decoration: none;
  color: inherit;
  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
</style>