<template>
  <div class="app-container">
    <div class="row mt-5">
      <div class="col-1"></div>
      <div class="col-10">
        <Input v-model="inputValue" placeholder="Busca un article..." type="text" :disabled="false" :isRequired="true"
          width="100%" />
      </div>
      <div class="col-1"></div>
    </div>

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
              :userID="article.user_id" :is_favorite="article.is_favorite" @verMas="viewMore(article.id_article)"/>
          </div>
        </div>
      </div>

      <div class="my-5">
        <h2 class="text-center fs-1 m-5">Qui som?</h2>
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-center"
          style="background-color: #f1f1f1; border-radius: 1%; width: 90%; margin: 0 auto;">
          <!-- Texto -->
          <div class="px-4 me-md-5 mb-3 mb-md-0 fs-5" style="max-width: 600px;">
            <p class="text-center mb-0">
              Rent It es una plataforma que permite a los usuarios alquilar productos electrónicos de forma fácil y
              segura. Conecta a personas que ofrecen dispositivos como móviles, cámaras o portátiles con quienes los
              necesitan temporalmente, promoviendo un intercambio accesible y confiable.
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
import Input from "@/components/Input.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import axiosConn from "../axios/axios";

export default {
  components: {
    Input,
    ArticleCard
  },
  data() {
    return {
      inputValue: "",
      articles: [],
      usuari: {},
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
        const response = await axiosConn.get('/getArticlesHome');
        this.articles = response.data;
      } catch (error) {
        console.error("Error al cargar los artículos:", error);
      }
    },
    viewMore(article) {
      this.$router.push(`/article/${article}`);
    },

  }
};
</script>
