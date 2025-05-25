<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="form-container p-4">
          <h1 class="text-center mb-5">Crear Compte</h1>
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
              <label class="form-label">Telèfon</label>
              <Input v-model="form.telefon" type="tel" placeholder="Introdueix el teu número de telèfon" required />
            </div>

            <div>
              <label class="form-label">Data de naixement</label>
              <Input v-model="form.data_naixement" type="date" placeholder="Selecciona la teva data de naixement"
                required />
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
        telefon: "",
      },
      confirmPassword: "",
      toast: false,
      toastMessage: "",
      toastColor: "success",
    };
  },
  methods: {
    async registrarUsuari() {
      // Validar que ningún campo esté vacío
      for (const key in this.form) {
        if (this.form[key] === "" || this.form[key] === null || this.form[key] === undefined) {
          this.toastMessage = "Tots els camps són obligatoris";
          this.toastColor = "danger";
          this.toast = true;
          setTimeout(() => { this.toast = false; }, 2000);
          return;
        }
      }
      if (this.confirmPassword === "") {
        this.toastMessage = "Tots els camps són obligatoris";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => { this.toast = false; }, 2000);
        return;
      }

      // Validar edad
      const hoy = new Date();
      const nacimiento = new Date(this.form.data_naixement);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        // Si aún no ha cumplido años este año
        edad--;
      }
      if (edad < 16) {
        this.toastMessage = "Has de ser major de 16 anys";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => { this.toast = false; }, 2000);
        return;
      }

      // Validar teléfono (opcional: solo números y mínimo 9 dígitos)
      const phoneRegex = /^[0-9]{9,15}$/;
      if (!phoneRegex.test(this.form.telefon)) {
        this.toastMessage = "El telèfon ha de tenir entre 9 i 15 dígits numèrics.";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => { this.toast = false; }, 2000);
        return;
      }

      // Validar contraseña segura
      const password = this.form.password;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        this.toastMessage = "La contrasenya ha de tenir almenys 8 caràcters, una majúscula, una minúscula i un número.";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => { this.toast = false; }, 3000);
        return;
      }


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
        if (response.status === 200) {
          this.toastMessage = "Usuari creat amb èxit!";
          this.toastColor = "success";
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
            this.$router.push("/login");
          }, 2000);
        } else {
          this.toastMessage = "Error al crear l'usuari";
          this.toastColor = "danger";
          this.toast = true;
        }
      } catch (error) {
        console.error("Error al registrar usuari:", error);
        this.toastMessage = "Error al crear l'usuari";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 2000);
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

.form-label {
  text-align: left;
  display: block;
  font-weight: 600;
}
</style>
