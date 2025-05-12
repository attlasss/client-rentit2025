<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Formulari de Devolució</h2>
    <form @submit.prevent="enviarDevolucio" class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Data de devolució</label>
        <input type="date" v-model="form.data" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Estat del producte</label>
        <input type="text" v-model="form.estat" class="form-control" required />
      </div>

      <div class="col-12">
        <label class="form-label">Fotografia del producte</label>
        <input type="file" @change="onFileChange" accept="image/*" class="form-control" required />
      </div>

      <div class="col-12 text-center mt-4">
        <button type="submit" class="btn btn-primary">Retornar</button>
      </div>
    </form>
  </div>
</template>

<script>
import axiosConn from "@/axios/axios"; // ajusta si la ruta es diferente

export default {
  name: "DevolucioForm",
  props: {
    idComanda: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      form: {
        data: "",
        estat: "",
        foto: "", // en base64
      },
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        this.form.foto = event.target.result.split(",")[1]; // solo la parte base64
      };
      reader.readAsDataURL(file);
    },
    async enviarDevolucio() {
      try {
        const payload = {
          id_comanda: this.idComanda,
          data: this.form.data,
          estat: this.form.estat,
          foto: this.form.foto,
        };

        const response = await axiosConn.post("/afegirDevolucio", payload);
        alert("Devolució registrada amb èxit! ID: " + response.data.id);
      } catch (error) {
        console.error("Error al enviar la devolució:", error);
        alert("Error al fer la devolució.");
      }
    },
  },
};
</script>
