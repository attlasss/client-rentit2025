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

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
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
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 2.5rem;
  color:white;
}

.logo-color {
  font-family: 'Urbanist', sans-serif;
  font-weight: 400;
  font-size: 2.5rem;
  color: #578FCA;
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
</style>
