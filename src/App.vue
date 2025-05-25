<template>
  <div class="app-container">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import feather from "feather-icons";
export default {
  components: {
    AppHeader,
    AppFooter
  },
  mounted() {
    this.$nextTick(() => {
      feather.replace(); // Recargar íconos Feather en el DOM
    });
  }
};
</script>

<style scoped>
* {
  font-size: 1rem !important;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  font-size: 1rem !important;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

/* Fonts */
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

h1 {
  font-family: 'Urbanist', sans-serif;
  font-weight: 400 !important;
  font-size: 2rem !important;
}



.form-label {
  text-align: left;
  display: block;
  font-weight: 600;
}

.username-link {
  text-decoration: none;
  color: #578FCA;
  font-style: italic;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;
}

.username-link:hover {
  text-decoration: underline;
}

.no-display {
  display: none;
}

.no-border {
  border: none !important;
  box-shadow: none !important;
}


/* Logo en responsive */
@media (max-width: 576px) {
  .logo {
    font-size: 1.8rem;
  }
}

</style>
