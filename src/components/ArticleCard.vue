<template>
  <div class="vinted-card">
    <div class="image-container">
      <img :src="foto" :alt="nom" v-if="foto" />
    </div>

    <div class="info text-start">
      <div class="header">
        <!-- Título en una columna -->
        <h3 class="title">{{ nom }}</h3>

        <!-- Botón de Favorito en la segunda columna -->
        <button class="fav-button" @click="toggleFav">
          <span v-if="isFavoriteLocal" data-feather="heart" class="color-red"></span>
          <span v-else data-feather="heart"></span>
        </button>
      </div>
      <p class="price mb-0">{{ preu }}€/mes</p>
      <p class="duration mb-0">{{ mesos }} mesos disponibles</p>
      <!-- Estado -->
      <span class="badge bg-success" v-if="estat === 'disponible'">Disponible</span>
      <span class="badge bg-warning" v-if="estat === 'en_lloguer'">En lloguer</span>
      <span class="badge bg-danger" v-if="estat === 'inactiu'">Inactiu</span>
      <span class="badge bg-info" v-if="estat === 'pendent'">Pendent</span>
      <p><a>@{{ username }}</a></p>
      <Button icon="arrow-up-right" color="blue" variant="outline" @click="this.$emit('verMas', this.id_article);">Veure
        més</Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import feather from "feather-icons";

export default {
  components: {
    Button,
  },
  watch: {
    is_favorite(newValue) {
      console.log('Nuevo valor de is_favorite:', newValue);
      feather.replace(); // Solo actualiza el ícono cuando el estado cambie
    }
  },

  name: 'ArticleCard',
  props: {
    id_article: { type: Number, required: true },
    nom: { type: String, required: true },
    foto: { type: String, required: true },
    preu: { type: Number, required: true },
    mesos: { type: Number, required: true },
    username: { type: String, required: true },
    userID: { type: Number, required: true },
    mimeType: { type: String, required: true },
    estat: { type: String, required: true },
    is_favorite: { type: [Number, Boolean], default: false },
  },
  data() {
    return {
      isFavoriteLocal: this.is_favorite,
    }
  },
  emits: ['toggleFav', 'verMas'],
  mounted() {
    feather.replace(); // Renderiza íconos después del montaje
  },
  updated() {
    feather.replace(); // Por si cambia dinámicamente el DOM
  },
  methods: {
    toggleFav() {
      // Emitir el evento con los datos necesario
      this.$emit('toggleFav', this.id_article);
    },
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

.info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #578FCA;
}

.fav-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
}

.fav-button:hover {
  color: red;
}

.color-red {
  color: red;
}

.price {
  font-size: 1rem;
  color: #444;
}

.duration {
  font-size: 0.9rem;
  color: #777;
}

a {
  text-decoration: none;
  color: #578FCA;
  font-style: italic;
}
</style>
