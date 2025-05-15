<template>
  <div class="vinted-card">
    <div class="image-container">
      <img :src="foto" :alt="nom" v-if="foto" />
      <button class="fav-button" @click="$emit('toggle-fav')">
        <span :class="{ active: isFavorited }">♥</span>
      </button>
    </div>

    <div class="info">
      <h3 class="title">{{ nom }}</h3>
      <p class="price">{{ preu }}€/mes</p>
      <p class="duration">{{ mesos }} mesos disponibles</p>
      <button class="view-more" @click="$emit('view-more')">Veure més</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    user: { type: String, required: true },
    nom: { type: String, required: true },
    preu: { type: Number, required: true },
    mesos: { type: Number, required: true },
    foto: { type: String, default: "" },
    mimeType: { type: String, default: "image/jpeg" },
  },
};
</script>

<style scoped>
.vinted-card {
  width: 100%;
  max-width: 300px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.vinted-card:hover {
  transform: translateY(-4px);
}

.image-container {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fav-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 6px 10px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.fav-button .active {
  color: red;
}

.fav-button span {
  font-size: 18px;
  color: #aaa;
  transition: color 0.2s;
}

.info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #21339A;
}

.price {
  font-size: 1rem;
  color: #444;
}

.duration {
  font-size: 0.9rem;
  color: #777;
}
</style>
