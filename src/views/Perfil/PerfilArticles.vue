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
        <div class="row">
          <div class="col-md-4 mb-4" v-for="(article, index) in articles" :key="index">
            <ArticleCard :user="article.user" :nom="article.nom" :preu="article.preu" :mesos="article.mesos"
              :foto="article.foto" :mimeType="article.mimeType" @toggle-fav="toggleFavorite(article)"
              @view-more="viewMore(article)" />

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
      articles: [], // Aquí se almacenarán los artículos del usuario
      usuari: {},
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
        { label: "Lloguers Actius", path: "/perfil/actius" },
        { label: "Lloguers Pendents", path: "/perfil/pendents" },
      ];
    },
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
        const response = await axiosConn.get(`/getArticles/${userID}`);
        if (response.status === 200) {
          this.articles = response.data;
        } else {
          this.toastMessage = "Error al carregar els articles";
          this.toastColor = "danger";
          this.toast = true;
        }
      } catch (error) {
        this.toastMessage = "Error al carregar els articles";
          this.toastColor = "danger";
          this.toast = true;
      }
    },
    // Alternar el estado de favorito de un artículo
    toggleFavorite(article) {
      article.isFavorited = !article.isFavorited;
      this.showToast(article.isFavorited ? "Article agregado a favoritos" : "Article eliminado de favoritos");
    },
    // Acción para ver más detalles de un artículo
    viewMore(article) {
      this.$router.push(`/article/${article.id}`);
    },
    // Mostrar un mensaje tipo toast
    showToast(message) {
      this.toastMessage = message;
      this.toastColor = "success";
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.toast-message {
  animation: fade-in 0.5s ease-out;
}

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
