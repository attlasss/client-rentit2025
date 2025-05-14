<template>
  <article class="article-card">
    <img :src="image" :alt="title" class="article-image" v-if="image" />
    <div class="article-content">
      <h2 class="article-title">{{ title }}</h2>
      <p class="article-text">{{ text }}</p>
      <slot /> <!-- por si quieres meter botones, links o algo más -->
    </div>
  </article>
</template>

<script>
export default {
  name: "Article",
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.article-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.2s ease;
  max-width: 600px;
  margin: auto;
}

.article-card:hover {
  transform: translateY(-4px);
}

.article-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.article-content {
  padding: 1.5rem;
}

.article-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #21339A;
}

.article-text {
  font-size: 1rem;
  color: #333;
}
</style>
