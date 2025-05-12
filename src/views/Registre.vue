<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="form-container p-4">
          <h2 class="text-center mb-4">Crear Compte</h2>
          <form @submit.prevent="registrarUsuari" class="d-flex flex-column gap-3">
            <div>
              <label class="form-label">Nom</label>
              <Input v-model="form.nom" placeholder="Introdueix el teu nom" required />
            </div>

            <div>
              <label class="form-label">Cognoms</label>
              <Input v-model="form.cognoms" placeholder="Introdueix els teus cognoms" required />
            </div>

            <div>
              <label class="form-label">Email</label>
              <Input v-model="form.email" type="email" placeholder="Introdueix el teu correu electrònic" required />
            </div>

            <div>
              <label class="form-label">Data de naixement</label>
              <Input v-model="form.data_naixement" type="date" placeholder="Selecciona la teva data de naixement" required />
            </div>

            <div>
              <label class="form-label">Nom d'usuari</label>
              <Input v-model="form.username" placeholder="Introdueix el teu nom d'usuari" required />
            </div>

            <div>
              <label class="form-label">Contrasenya</label>
              <Input v-model="form.password" type="password" placeholder="Introdueix la teva contrasenya" required />
            </div>

            <div>
              <label class="form-label">Confirma la contrasenya</label>
              <Input v-model="confirmPassword" type="password" placeholder="Confirma la teva contrasenya" required />
            </div>

            <div class="text-center mt-3">
              <Button color="blue" variant="fill" type="submit">Crear Compte</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="toast" class="toast-message text-white px-3 py-2 rounded shadow position-fixed bottom-0 end-0 m-4"
        :class="toastColor === 'success' ? 'bg-success' : 'bg-danger'">
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import axiosConn from "@/axios/axios";

export default {
  components: {
    Button,
    Input,
  },
  data() {
    return {
      form: {
        nom: "",
        cognoms: "",
        email: "",
        data_naixement: "",
        username: "",
        password: "",
        foto_perfil: "",
      },
      confirmPassword: "",
      toast: false,
      toastMessage: "",
      toastColor: "success",
    };
  },
  methods: {
    async registrarUsuari() {
      if (this.form.password !== this.confirmPassword) {
            this.toastMessage = "Les contrasenyes no coincideixen";
            this.toastColor = "danger";
            this.toast = true;
            setTimeout(() => {
              this.toast = false;
            }, 2000);
        return;
      }

      try {
        const response = await axiosConn.post("/crearUser", this.form);
        alert("Usuari creat amb èxit! ID: " + response.data.id);
      } catch (error) {
        console.error("Error al registrar usuari:", error);
        alert("Error al registrar usuari.");
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
