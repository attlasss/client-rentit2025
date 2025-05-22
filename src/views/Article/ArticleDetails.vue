<template>
  <div class="article-detail">
    <div class="container mb-5 text-start">
      <!-- Contenedor principal de la tarjeta -->
      <div v-if="article" class="row d-flex">
        <!-- Columna izquierda: Imagen del artículo -->
        <div class="col-12 col-md-6 mb-3 mb-md-0">
          <img :src="article.foto" alt="Imagen del artículo" class="img-fluid rounded" />
        </div>

        <!-- Columna derecha: Contenido dividido en dos secciones -->
        <div class="col-12 col-md-6">
          <div class="row">
            <!-- Sección de información del artículo -->
            <div class="col-12 mb-4 border rounded-4 p-4 bg-white">
              <h2 class="article-title">{{ article.nom }}</h2>
              <p class="price"><strong>Preu:</strong> {{ article.preu }}€/mes</p>
              <p class="duration"><strong>Duració màxima:</strong> {{ article.mesos }} mesos</p>
              <p class="description"><strong>Descripció:</strong> {{ article.descripcio || 'No disponible' }}</p>
              <p class="description"><strong>Estat: </strong>
                <span class="badge bg-success" v-if="article.estat === 'disponible'">Disponible</span>
                <span class="badge bg-warning" v-if="article.estat === 'en_lloguer'">En lloguer</span>
                <span class="badge bg-danger" v-if="article.estat === 'inactiu'">Inactiu</span>
                <span class="badge bg-info" v-if="article.estat === 'pendent'">Pendent</span>
              </p>

              <!-- <p class="seller">
                <strong>Venedor:</strong>
                <router-link :to="`/verPerfil/${article.username}`">@{{ article.username }}</router-link>
              </p> -->

              <!-- Select para meses -->
              <div class="mb-3">
                <label for="mesesSelect" class="form-label">Selecciona els mesos de lloguer</label>
                <Select v-model="mesesSeleccionados" :options="Array.from({ length: article.mesos }, (_, i) => ({
                  value: i + 1,
                  label: `${i + 1} mesos`
                }))" placeholder="Selecciona una durada" required />
              </div>

              <!-- Precio calculado -->
              <p class="mt-2 mb-3">
                <strong>Preu total:</strong>
                {{ mesesSeleccionados * article.preu }}€
              </p>

              <!-- Botón para comprar -->
              <Button v-if="article.id_user !== usuari.ID" class="w-100 mb-3" color="blue" variant="fill"
                @click="abrirModalComprar">
                Comprar
              </Button>
              <Button v-if="article.id_user === usuari.ID" class="w-100 mb-3" color="blue" variant="fill"
                @click="editarArticle">
                Editar Article
              </Button>

              <!-- Botón para cambiar el estado de favorito -->
              <Button @click="toggleFav(article.id_article)" class="w-100" color="blue" variant="outline">
                <span v-if="article.is_favorite">Treure de Preferits</span>
                <span v-else>Afegir a preferits</span>
              </Button>
            </div>

            <!-- Sección de información del perfil del vendedor -->
            <div class="col-12 mb-4 border rounded-4 p-4 bg-white">
              <!-- Imagen a la izquierda -->
              <div class="col-12 col-md-4 mb-3 mb-md-0 text-center text-md-left">
                <img v-if="usuari.foto_perfil" :src="vendedor.foto_perfil" alt="Foto de perfil"
                  class="rounded-circle mb-3" style="width: 100px; height: 100px; object-fit: cover" />
              </div>

              <!-- Información del perfil a la derecha -->
              <div class="col-12 col-md-8 ">
                <h3>Perfil del Venedor</h3>
                <p><strong>Nom:</strong> {{ vendedor.nom }} {{ vendedor.cognom }}</p>
                <p><strong>Username:</strong> {{ vendedor.username || 'No disponible' }}</p>
                <p><strong>Email:</strong> {{ vendedor.email || 'No disponible' }}</p>
                
              </div>
              <div class="col-12 text-center text-md-right">
                <Button @click="viewProfile" color="blue" variant="outline">Veure perfil</Button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Modal de compra -->
      <div class="modal fade" id="modalComprar" tabindex="-1" aria-labelledby="modalComprarLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalComprarLabel">Finalitzar compra</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tancar"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="confirmarCompra">
                <div class="mb-3">
                  <label for="direccio" class="form-label">Direcció</label>
                  <input type="text" class="form-control" id="direccio" v-model="direccio" required
                    placeholder="Introdueix la direcció" />
                </div>
                <div class="text-end">
                  <Button color="blue" variant="fill" type="submit">Confirmar compra</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje de confirmación de acción -->
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
import Button from "@/components/Button.vue";
import Select from "@/components/Select.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  components: {
    Button, Select,
  },
  data() {
    return {
      article: {},
      toastMessage: '',
      toastColor: '',
      toast: false,
      usuari: {},
      vendedor: {},
      mesesSeleccionados: 1,
      direccio: "",
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

      const articleId = this.$route.params.id;
      try {
        const response = await axiosConn.get(`/getArticleById/${articleId}`);
        this.article = response.data;
        this.mesesSeleccionados = 1;
      } catch (error) {
        console.error("Error al cargar los detalles del artículo:", error);
      }

      try {
        const res = await axiosConn.get(`/infoUsuario/${this.article.id_user}`);
        this.vendedor = res.data.usuari;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    toggleFav(articleId) {
      axiosConn.post("/afegirArticlesPreferits", {
        id_article: articleId,
        id_usuari: this.usuari.ID,
      })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.function === "add") {
              this.toastMessage = "Article afegit a favorits!";
              this.toastColor = "success";
              this.article.is_favorite = true;
            } else if (response.data.function === "delete") {
              this.toastMessage = "Article eliminat de favorits";
              this.toastColor = "danger";
              this.article.is_favorite = false;
            }
            this.toast = true;
            setTimeout(() => {
              this.toast = false;
            }, 2000);
          } if (response.status === 401 || response.status === 403) {
            this.toastMessage = "No has iniciat sessió";
            this.toastColor = "danger";
            this.toast = true;
            setTimeout(() => {
              this.toast = false;
            }, 2000);
          }
          else {
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
    abrirModalComprar() {
      const modal = new bootstrap.Modal(document.getElementById("modalComprar"));
      modal.show();
    },
    confirmarCompra() {
      if (!this.direccio) {
        this.toastMessage = "Introdueix una direcció vàlida";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 2000);
        return;
      }

      // Llamamos a axios para enviar la compra

      axiosConn.post("/newComanda", {
        id_article: this.article.id_article,
        id_emissor: this.usuari.ID,
        id_vendedor: this.article.id_user,
        mesos: this.mesesSeleccionados,
        preu_mes: this.article.preu,
        preu_total: this.mesesSeleccionados * this.article.preu,
        direccio: this.direccio,
      })
        .then((response) => {
          if (response.status === 200) {
            this.toastMessage = "Compra realitzada amb èxit!";
            this.toastColor = "success";
            // Devuelve a mis pedidos
            this.direccio = "";
            const modal = bootstrap.Modal.getInstance(document.getElementById("modalComprar"));
            modal.hide();
            this.$router.push({ name: "perfilComandes", params: { username: this.usuari.username } });

          } else {
            this.toastMessage = "Error al realitzar la compra";
            this.toastColor = "danger";
          }
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 2000);
        })
        .catch((error) => {
          console.error("Error al realitzar la compra:", error);
          this.toastMessage = "Error al realitzar la compra";
          this.toastColor = "danger";
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 2000);
        });

    },
    viewProfile() {
      this.$router.push(`/verPerfil/${this.article.username}`);
    },
    editarArticle() {
      this.$router.push(`/editarArticle/${this.article.id_article}`);
    },
  },
};
</script>

<style scoped>
.article-detail {
  margin-top: 20px;
}

.article-detail img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.article-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.price {
  font-size: 1.25rem;
  font-weight: 600;
  color: #444;
}

.duration {
  font-size: 1rem;
  color: #777;
}

.description {
  font-size: 1rem;
  color: #555;
}

.seller {
  font-size: 1rem;
  color: #578FCA;
}

.profile-info {
  font-size: 1rem;
  color: #333;
}

.profile-info h3 {
  font-size: 1.5rem;
  color: #578FCA;
}

.profile-info p {
  color: #555;
}

.profile-info Button {
  margin-top: 10px;
}
</style>
