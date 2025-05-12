<!-- ComandesClient.vue -->
<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Les Meves Comandes</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Article</th>
          <th>Data</th>
          <th>Estat</th>
          <th>Accions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comanda in comandes" :key="comanda.id_comanda">
          <td>{{ comanda.nom_article }}</td>
          <td>{{ formatDate(comanda.data) }}</td>
          <td>{{ comanda.estat }}</td>
          <td>
            <router-link
              :to="`/retornar/${comanda.id_comanda}`"
              class="btn btn-sm btn-warning"
            >
              Retornar
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axiosConn from "@/axios/axios";

export default {
  name: "ComandesClient",
  data() {
    return {
      comandes: [],
    };
  },
  async mounted() {
    const userId = this.$route.params.id;
    await this.carregarComandes(userId);
  },
  methods: {
    async carregarComandes(id) {
      try {
        const response = await axiosConn.get(`/getComandesClient/${id}`);
        this.comandes = response.data;
      } catch (error) {
        console.error("Error al carregar les comandes:", error);
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("ca-ES", options);
    },
  },
};
</script>

