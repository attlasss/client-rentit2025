<template>
  <div class="app-container">
    <div class="carousel slide carousel-fullscreen" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active position-relative">
          <img
            src="https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            class="d-block w-100 img-fullscreen img-opacity" alt="Imagen portada ordenador" />
          <div class="carousel-caption-custom d-flex flex-column align-items-center justify-content-center w-100 h-100">
            <div class="text-center w-100">
              <h1 class="logo mb-3">Rent IT</h1>
              <p class="lead mb-4">Lloga i publica dispositius electrònics fàcilment.</p>
            </div>
            <!-- Buscador abajo y alineado a la izquierda en móvil -->
            <div class="search-bar-container mt-4 w-100 d-flex justify-content-center">
              <div class="d-flex justify-content-center w-100">
                <label for="searchQuery" class="no-display">Busqueda</label>
                <input v-model="searchQuery" @keyup.enter="buscarArticle" type="text"
                  class="form-control form-control-lg search-bar" placeholder="iPhone, Samsung..." />
                <Button color="blue" class="ms-3" icon="search" @click="buscarProducte">
                  Busca
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container my-5">
      <h2 class="text-center fs-1 m-5">Articles recents</h2>
      <div v-if="articles.length === 0">No hi articles</div>
      <div v-else>
        <div class="row justify-content-center g-3">
          <div class="col-6 col-sm-6 col-md-4 col-lg-2-4 mb-4" v-for="article in articles" :key="article.id_article">
            <ArticleCard :username="article.username" :nom="article.nom" :preu="article.preu" :mesos="article.mesos"
              :foto="article.foto" :mimeType="article.mimeType" :id_article="article.id_article"
              :userID="article.user_id" :is_favorite="article.is_favorite" @toggleFav="toggleFav(article.id_article)"
              :estat="article.estat" @verMas="viewMore(article.id_article)" />
          </div>
        </div>

      </div>

      <div class="my-5 py-4 px-3 bg-light rounded shadow-sm">
        <h2 class="text-center fs-1 mb-5 fw-bold text-main-blue">Qui som?</h2>
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
          <!-- Imagen SOLO visible en md o más (no en móvil) -->
          <div class="flex-shrink-0 d-none d-md-block">
            <img
              src="https://i.pinimg.com/736x/79/87/fd/7987fd25d12fd7ad3822bc8b3b17ece2.jpg"
              alt="Imatge Samsung Galaxy S23" height="300" width="300"
              class="img-fluid rounded shadow-sm" 
            >
          </div>

          <!-- Texto -->
          <div class="fs-5 text-center text-md-start px-md-4" style="max-width: 600px;">
            <p>
              A <strong>Rent IT</strong>, creem connexions reals a través de la tecnologia. Som una plataforma pensada
              per
              fer que <strong>llogar dispositius electrònics sigui còmode, segur i intel·ligent</strong>.
            </p>
            <p>
              Ja siguis estudiant, professional o creatiu, aquí pots accedir a productes com portàtils, mòbils o càmeres
              sense complicacions. <strong>Comparteix, estalvia i confia</strong> amb nosaltres.
            </p>
            <div class="mt-4">
              <Button color="blue" variant="fill" icon="arrow-right" @click="$router.push('/sobre-nosaltres')">
                Saber més sobre nosaltres
              </Button>
            </div>
          </div>
        </div>
      </div>
</div>

      <!-- Modal login requerido -->
      <div class="modal fade" id="modalLoginRequired" tabindex="-1" aria-labelledby="modalLoginRequiredLabel"
        aria-hidden="true" ref="modalLoginRequired">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLoginRequiredLabel">Inici de sessió requerit</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tancar"></button>
            </div>
            <div class="modal-body">
              Has d'estar logejat per afegir a favorits. Vols iniciar sessió ara?
            </div>
            <div class="modal-footer">
              <Button type="button" color="danger" data-bs-dismiss="modal">No</Button>
              <Button type="button" color="blue" variant="fill" @click="goToLogin">Sí, iniciar sessió</Button>
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

<style scoped>

template {
  font-size: 1rem !important;
}

p, ArticleCard {
  font-size: 1rem !important;
}

h2 {
  font-size: 2rem !important;
}
.logo {
  font-family: 'Pacifico', sans-serif;
  font-weight: 300;
  font-size: 2rem !important;
  text-decoration: none;
  color:white;
}

.logo-color {
  font-family: 'Pacifico', sans-serif;
  text-decoration: none;
  font-weight: 300;
  font-size: 2rem !important;
  color: #578FCA;
}


.carousel-fullscreen {
  height: 100vh;
  overflow: hidden;
}

.img-fullscreen {
  object-fit: cover;
  height: 100vh;
  width: 100vw;
}

.img-opacity {
  opacity: 1;
  filter: brightness(0.4);
}

.carousel-caption-custom {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  color: white;
  text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.7);
  background: none;
}

.search-bar {
  min-width: 220px;
  max-width: 400px;
  border-radius: 30px;
  padding-left: 20px;
  font-size: 1.1rem;
}

@media (max-width: 767px) {
  .carousel-caption-custom {
    justify-content: flex-end !important;
    padding-bottom: 2.5rem;
  }
  .search-bar-container {
    width: 100% !important;
    display: flex !important;
    justify-content: flex-start !important;
    align-items: flex-end !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .search-bar,
  .ms-3 {
    width: calc(100vw - 24px) !important;
    max-width: 100% !important;
    margin-left: 12px !important;
    margin-right: 12px !important;
  }
  .ms-3 {
    margin-top: 10px !important; 
  }
  .d-flex.justify-content-center {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0 !important;
  }
}

@media (min-width: 992px) {
  .col-lg-2-4 {
    flex: 0 0 auto;
    width: 20%;
    /* 100 / 5 */
  }
}

</style>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
import axiosConn from "../axios/axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import Button from "@/components/Button.vue";
export default {
  components: {
    ArticleCard, Button
  },
  data() {
    return {
      inputValue: "",
      articles: [],
      usuari: {},
      toast: false,
      toastMessage: "",
      toastColor: "success",
      modalLoginInstance: null,
      searchQuery: "",
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
    async toggleFav(article) {
      if (!this.usuari || !this.usuari.ID) {
        if (!this.modalLoginInstance) {
          this.modalLoginInstance = new bootstrap.Modal(this.$refs.modalLoginRequired);
        }
        this.modalLoginInstance.show();
        return;
      }
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
          this.toast = true;
          this.toastMessage = "Error al afegir a favorits";
          this.toastColor = "danger";
          setTimeout(() => {
            this.toast = false;
          }, 2000);
        });
    },
    goToLogin() {
      if (this.modalLoginInstance) {
        this.modalLoginInstance.hide();
      }
      this.$router.push({ name: "Login" });
    },
    buscarProducte() {
      // Si está vacío, envía un espacio
      const query = this.searchQuery && this.searchQuery.trim() !== "" ? this.searchQuery : " ";
      this.$router.push({ name: "Buscar", params: { query } });
    },
  }
};
</script>
