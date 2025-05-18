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
      <!-- Artículos -->
      <div class="col-md-9">
        <h1 class="mb-4">Els meus articles</h1>
        <div class="row px-4">
          <!-- Comprobamos si existen artículos antes de hacer el v-for -->
          <div v-if="articles && articles.length > 0">
            <div class="col-md-3 mb-4" v-for="(article, index) in articles" :key="index">
              <ArticleCard :username="article.username" :nom="article.nom" :preu="article.preu" :mesos="article.mesos"
                :foto="article.foto" :mimeType="article.mimeType" :id_article="article.id_article"
                :userID="article.user_id" :is_favorite="article.is_favorite" @toggleFav="toggleFav(article.id_article)"
                :estat="article.estat"
                @verMas="viewMore(article.id_article)" />
            </div>
          </div>
          <div v-else>
            <p>No hi ha articles.</p>
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
import ArticleCard from "@/components/ArticleCard.vue"; // Importar el componente ArticleCard
import axiosConn from "@/axios/axios";

export default {
  components: {
    ArticleCard
  },
  data() {
    return {
      // articles: [], // Aquí se almacenarán los artículos del usuario
      usuari: {},
      articles: [],
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
    // Aquí se almacenarán los artículos del usuario
  },
  mounted() {
    // Obtener los artículos del usuario al montar el componente
    this.getArticles();
  },
  methods: {
    // Realiza la solicitud a la API para obtener los artículos
    async getArticles() {
      // Obtenemos el user 
      const userID = localStorage.getItem("userID");
      try {
        const res = await axiosConn.get(`/infoUsuario/${userID}`);
        this.usuari = res.data.usuari;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }

      try {
        const response = await axiosConn.get(`/getArticlesUser/${userID}`);
        if (response.status === 200) {
          this.articles = response.data;
        } else {
          this.toastMessage = "Error al carregar els articles";
          this.toastColor = "danger";
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);

        }
      } catch (error) {
        this.toastMessage = "Error al carregar els articles";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 3000);
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
    // Mostrar un mensaje tipo toast
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
