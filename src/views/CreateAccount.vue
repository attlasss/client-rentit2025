<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Crear Compte</h2>
    <form @submit.prevent="registrarUsuari" class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Nom</label>
        <input type="text" v-model="form.nom" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Cognoms</label>
        <input type="text" v-model="form.cognoms" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Email</label>
        <input type="email" v-model="form.email" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Data de naixement</label>
        <input type="date" v-model="form.data_naixement" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Nom d'usuari</label>
        <input type="text" v-model="form.username" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Contrasenya</label>
        <input type="password" v-model="form.password" class="form-control" required />
      </div>

      <div class="col-12">
        <label class="form-label">Foto de perfil</label>
        <input type="file" @change="handleFileChange" class="form-control" accept="image/*" />
      </div>

      <div class="col-12 text-center mt-4">
        <button type="submit" class="btn btn-primary">Crear Compte</button>
      </div>
    </form>
  </div>
</template>

<script>
import axiosConn from "@/axios/axios";

export default {
  name: "CrearUsuari",
  data() {
    return {
      form: {
        nom: "",
        cognoms: "",
        email: "",
        data_naixement: "",
        username: "",
        password: "",
        foto_perfil: "", // Contendrá la imagen en base64
      },
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.form.foto_perfil = reader.result.split(",")[1]; // solo base64
        };
        reader.readAsDataURL(file);
      }
    },

    async registrarUsuari() {
      try {
        const response = await axiosConn.post("/registrarUsuari", this.form);
        alert("Usuari creat amb èxit! ID: " + response.data.id);
      } catch (error) {
        console.error("Error al registrar usuari:", error);
        alert("Error al registrar usuari.");
      }
    },
  },
};
</script>


