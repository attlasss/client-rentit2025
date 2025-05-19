<template>
  <div class="container-fluid mt-4 d-flex justify-content-center">
    <div class="w-100 max-w-1000">
      <div class="row justify-content-center">

        <div class="col-12 mt-5">
          <div class="row align-items-center text-start">
            <div class="col-12 col-sm-3 mb-3">
              <img :src="usuari.foto_perfil || 'https://via.placeholder.com/150'" alt="Foto de perfil"
                class="rounded-circle profile-img profile-img-size" />
            </div>
            <div class="col-12 col-sm-9">
              <h1 class="mb-4 h2">{{ usuari.nom }} {{ usuari.cognoms }}</h1>
              <p>{{ usuari.email }}</p>
              <!-- Media de valoraciones -->
              <div v-if="valoracions.length > 0" class="mb-2 d-flex align-items-center">
                <span v-for="star in 5" :key="star" class="star" :class="{ selected: star <= valoracioMitjaRedondeada }">★</span>
                <span class="ms-2">({{ valoracioMitja.toFixed(2) }})</span>
                <span class="text-muted">· {{ valoracions.length }} valoracions</span>
              </div>
              <div v-else class="mb-2">
                <span class="text-muted">Sense valoracions</span>
              </div>
              <div class="d-flex mt-2" v-if="puedeValorar && logedUser.id !== usuari.ID">
                <Button color="blue" variant="outline" icon="edit-2" @click="abrirModalValoracio">Valorar</Button>
              </div>
              <div class="d-flex mt-2" v-if="haValorat && logedUser.id !== usuari.ID">
                <Button color="blue" variant="outline" icon="eye" @click="abrirModalVerValoracio">Ver valoració</Button>
              </div>
            </div>
          </div>

          <div class="col-12 mt-5 border-top text-start pt-3">
            <h2 class="mb-4 mt-5">Articles</h2>
            <div class="row g-4">
              <template v-if="articles && articles.length > 0">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" v-for="article in articles"
                  :key="article.id_article">
                  <ArticleCard :username="article.username" :nom="article.nom" :preu="article.preu"
                    :mesos="article.mesos" :foto="article.foto" :mimeType="article.mimeType"
                    :id_article="article.id_article" :userID="article.user_id" :is_favorite="article.is_favorite"
                    :estat="article.estat" @toggleFav="toggleFav(article.id_article)"
                    @verMas="viewMore(article.id_article)" class="w-100" />
                </div>
              </template>
              <div v-else class="text-center">
                <p>No hi ha articles.</p>
              </div>
            </div>
          </div>

          <!-- Valoracions -->
          <div class="row mt-5 border-top pt-3">
            <h2 class="text-center mt-5">Valoracions</h2>
            <div v-if="valoracions.length === 0" class="text-center">
              Aquest usuari encara no té valoracions.
            </div>
            <div v-else>
              <div v-for="(val, index) in valoracions" :key="index" class="card my-3 shadow-sm">
                <div class="card-body d-flex align-items-start text-start">
                  <img :src="val.emissor_foto" alt="Foto perfil" class="rounded-circle me-3 profile-img profile-img-sm" />
                  <div>
                    <p class="mb-0 text-muted"><a class="username-link" @click="verPerfil(val.emissor_username)">@{{ val.emissor_username }}</a></p>
                    <p class="mb-1">Puntuació: {{ val.puntuacio }}/5</p>
                    <p class="card-text mb-0">
                      Comentari: {{ val.comentari || 'Sense comentari' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Valoració -->
          <div class="modal fade" id="modalValoracio" tabindex="-1" aria-labelledby="modalValoracioLabel"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <form @submit.prevent="enviarValoracio">
                  <div class="modal-header">
                    <h5 class="modal-title" id="modalValoracioLabel">Valora l'usuari</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tancar"></button>
                  </div>
                  <div class="modal-body text-center">
                    <div class="mb-3">
                      <span v-for="star in 5" :key="star" class="star clickable-star" :class="{ selected: star <= puntuacio }"
                        @click="puntuacio = star">★</span>
                    </div>
                    <div class="mb-3">
                      <textarea v-model="comentari" class="form-control" placeholder="Comentari (opcional)"
                        rows="3"></textarea>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <Button color="blue" variant="fill" type="submit">Enviar valoració</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Modal per veure la valoració pròpia -->
          <div class="modal fade" id="modalVerValoracio" tabindex="-1" aria-labelledby="modalVerValoracioLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="modalVerValoracioLabel">La teva valoració</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tancar"></button>
                </div>
                <div class="modal-body text-center">
                  <div v-if="valoracioMeva">
                    <div class="mb-3">
                      <span
                        v-for="star in 5"
                        :key="star"
                        class="star"
                        :class="{ selected: star <= valoracioMeva.puntuacio }"
                      >★</span>
                    </div>
                    <div class="mb-3">
                      <p class="mb-0"><strong>Comentari:</strong></p>
                      <p>{{ valoracioMeva.comentari || 'Sense comentari' }}</p>
                    </div>
                  </div>
                  <div v-else>
                    <p class="text-muted">No s'ha trobat la teva valoració.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Toast -->
          <transition name="fade">
            <div v-if="toast"
              class="toast-message text-white px-3 py-2 rounded shadow position-fixed bottom-0 end-0 m-4"
              :class="toastColor === 'success' ? 'bg-success' : 'bg-danger'">
              {{ toastMessage }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axiosConn from "@/axios/axios";
import ArticleCard from "@/components/ArticleCard.vue";
import Button from "@/components/Button.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

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
      logedUser: JSON.parse(localStorage.getItem("user")),
      puedeValorar: false,
      haValorat: false,
      toast: false,
      toastMessage: "",
      toastColor: "",
      puntuacio: 0,
      comentari: "",
      valoracioMeva: null,
    };
  },
  computed: {
    valoracioMitja() {
      if (!this.valoracions.length) return 0;
      return this.valoracions.reduce((acc, v) => acc + v.puntuacio, 0) / this.valoracions.length;
    },
    valoracioMitjaRedondeada() {
      // Para pintar estrellas enteras
      return Math.round(this.valoracioMitja);
    },
  },
  watch: {
    '$route.params.username'(newUsername) {
      this.getData(newUsername); // tu método para cargar datos
      this.getValoracions(); // tu método para cargar valoraciones
    }
  },
  async mounted() {
    await this.getData(this.$route.params.username);
    await this.getValoracions();
  },
  methods: {
    async getData(username) {
      try {
        const response = await axiosConn.get(`/infoUsuarioUsername/${username}`);
        this.usuari = response.data.usuari;
      } catch (error) {
        console.error("Error al carregar dades de l'usuari:", error);
      }

      try {
        const response = await axiosConn.post(`/getArticlesUserSearch/${this.usuari.ID}`, {
          loggedUserId: this.logedUser.id,
        });

        // Solo obtenemos los artículos del usuario que esten disponibles
        this.articles = response.data.filter(article => article.estat === "disponible");
      } catch (error) {
        console.error("Error al carregar articles:", error);
      }
    },
    async getValoracions() {
      // Comprobamos si el usuario ha hecho una valoracion del otro ya que debe ser 1 unica 
      // valoracion por usuario

      await axiosConn.get(`/getValoracionsCheck?emissorID=${this.logedUser.id}&receptorID=${this.usuari.ID}`)
        .then((response) => {
          if (response.data.haValorat) {
            this.puedeValorar = false;
            this.haValorat = true;
            this.valoracioMeva = response.data.valoracioMeva;
          } else {
            this.puedeValorar = true;
          }
        })
        .catch((error) => {
          console.error("Error al carregar les valoracions:", error);
        });

      // Obtenemos las valoraciones del usuario
      try {
        const response = await axiosConn.get(`/getValoracionsUsuari/${this.$route.params.username}`);
        this.valoracions = response.data;

        // Calculamos la media de valoraciones
        const totalPuntuacio = this.valoracions.reduce((acc, val) => acc + val.puntuacio, 0);
        this.valoracioMitja = totalPuntuacio / this.valoracions.length;
        this.valoracioMitjaRedondeada = Math.round(this.valoracioMitja);
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
    },
    abrirModalValoracio() {
      this.puntuacio = 0;
      this.comentari = "";
      const modal = new bootstrap.Modal(document.getElementById("modalValoracio"));
      modal.show();
    },
    async abrirModalVerValoracio() {
      try {
        const res = await axiosConn.get("/getValoracioPropia", {
          params: {
            id_usuari_emissor: this.logedUser.id,
            id_usuari_receptor: this.usuari.ID,
          },
        });
        this.valoracioMeva = res.data;
      } catch (e) {
        this.valoracioMeva = null;
      }
      const modal = new bootstrap.Modal(document.getElementById("modalVerValoracio"));
      modal.show();
    },
    async enviarValoracio() {
      if (this.puntuacio < 1 || this.puntuacio > 5) {
        this.toastMessage = "Selecciona una puntuació de 1 a 5 estrelles.";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => { this.toast = false; }, 2000);
        return;
      }
      try {
        await axiosConn.post("/afegirValoracio", {
          id_usuari_emissor: this.logedUser.id,
          id_usuari_receptor: this.usuari.ID,
          puntuacio: this.puntuacio,
          comentari: this.comentari,
        });
        this.toastMessage = "Valoració enviada!";
        this.toastColor = "success";
        this.toast = true;
        this.getValoracions();
        this.puedeValorar = false;
        setTimeout(() => { this.toast = false; }, 2000);
        // Cerrar modal
        bootstrap.Modal.getInstance(document.getElementById("modalValoracio")).hide();
      } catch (e) {
        this.toastMessage = "Error enviant la valoració";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => { this.toast = false; }, 2000);
      }
    },
    verPerfil(username) {
      this.articles = [];
      this.valoracions = [];
      this.usuari = {};
      this.puedeValorar = false;
      this.haValorat = false;
      // Redirigir a la vista de perfil del usuario
      // Utilizamos el nombre de usuario para la ruta
      this.$router.push(`/verPerfil/${username}`);
    },
  },
};
</script>

<style scoped>
.profile-img {
  object-fit: cover;
}

.profile-img-size {
  height: 200px;
  width: 200px;
}

.profile-img-sm {
  height: 60px;
  width: 60px;
}

.star {
  color: #ccc;
  transition: color 0.2s;
  font-size: 1.5rem;
}

.star.selected {
  color: #FFD700;
}

.clickable-star {
  cursor: pointer;
  font-size: 2rem;
}

.max-w-1000 {
  max-width: 1000px;
}
</style>
