<template>
  <div class="container my-5">
    <!-- Datos del usuario -->
    <div class="text-center mb-4">
      <img
        v-if="usuari.foto_perfil"
        :src="usuari.foto_perfil"
        alt="Foto de perfil"
        class="rounded-circle mb-3"
        style="width: 100px; height: 100px; object-fit: cover"
      />
      <h2>Perfil de {{ usuari.username }}</h2>
    </div>

    <!-- Valoraciones -->
    <div>
      <h4 class="mb-3">Valoracions</h4>
      <div v-if="valoracions.length === 0" class="text-center">
        Aquest usuari encara no té valoracions.
      </div>

      <div v-else>
        <div v-for="(val, index) in valoracions" :key="index" class="card my-3 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Puntuació: {{ val.puntuacio }}/5</h5>
            <p class="card-text">{{ val.comentari || "Sense comentari" }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Artículos publicados -->
    <div class="mt-5">
      <h4 class="mb-3">Articles publicats</h4>
      <div v-if="articles.length === 0" class="text-center">
        Aquest usuari encara no ha publicat cap article.
      </div>

      <div v-else class="row">
        <div
          v-for="article in articles"
          :key="article.id_article"
          class="col-12 col-md-6 col-lg-4 mb-4"
        >
          <div class="card h-100 shadow-sm">
            <img
              :src="article.foto_article"
              class="card-img-top"
              alt="Foto article"
              style="height: 200px; object-fit: cover"
            />
            <div class="card-body">
              <h5 class="card-title">{{ article.nom }}</h5>
              <p class="card-text">Preu: {{ article.preu }}€</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón para valorar -->
    <div class="text-center mt-5">
      <router-link :to="`/valoracio/${userId}`" class="btn btn-primary">
        Fer una valoració
      </router-link>
    </div>
  </div>
</template>

<script>
import axiosConn from "@/axios/axios";

export default {
  name: "UsuariPerfil",
  data() {
    return {
      usuari: {}, // datos básicos del usuario
      valoracions: [],
      articles: [],
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.getUsuariInfo();
    this.getValoracions();
  },
  methods: {
    async getUsuariInfo() {
      try {
        const response = await axiosConn.get(`/infoUsuario/${this.userId}`);
        this.usuari = response.data.usuari;
        this.articles = response.data.articles;
      } catch (error) {
        console.error("Error al carregar dades de l'usuari:", error);
      }
    },
    async getValoracions() {
      try {
        const response = await axiosConn.get(`/valoracionsClient/${this.userId}`);
        this.valoracions = response.data;
      } catch (error) {
        console.error("Error al carregar les valoracions:", error);
      }
    },
  },
};
</script>

