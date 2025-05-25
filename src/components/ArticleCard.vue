<template>
  <div class="vinted-card">
    <div class="image-container position-relative">
      <img :src="foto" :alt="nom" v-if="foto" />
      <!-- Botón de Favorito dentro de la imagen -->
      <button class="fav-button-heart" @click.stop="toggleFav">
        <span v-if="is_favorite" data-feather="heart" class="color-red"></span>
        <span v-else data-feather="heart"></span>
      </button>
    </div>

    <div class="info text-start">
      <div class="header">
        <!-- Título en una columna -->
        <h3 class="title">{{ nom }}</h3>
      </div>
      <p class="price mb-0">{{ preu }}€/mes</p>
      <p class="duration mb-0">{{ mesos }} mesos disponibles</p>
      <!-- Estado -->
      <span class="badge bg-success" v-if="estat === 'disponible'">Disponible</span>
      <span class="badge bg-warning" v-if="estat === 'en_lloguer'">En lloguer</span>
      <span class="badge bg-danger" v-if="estat === 'inactiu'">Inactiu</span>
      <span class="badge bg-info" v-if="estat === 'pendent'">Pendent</span>
      <p><a class="username-link" @click="irPerfil">@{{ username }}</a></p>

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
    irPerfil() {
      this.$router.push(`/verPerfil/${this.username}`);
    }
  },
};
</script>

<style scoped>
:host, .vinted-card, .vinted-card * {
  font-size: 0.93rem !important;
  font-family: inherit !important;
  line-height: 1.3 !important;
}

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

.fav-button-heart {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.85);
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #aaa;
  cursor: pointer;
  border-radius: 50%;
  z-index: 2;
  transition: color 0.2s, background 0.2s;
}

.fav-button-heart:hover {
  color: red;
  background: #fff;
}

.color-red {
  color: red;
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

.price {
  font-size: 1rem;
  color: #444;
}

.duration {
  font-size: 0.9rem;
  color: #777;
}

.username-link {
  text-decoration: none;
  color: #578FCA;
  font-style: italic;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;
}

.username-link:hover {
  text-decoration: underline;
}
</style>
