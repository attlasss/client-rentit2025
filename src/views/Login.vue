<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <!-- Left Column with Image -->
      <div class="col-12 col-md-6 p-0">
        <div class="image-container h-100">
          <img src="your-image-path.jpg" alt="Login Image" class="img-fluid h-100 w-100" />
        </div>
      </div>

      <!-- Right Column with Login Form -->
      <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <div class="login-container p-4 w-75">
          <h2 class="text-center mb-4">Iniciar Sessió</h2>
          <form @submit.prevent="loginUser" class="d-flex flex-column gap-3">
            <div>
              <label class="form-label">Nom d'usuari</label>
              <Input v-model="form.username" placeholder="Introdueix el teu nom d'usuari" required />
            </div>
            <div>
              <label class="form-label">Contrasenya</label>
              <Input v-model="form.password" type="password" placeholder="************" required />
            </div>

            <div class="text-center mt-3">
                <Button color="blue" variant="outline" @click="$router.push('/login')">Iniciar sessió</Button>
                <Button color="blue" variant="fill" @click="$router.push('/registre')">Registra't</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axiosConn.post("/login", this.form);
        if (response.status === 200) {
          this.$router.push("/dashboard");
        } else {
          alert("Error en iniciar sessió");
        }
      } catch (error) {
        console.error("Error en iniciar sessió:", error);
        alert("Error en iniciar sessió");
      }
    },
  },
};
</script>

<style scoped>
.container-fluid {
  background: linear-gradient(145deg, #21339A 4%, #659FF1 39%, #FFFFFF 88%);
  height: 100vh; /* Ensure it covers the full viewport height */
}

.image-container img {
  object-fit: cover;
}

.login-container {
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