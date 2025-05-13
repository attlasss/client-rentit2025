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
              class="img-fluid mx-auto d-block" 
              style="max-width: 80%; height: auto;" 
              alt="slide 1"
            >
          </div>
          <div class="carousel-item">
            <img 
              src="https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              class="img-fluid mx-auto d-block" 
              style="max-width: 80%; height: auto;" 
              alt="slide 2"
            >
          </div>
          <div class="carousel-item">
            <img 
              src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              class="img-fluid mx-auto d-block" 
              style="max-width: 80%; height: auto;" 
              alt="slide 3"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container my-5">
      <h2 class="text-center fs-1 m-5">Articles recents</h2>
      <div v-if="articles.length === 0">No hay artículos disponibles.</div>
      <div v-else>
        <div v-for="article in articles" :key="article.id_article" class="article-card d-flex align-items-center mb-4 p-3 border rounded shadow-sm">
          <!-- Foto de perfil del usuario -->
          <div class="me-3">
            <img
              :src="'data:image/jpeg;base64,' + article.foto_perfil"
              alt="Foto de perfil"
              class="rounded-circle"
              width="60"
              height="60"
            />
          </div>

          <!-- Detalles del artículo -->
          <div>
            <img :src="article.foto_article" alt="Artículo" class="img-thumbnail mb-2" width="150" />
            <h3>{{ article.nom }}</h3>
            <p>{{ article.descripcio }}</p>
            <p>Precio: {{ article.preu }}€</p>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5">
      <h2 class="text-center fs-1 m-5">Qui som?</h2>
      <div class="d-flex flex-column flex-md-row align-items-center justify-content-center" style="background-color: #f1f1f1; border-radius: 1%; width: 90%; margin: 0 auto;">
        <!-- Texto -->
        <div class="px-4 me-md-5 mb-3 mb-md-0 fs-5" style="max-width: 600px;">
          <p class="text-center mb-0">
            Rent It es una plataforma que permite a los usuarios alquilar productos electrónicos de forma fácil y segura. Conecta a personas que ofrecen dispositivos como móviles, cámaras o portátiles con quienes los necesitan temporalmente, promoviendo un intercambio accesible y confiable.
          </p>
        </div>

        <!-- Imagen -->
        <div>
          <img src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Imagen ejemplo" class="img-fluid rounded">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import axiosConn from "../axios/axios";

export default {
  components: {
    Input,
  },
  data() {
    return {
      inputValue: "",
      articles: []
    };
  },
  mounted() {
    this.getRecentArticles();
  },
  methods: {
    async getRecentArticles() {
      try {
        const response = await axiosConn.get('/getArticlesClient');
        this.articles = response.data;
      } catch (error) {
        console.error("Error al cargar los artículos:", error);
      }
    }
  }
};
</script>


