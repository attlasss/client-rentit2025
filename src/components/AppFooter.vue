<template>
  <footer class="footer py-5 border-top">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 mb-4 mb-md-0">
          <router-link to="/" class="logo-color fs-4 fw-bold text-decoration-none">Rent IT</router-link>
          <p class="mt-2 small text-muted">© 2025 Rent IT. Tots els drets reservats.</p>
        </div>
        <div class="col-6 col-md-2">
          <h6 class="footer-title">Empresa</h6>
          <ul class="list-unstyled">
            <li><router-link to="/sobre-nosaltres" class="footer-link">Sobre Nosaltres</router-link></li>
          </ul>
        </div>
        <div class="col-6 col-md-2">
          <h6 class="footer-title">Compte</h6>
          <ul class="list-unstyled">
            <li><router-link :to="`/perfil/${username}`" class="footer-link">Perfil</router-link></li>
            <li><router-link :to="`/preferits/${username}`" class="footer-link">Preferits</router-link></li>
            <li><router-link :to="`/perfilComandes/${username}`" class="footer-link">Comandes</router-link></li>
          </ul>
        </div>

        <div class="col-6 col-md-2">
          <h6 class="footer-title">Suport</h6>
          <ul class="list-unstyled">
            <li><router-link to="/contacto" class="footer-link">Contacte</router-link></li>
            <li><router-link to="/privacidad" class="footer-link">Privacitat</router-link></li>
            <li><router-link to="/terminos" class="footer-link">Termes</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-title {
  font-weight: 600;
  color: #929292;
  margin-bottom: 0.8rem;
}

.footer-link {
  color: #bbb;
  text-decoration: none;
  display: block;
  margin-bottom: 0.4rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #578FCA;
}
</style>

<script>
export default {
  computed: {
    username() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.username) {
        return user.username
      }
    }
  }
};
</script>
