<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
    <div class="row w-100 justify-content-center">
      <!-- Login Form Centered -->
      <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <div class="login-container p-5 w-100">
          <h1 class="text-center mb-5">Iniciar Sessió</h1>
          <form @submit.prevent="loginUser" class="d-flex flex-column gap-3 p-1">
            <div>
              <label class="form-label" for="identifier">Nom d'usuari o Correu electrònic</label>
              <Input v-model="identifier" name="identifier" placeholder="Introdueix el teu nom d'usuari o correu electrònic" required />
            </div>
            <div>
              <label class="form-label" for="password">Contrasenya</label>
              <Input v-model="password" type="password" name="password" placeholder="************" required />
              <p>
                <a href="/recuperar-contrasenya"
                  class="text-start fst-italic text-primary text-decoration-none d-block">
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

          // Redirigir al home
          this.$router.push({ name: "home" }).then(() => {
            location.reload();
          });


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
