<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center mb-4">Articles Preferits</h1>
        <p class="text-center no-display">Els teus articles preferits. </p>
      </div>
    </div>

    <!-- Artículos -->
    <div v-if="articles.length === 0" class="text-center my-4">
      <p>Encara no tens cap article preferit. </p>
    </div>

    <div v-else>
      <div class="row g-3 justify-content-center mx-0 mx-xl-5">
        <div
          class="col-6 col-sm-6 col-md-4 col-lg-2 d-flex align-items-stretch"
          v-for="(article, index) in articles"
          :key="article.id_article"
        >
          <ArticleCard
            :username="article.username"
            :nom="article.nom"
            :preu="article.preu"
            :mesos="article.mesos"
            :foto="article.foto"
            :mimeType="article.mimeType"
            :id_article="article.id_article"
            :userID="article.user_id"
            :is_favorite="article.is_favorite"
            @toggleFav="toggleFav(article.id_article, index)"
            :estat="article.estat"
            @verMas="viewMore(article.id_article)"
            class="w-100"
          />
        </div>
      </div>
    </div>


    <!-- Mensaje tipo toast -->
    <transition name="fade">
      <div v-if="toast" class="toast-message text-white px-3 py-2 rounded shadow position-fixed bottom-0 end-0 m-4"
        :class="toastColor === 'success' ? 'bg-success' : 'bg-danger'">
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<style scoped>

@media (min-width: 1200px) {
  .col-lg-2 {
    flex: 0 0 auto;
    width: 16.66666667%; /* 100 / 6 = 16.66... */
  }
}
</style>
<script>
import ArticleCard from "@/components/ArticleCard.vue"; // Importar el componente ArticleCard
import axiosConn from "@/axios/axios";

export default {
  components: {
    ArticleCard
  },
  data() {
    return {
      usuari: {},
      articles: [],
      toast: false,
      toastMessage: "",
      toastColor: "success",
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    // Obtener los artículos del usuario
    async getArticles() {
      const userID = localStorage.getItem("userID");
      this.usuari = JSON.parse(localStorage.getItem("user"));

      try {
        const response = await axiosConn.get(`/getArticlesPreferits/${userID}`);
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
    toggleFav(articleId, index) {
      axiosConn.post("/afegirArticlesPreferits", {
        id_article: articleId,
        id_usuari: this.usuari.id,
      })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.function === "add") {
              this.toastMessage = "Article afegit a favorits!";
              this.toastColor = "success";
              this.articles[index].is_favorite = true;
            } else if (response.data.function === "delete") {
              this.toastMessage = "Article eliminat de favorits";
              this.toastColor = "danger";
              // Eliminar el artículo de la lista si se elimina de favoritos
              this.articles.splice(index, 1);
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
</style>
