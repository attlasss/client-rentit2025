<template>
  <header class="header navbar navbar-expand-lg justify-content-between align-items-center">
    <div class="container-fluid d-flex justify-content-between align-items-center flex-wrap">
      <router-link class="logo mb-2 mb-lg-0" to="/">Rent IT</router-link>

      <button class="navbar-toggler border-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <nav class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <template v-if="isLoggedIn">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/">Home</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link text-white" :to="`/allArticles/${this.userID}`">
                Articles
              </router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link text-white" :to="`/perfil/${this.username}`">
                El meu Compte
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" :to="`/preferits/${this.username}`">
                Preferits
              </router-link>
            </li>

            <li class="nav-item ">
              <Button color="white" variant="fill" @click="$router.push('/publicar-article')">Publicar Article</Button>
            </li>

          </ul>
        </template>
        <template v-else>
          <div class="d-flex gap-2 justify-content-end w-100 w-md-auto">
            <Button color="white" variant="outline" @click="$router.push('/login')">Iniciar sessió</Button>
            <Button color="white" variant="fill" @click="$router.push('/registre')">Registra't</Button>
          </div>
        </template>
      </nav>
      <!-- Buscador -->
    </div>
  </header>

  <!-- Buscador solo si está logeado y NO está en Home -->
  <div class="w-100"  v-if="isLoggedIn && $route.name !== 'home' && $route.name !== 'Login' && $route.name !== 'Registre'">
    <div class="d-flex m-2" >
      <label for="searchQuery" class="no-display">Busqueda</label>
      <Input
        type="text"
        class="w-100 search-bar"
        placeholder="Cerca un producte..."
        v-model="searchQuery"
        @keyup.enter="buscarProducte"
        id="searchQuery"
        name="searchQuery"
      />
      <Button color="blue" variant="fill" class="ms-2" icon="search" @click="buscarProducte">
        Buscar
      </Button>
    </div>
  </div>

</template>


<script>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import feather from "feather-icons";

export default {
  components: {
    Button, Input,
  },
  data() {
    return {
      isLoggedIn: false,
      username: "",
      userID: "",
    };
  },
  created() {
    this.checkLoginStatus();

    this.$nextTick(() => {
      feather.replace(); // Recargar íconos Feather en el DOM
    });
  },
  methods: {
    checkLoginStatus() {
      // Mira si esta inciado sesion para mostrar el menu correcto 
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("user");
      this.userID = localStorage.getItem("userID");
      if (username) {
        this.username = JSON.parse(username).username;
      }
      this.isLoggedIn = !!token;
    },
    buscarProducte() {
      // Si está vacío, envía un espacio
      const query = this.searchQuery && this.searchQuery.trim() !== "" ? this.searchQuery : " ";
      this.$router.push({ name: "Buscar", params: { query } });
    },
  },
};
</script>

<style scoped>
.header {
  background: linear-gradient(90deg, #21339A 0%, #2064AB 43%, #659FF1 79%);
  color: white;
  text-align: center;
  align-items: center;
  padding: 15px 75px;
}

.no-border {
  border: none !important;
  box-shadow: none !important;
}

li {
  font-size: 1.2rem;
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.5);
  background: transparent;
  box-shadow: none;
}

.navbar-toggler:focus {
  outline: none;
  box-shadow: none;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.logo {
  font-family: 'Pacifico', sans-serif;
  font-weight: 300;
  font-size: 2rem !important;
  text-decoration: none;
  color:white;
}

.logo-color {
  font-family: 'Pacifico', sans-serif;
  text-decoration: none;
  font-weight: 300;
  font-size: 2rem !important;
  color: #578FCA;
}

@media (min-width: 992px) {
  .navbar-nav {
    align-items: center !important;
    text-align: center !important;
  }
  .navbar-nav .nav-item {
    width: auto;
  }
  .navbar-collapse {
    justify-content: flex-end !important;
  }
}

@media (max-width: 991px) {
  .header {
    padding: 15px 10px;
    border: none !important;
    box-shadow: none !important;
  }
  .navbar-collapse {
    justify-content: flex-start !important;
  }
  .navbar-nav {
    align-items: flex-start !important;
    text-align: left !important;
  }
  .navbar-toggler {
    border:none;
  }
  .navbar-nav .nav-item {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .header {
    padding: 10px 5px;
    border: none !important;
    box-shadow: none !important;
  }
}


</style>
