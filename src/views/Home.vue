<template>
  <div class="app-container">

    <!-- Carrusel -->
    <div class="my-5">
      <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner text-center"> <!-- Centramos el contenido -->
          <div class="carousel-item active">
            <img
              src="https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              class="img-fluid mx-auto d-block" style="max-width: 80%; height: auto;" alt="slide 1">
          </div>
          <div class="carousel-item">
            <img
              src="https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              class="img-fluid mx-auto d-block" style="max-width: 80%; height: auto;" alt="slide 2">
          </div>
          <div class="carousel-item">
            <img
              src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              class="img-fluid mx-auto d-block" style="max-width: 80%; height: auto;" alt="slide 3">
          </div>
        </div>
      </div>
    </div>

    <div class="container my-5">
      <h2 class="text-center fs-1 m-5">Articles recents</h2>
      <div v-if="articles.length === 0">No hi articles</div>
      <div v-else>
        <div class="row justify-content-center g-3">
          <div class="col-12 col-md-2 mb-4" v-for="article in articles" :key="article.id_article">
            <ArticleCard :username="article.username" :nom="article.nom" :preu="article.preu" :mesos="article.mesos"
              :foto="article.foto" :mimeType="article.mimeType" :id_article="article.id_article"
              :userID="article.user_id" :is_favorite="article.is_favorite" @toggleFav="toggleFav(article.id_article)"
              :estat="article.estat" @verMas="viewMore(article.id_article)" />
          </div>
        </div>
      </div>

      <div class="my-5">
        <h2 class="text-center fs-1 m-5">Qui som?</h2>
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
          <!-- Texto -->
          <div class="px-4 me-md-5 mb-3 mb-md-0 fs-5">
            <p class="text-center mb-0">
              Rent It és una plataforma que permet als usuaris llogar productes electrònics de manera fàcil i segura.
              Connecta persones que ofereixen dispositius com mòbils, càmeres o portàtils amb aquelles que els
              necessiten temporalment, fomentant un intercanvi accessible i de confiança.
            </p>
          </div>

          <!-- Imagen -->
          <div>
            <img
              src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Imagen ejemplo" class="img-fluid rounded">
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
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
import axiosConn from "../axios/axios";

export default {
  components: {
    ArticleCard
  },
  data() {
    return {
      inputValue: "",
      articles: [],
      usuari: {},
      toast: false,
      toastMessage: "",
      toastColor: "success",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const userID = localStorage.getItem("userID");
      try {
        const res = await axiosConn.get(`/infoUsuario/${userID}`);
        this.usuari = res.data.usuari;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }

      try {
        const response = await axiosConn.get(`/getArticlesHome/${userID}`);
        this.articles = response.data;
      } catch (error) {
        console.error("Error al cargar los artículos:", error);
      }
    },
    viewMore(article) {
      this.$router.push(`/article/${article}`);
    },
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
            } else if (response.data.function === "delete") {
              this.toastMessage = "Article eliminat de favorits";
              this.toastColor = "danger";
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

  }
};
</script>
