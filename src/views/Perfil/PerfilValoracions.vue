<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <!-- Menú lateral -->
      <div class="col-md-3 border-end">
        <ul class="nav flex-column nav-pills">
          <li class="nav-item" v-for="(item, index) in menuItems" :key="index">
            <router-link class="nav-link text-start" :to="item.path" active-class="active">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </div>
     <div class="col-md-9">
            <h1 class="text-center mt-5">Les meves Valoracions</h1>
            <div v-if="valoracions.length === 0" class="text-center">
              No tens valoracions encara. 
            </div>
            <div v-else>
              <div v-for="(val, index) in valoracions" :key="index" class="card my-3 shadow-sm">
                <div class="card-body d-flex align-items-start text-start">
                  <img :src="val.emissor_foto" alt="Foto perfil" class="rounded-circle me-3 profile-img" 
                  height="60" width="60"
                  />
                  <div>
                    <p class="mb-0 text-muted"><a class="username-link" @click="verPerfil(val.emissor_username)">@{{
                      val.emissor_username }}</a></p>
                    <p class="mb-1">Puntuació: {{ val.puntuacio }}/5</p>
                    <p class="card-text mb-0">
                      Comentari: {{ val.comentari || 'Sense comentari' }}
                    </p>
                  </div>
                </div>
              </div>
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
import axiosConn from "@/axios/axios";

export default {
  data() {
    return {
      usuari: {},
      valoracions: [],
      toast: false,
      toastMessage: "",
      toastColor: "success",
    };
  },
  computed: {
    menuItems() {
      return [
        { label: "Dades Personals", path: `/perfil/${this.usuari.username || ""}` },
        { label: "Articles", path: `/perfilArticles/${this.usuari.username || ""}` },
        { label: "Comandes", path: `/perfilComandes/${this.usuari.username || ""}` },
        { label: "Devolucions", path: `/perfilDevolucions/${this.usuari.username || ""}` },
        { label: "Ventes", path: `/perfilVentes/${this.usuari.username || ""}` },
        { label: "Valoracions", path: `/perfilValoracions/${this.usuari.username || ""}` },
        { label: "Preferits", path: `/preferits/${this.usuari.username || ""}` },
      ];
    },
    valoracioMitja() {
      if (!this.valoracions.length) return 0;
      return this.valoracions.reduce((acc, v) => acc + v.puntuacio, 0) / this.valoracions.length;
    },
    valoracioMitjaRedondeada() {
      // Para pintar estrellas enteras
      return Math.round(this.valoracioMitja);
    },
    // Aquí se almacenarán los artículos del usuario
  },
  mounted() {
    // Obtener los artículos del usuario al montar el componente
    this.getData();
  },
  methods: {
    // Realiza la solicitud a la API para obtener los artículos
    async getData() {
      // Obtenemos el user 
      this.usuari = JSON.parse(localStorage.getItem("user"));
      console.log(this.usuari)
      try {
        const response = await axiosConn.get(`/getValoracionsUsuari/${this.usuari.username}`);
        this.valoracions = response.data;

        // Calculamos la media de valoraciones
        const totalPuntuacio = this.valoracions.reduce((acc, val) => acc + val.puntuacio, 0);
        this.valoracioMitja = totalPuntuacio / this.valoracions.length;
        this.valoracioMitjaRedondeada = Math.round(this.valoracioMitja);
      } catch (error) {
        console.error("Error al carregar les valoracions:", error);
      }
    },
    // Alternar el estado de favorito de un artículo
    toggleFav(article) {
      axiosConn.post("/afegirArticlesPreferits", {
        id_article: article,
        id_usuari: this.usuari.ID,
      })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.function === "add") {
              this.toastMessage = "Article afegit a favorits!";
              this.toastColor = "success";
              window.location.reload();
            } else if (response.data.function === "delete") {
              this.toastMessage = "Article eliminat de favorits";
              this.toastColor = "danger";
              window.location.reload();
            }

            // Mostrar el toast
            this.toast = true;
            setTimeout(() => {
              this.toast = false;
            }, 2000);
          } else {
            this.toast = true;
            this.toastMessage = "Error al afegir a favorits";
            this.toastColor = "danger";
            setTimeout(() => {
              this.toast = false;
            }, 2000);
          }
        })
        .catch((error) => {
          console.error("Error adding favorite:", error);
          this.showToast("Error al afegir a favorits");
        });
    },
    // Acción para ver más detalles de un artículo
    viewMore(article) {
      this.$router.push(`/article/${article}`);
    },
    verPerfil(username) {
      this.$router.push(`/verPerfil/${username}`);
    },
  }
};
</script>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.nav-link.active {
  background-color: #578FCA;
  color: white;
}

.nav-link {
  color: #578FCA;
}
</style>
