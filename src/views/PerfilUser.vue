<template>
  <div class="container-fluid mt-4">
    <div class="row">

      <div class="col-md-9 mt-5">
        <div class="row align-items-center ps-0 ps-md-5">
          <div class="col-12 col-sm-3 col-md-2 text-center text-md-start mb-3 mb-sm-0">
            <img :src="usuari.foto_perfil || 'https://via.placeholder.com/150'" alt="Foto de perfil"
              class="rounded-circle profile-img" height="100" width="100" />
            <!-- Botón editar foto siempre centrado -->
            <div class="d-flex justify-content-center mt-2">
              <Button icon="edit" color="blue" variant="outline" @click="openModal">Editar Foto</Button>
            </div>
          </div>
          <div class="col-12 col-sm-9 col-md-10 text-center text-md-start">
            <p class="mb-4 h2">{{ usuari.nom }} {{ usuari.cognoms }}</p>
            <p>{{ usuari.email }}</p>
          </div>
        </div>

        <!-- Articles publicats -->
        <div class="col-md-9">
          <h1 class="mb-4">Articles </h1>
          <div class="row g-4 px-4">
            <template v-if="articles && articles.length > 0">
              <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" v-for="article in articles"
                :key="article.id_article">
                <ArticleCard :username="article.username" :nom="article.nom" :preu="article.preu" :mesos="article.mesos"
                  :foto="article.foto" :mimeType="article.mimeType" :id_article="article.id_article"
                  :userID="article.user_id" :is_favorite="article.is_favorite" :estat="article.estat"
                  @toggleFav="toggleFav(article.id_article)" @verMas="viewMore(article.id_article)" class="w-100" />
              </div>
            </template>
            <div v-else>
              <p>No hi ha articles.</p>
            </div>
          </div>
        </div>

        <!-- Valoracions -->
        <div class="row text-left mt-5 border-top pt-3 p-5">
          <h2>Valoracions</h2>
          <div v-if="valoracions.length === 0" class="text-center">
            Aquest usuari encara no té valoracions.
          </div>
          <div v-else>
            <div v-for="(val, index) in valoracions" :key="index" class="card my-3 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">Puntuació: {{ val.puntuacio }}/5</h5>
                <p class="card-text">{{ val.comentari || 'Sense comentari' }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Botón para valorar -->
        <div class="text-center mt-5">
          <router-link :to="`/valoracio/${userId}`" class="btn btn-primary">
            Fer una valoració
          </router-link>
        </div>
      </div>

<transition name="fade">
      <div v-if="toast" class="toast-message text-white px-3 py-2 rounded shadow position-fixed bottom-0 end-0 m-4"
        :class="toastColor === 'success' ? 'bg-success' : 'bg-danger'">
        {{ toastMessage }}
      </div>
    </transition>
    </div>
  </div>
</template>

<script>
import axiosConn from "@/axios/axios";
import ArticleCard from "@/components/ArticleCard.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    ArticleCard,
    Button,
  },
  data() {
    return {
      usuari: {},
      valoracions: [],
      articles: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await axiosConn.get(`/infoUsuarioUsername/${this.$route.params.username}`);
        this.usuari = response.data.usuari;
      } catch (error) {
        console.error("Error al carregar dades de l'usuari:", error);
      }

      console.log("ID de l'usuari:", this.usuari.ID);
      try {
        const response = await axiosConn.get(`/getArticlesUser/${this.usuari.ID}`);
        // Solo obtenemos los artículos del usuario que esten disponibles
        this.articles = response.data.filter(article => article.estat === "disponible");
      } catch (error) {
        console.error("Error al carregar articles:", error);
      }
    },
    async getValoracions() {
      try {
        const response = await axiosConn.get(`/valoracionsClient/${this.$route.params.username}`);
        this.valoracions = response.data;
      } catch (error) {
        console.error("Error al carregar les valoracions:", error);
      }
    },
        toggleFav(article) {
      axiosConn.post("/afegirArticlesPreferits", {
        id_article: article,
        id_usuari: localStorage.getItem("userID"),
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
    viewMore(id) {
      this.$router.push(`/article/${id}`);
    }
  },
};
</script>

<style scoped>
.profile-img {
  object-fit: cover;
}
</style>
