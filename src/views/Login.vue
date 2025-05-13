<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <!-- Left Column with Image -->
      <div class="col-12 col-md-6 p-0">
        <div class="image-container h-100">
          <!-- <img src="your-image-path.jpg" alt="Login Image" class="img-fluid h-100 w-100" /> -->
        </div>
      </div>

      <!-- Right Column with Login Form -->
      <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <div class="login-container p-4 w-75">
          <h2 class="text-center mb-4">Iniciar Sessió</h2>
          <form @submit.prevent="loginUser" class="d-flex flex-column gap-3">
            <div>
              <label class="form-label">Nom d'usuari o Correu electrònic</label>
              <Input v-model="identifier" placeholder="Introdueix el teu nom d'usuari o correu electrònic" required />
            </div>
            <div>
              <label class="form-label">Contrasenya</label>
              <Input v-model="password" type="password" placeholder="************" required />
              <!-- Has olvidado la contraseña -->
              <p>
                <a href="/recuperar-contrasenya" class="text-start fst-italic text-primary text-decoration-none d-block">
                  Has oblidat la contrasenya?
                </a>
              </p>
            </div>

            <div class="row text-center mt-3">
              <div class="col-12 col-md-6 mb-2 mb-md-0">
                <Button class="w-100" color="blue" variant="outline"
                  @click="$router.push('/registre')">Registra't</Button>
              </div>
              <div class="col-12 col-md-6">
                <Button class="w-100" color="blue" variant="fill" type="submit">Iniciar sessió</Button>
              </div>
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
// import jwtDecode from "jwt-decode"; 

export default {
  components: {
    Button,
    Input,
  },
  data() {
    return {
      identifier: "", // Can be username or email
      password: "",
      toast: false,
      toastMessage: "",
      toastColor: "success",
    };
  },
  methods: {
    async loginUser() {
      await axiosConn.post('/loginClient', {
        identifier: this.identifier,
        password: this.password
      }).then(response => {
        if (response.data.success) {
          console.log(response.data);
          const { token, user } = response.data;
          
          // Guardar en localStorage
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userID", user.id);
          localStorage.setItem("token", token);

          // Recargar la página y redirigir al home
          window.location.reload();
          this.$router.push({ name: "home" });
          

        } else {
          this.toastMessage = response.data.message; 
          this.toastColor = "danger";
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 2000);
        }
      }).catch(error => {
        this.toastMessage = "Error intern" + error;
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 2000);
      });
    },
  },
};
</script>

<style scoped>
.container-fluid {
  background: linear-gradient(145deg, #21339A 4%, #659FF1 39%, #FFFFFF 88%);
  height: 100vh;
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
</style>
