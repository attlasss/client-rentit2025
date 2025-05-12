<template>
  <header class="header navbar navbar-expand-lg">
    <div class="container-fluid d-flex justify-content-between align-items-center flex-wrap">
      <h1 class="logo mb-2 mb-lg-0">Rent IT</h1>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <nav class="collapse navbar-collapse justify-content-lg-end" id="navbarNav">
        <template v-if="isLoggedIn">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/about">El meu Compte</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/about">Les meves comandes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/about">Articles Preferits</router-link>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="d-flex gap-2">
            <Button color="white" variant="outline" @click="$router.push('/login')">Iniciar sessió</Button>
            <Button color="white" variant="fill" @click="$router.push('/registre')">Registra't</Button>
          </div>
        </template>
      </nav>
    </div>
  </header>
</template>


<script>
import Button from "@/components/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      isLoggedIn: false // cámbialo según tu lógica de sesión
    };
  }
};
</script>

<style scoped>
.header {
  background: linear-gradient(90deg, #21339A 0%, #2064AB 43%, #659FF1 79%);
  color: white;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 75px;
}

li {
  font-size: 1.2rem;
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.5);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

/* Responsive */
@media (max-width: 991px) {
  .header {
    padding: 30px 50px;
  }
}

@media (max-width: 576px) {
  .header {
    padding: 20px 30px;
  }
}
</style>
