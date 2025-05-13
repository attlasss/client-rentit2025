<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Valorar Usuari</h2>
    <form @submit.prevent="enviarValoracio" class="row g-3">
      <div class="col-12">
        <label class="form-label">Puntuació (1 a 5)</label>
        <input type="number" v-model="form.puntuacio" min="1" max="5" class="form-control" required />
      </div>

      <div class="col-12">
        <label class="form-label">Comentari</label>
        <textarea v-model="form.comentari" class="form-control" rows="4" required></textarea>
      </div>

      <div class="col-12 text-center mt-4">
        <button type="submit" class="btn btn-primary">Publicar Valoració</button>
      </div>
    </form>
  </div>
</template>

<script>
import axiosConn from "@/axios/axios"; // ajusta la ruta si es necesario

export default {
  name: "ValorarUsuari",
  data() {
    return {
      form: {
        puntuacio: "",
        comentari: "",
      },
    };
  },
  methods: {
    async enviarValoracio() {
      try {
        const idReceptor = this.$route.params.id; // ID del usuario al que se valora
        const idEmissor = 1; // Reemplaza esto con el ID del usuario actual (por ejemplo, desde el store o sesión)

        const payload = {
          id_usuari_emissor: idEmissor,
          id_usuari_receptor: parseInt(idReceptor),
          puntuacio: this.form.puntuacio,
          comentari: this.form.comentari,
        };

        await axiosConn.post("/afegirValoracio", payload);
        alert("Valoració enviada correctament.");
        this.$router.push(`/perfil/${idReceptor}`);
      } catch (error) {
        console.error("Error al enviar la valoració:", error);
        alert("No s'ha pogut enviar la valoració.");
      }
    },
  },
};
</script>
