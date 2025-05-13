<!-- src/views/UsuariPerfil.vue -->
<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Perfil de l'usuari</h2>

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
      valoracions: [],
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.getValoracions();
  },
  methods: {
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
