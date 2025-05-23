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

      <div class="col-md-9 text-start mt-5">
        <div class="row align-items-center ps-0 ps-md-5 justify-content-center">
          <div class="col-12 col-sm-3 col-md-2 text-center text-md-center mb-3 mb-sm-0">
            <img
              :src="usuari.foto_perfil || 'https://via.placeholder.com/150'"
              alt="Foto de perfil"
              class="rounded-circle profile-img"
              height="200"
              width="200"
            />
            <!-- Botón editar foto siempre centrado -->
            <div class="d-flex justify-content-center mt-2">
              <Button icon="edit" color="blue" variant="outline" @click="openModal">Editar Foto</Button>
            </div>
          </div>
          <div class="col-12 col-sm-9 col-md-10 text-center text-md-start">
            <h1 class="mb-4 h2">{{ usuari.nom }} {{ usuari.cognoms }}</h1>
            <p>{{ usuari.email }}</p>
            <p>@{{ usuari.username }}</p>
            <div class="mb-2 d-flex align-items-center">
                <span v-for="star in 5" :key="star" class="star" :class="{ selected: star <= valoracioMitjaRedondeada }">★</span>
                <span class="ms-2">({{ valoracioMitja.toFixed(2) }})</span>
                <span class="text-muted">· {{ valoracions.length }} valoracions</span>
              </div>
          </div>
        </div>

        <div class="row text-left mt-5 border-top pt-3 p-5">
          <h2>Dades Personals</h2>
          <form @submit.prevent="updateUser" class="d-flex flex-column gap-3 mb-5 w-100">
            <!-- Formulario con los datos del usuario -->
            <div>
              <label class="form-label">Username</label>
              <Input v-model="usuari.username" required :disabled="disableDades" />
            </div>
            <div>
              <label class="form-label">Nom</label>
              <Input v-model="usuari.nom" required :disabled="disableDades" />
            </div>
            <div>
              <label class="form-label">Cognom</label>
              <Input v-model="usuari.cognoms" required :disabled="disableDades" />
            </div>
            <div>
              <label class="form-label">Correu electrònic</label>
              <Input v-model="usuari.email" type="email" required disabled />
            </div>
            <div>
              <label class="form-label">Telefon</label>
              <Input v-model="usuari.telefon" type="tel" required :disabled="disableDades" />
            </div>
            <div>
              <label class="form-label">DNI</label>
              <Input v-model="usuari.dni" required disabled/>
            </div>
            <div>
              <label class="form-label">Data Naixement</label>
              <Input type="date" v-model="usuari.data_naixement" required :disabled="disableDades" />
            </div>

            <div class="row text-center mt-3">
              <div class="col-12 col-md-6 mb-2 mb-md-0">
                <Button class="w-100" color="blue" variant="outline" icon="edit" v-if="disableDades" @click="modificarDades">
                  Modificar Dades
                </Button>
                <Button class="w-100" color="blue" variant="fill" type="submit" v-if="!disableDades" icon="save"
                  @click="guardarDades">
                  Guardar Dades
                </Button>
              </div>
              <div class="col-12 col-md-6 mb-2 mb-md-0">
                <Button class="w-100" color="blue" variant="outline" icon="key" @click="canviarContrasenya">
                  Canviar Contrasenya
                </Button>
              </div>
            </div>

            <p class="text-start mt-3 m-0 border-top p-2">Accions del compte </p>
            <div class="row text-center">
              <div class="col-12 col-md-6 mb-2 mb-md-0">
                <Button class="w-100" color="blue" variant="fill" @click="tancarSessio">
                  Tancar Sessió
                </Button>
              </div>
            </div>


            <div class="row text-center">
              <div class="col-12 col-md-6 mb-2 mb-md-0">
                <Button class="w-100" color="danger" variant="" v-if="disableDades" @click="openDeactivateModal">
                  Desactivar Compte
                </Button>
              </div>
            </div>


          </form>
        </div>

        <!-- Modal for Deactivating Account -->
        <div class="modal fade" id="desactivarCompteModal" tabindex="-1" aria-labelledby="desactivarCompteModalLabel"
          aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="desactivarCompteModalLabel">Desactivar Compte</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Estàs segur que vols desactivar el teu compte? Aquesta acció no es pot desfer.</p>
              </div>
              <div class="modal-footer">
                <Button color="secondary" variant="outline" data-bs-dismiss="modal">Cancel·lar</Button>
                <Button color="danger" variant="fill" @click="desactivarCompte">Desactivar</Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal para la foto de perfil -->
        <div class="modal fade" id="editPhotoModal" tabindex="-1" aria-labelledby="editPhotoModalLabel"
          aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editPhotoModalLabel">Editar Foto de Perfil</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="updatePhoto">
                  <div class="mb-3">
                    <label for="profilePhoto" class="form-label">Selecciona una nova foto</label>
                    <input type="file" class="form-control" id="profilePhoto" @change="onFileChange" accept="image/" />
                  </div>
                  <div class="text-center">
                    <Button color="blue" variant="fill" type="submit">Actualitzar Foto</Button>
                  </div>
                </form>
              </div>
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
  </div>
</template>

<script>
import axiosConn from "@/axios/axios";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import feather from "feather-icons";

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      currentView: "dadesPersonals",
      usuari: {},
      valoracions: [],
      username: "",
      userID: "",
      disableDades: true,
      toast: false,
      toastMessage: "",
      toastColor: "success",
      selectedFile: null,
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
    valoracioMitja() {
      if (!this.valoracions.length) return 0;
      return this.valoracions.reduce((acc, v) => acc + v.puntuacio, 0) / this.valoracions.length;
    },
    valoracioMitjaRedondeada() {
      // Para pintar estrellas enteras
      return Math.round(this.valoracioMitja);
    },
  },
  mounted() {
    this.getData();
    feather.replace();
  },
  methods: {
    async getData() {
      const userID = localStorage.getItem("userID");
      try {
        const res = await axiosConn.get(`/infoUsuario/${userID}`);
        this.usuari = res.data.usuari;
        this.usuari.data_naixement = new Date(this.usuari.data_naixement).toISOString().split("T")[0];

        // Gestionamos la imagen
      } catch (err) {
        console.error("Error carregant usuari:", err);
      }

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
    modificarDades() {
      this.disableDades = false
    },
    guardarDades() {
      this.disableDades = true
      axiosConn.put(`/updateUser`,
        {
          user_id: this.usuari.ID,
          username: this.usuari.username,
          nom: this.usuari.nom,
          cognoms: this.usuari.cognoms,
          email: this.usuari.email,
          telefon: this.usuari.telefon,
          dni: this.usuari.dni,
          data_naixement: this.usuari.data_naixement,
        }
      )
        .then(response => {
          if (response.status === 200) {
            this.toast = true;
            this.toastMessage = "Usuari actualitzat amb èxit!";
            this.toastColor = "success";
            setTimeout(() => {
              this.toast = false;
            }, 2000);
          } else {
            this.toast = true;
            this.toastMessage = "Error actualitzant usuari";
            this.toastColor = "danger";
            setTimeout(() => {
              this.toast = false;
            }, 2000);
          }
        })
        .catch(error => {
          console.error("Error actualitzant usuari:", error);
          this.toast = true;
          this.toastMessage = "Error actualitzant usuari";
          this.toastColor = "danger";
          setTimeout(() => {
              this.toast = false;
            }, 2000);
        });
    },
    openModal() {
      const modal = new bootstrap.Modal(document.getElementById("editPhotoModal"));
      modal.show();
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async updatePhoto() {
      if (!this.selectedFile) {
        this.toastMessage = "Selecciona una foto abans de continuar.";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 2000);
        return;
      }

      // Obtenemos el mimetype del archivo
      const mimetype = this.selectedFile.type;
      const formData = new FormData();
      formData.append("foto_perfil", this.selectedFile);
      formData.append("user_id", this.usuari.ID);
      formData.append("mimetype", mimetype);

      try {
        const res = await axiosConn.post("/canviarFotoPerfil", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status === 200) {
          this.toastMessage = "Foto actualitzada amb èxit!";
          this.toastColor = "success";
          this.toast = true;
          this.usuari.foto_perfil = res.data.foto_perfil;
          window.location.reload();
          setTimeout(() => {
            this.toast = false;
          }, 2000);
        } else {
          this.toastMessage = "Error actualitzant la foto.";
          this.toastColor = "danger";
          this.toast = true;
        }
      } catch (err) {
        console.error("Error actualitzant la foto:", err);
        this.toastMessage = "Error actualitzant la foto.";
        this.toastColor = "danger";
        this.toast = true;
      }
    },
    openDeactivateModal() {
      const modal = new bootstrap.Modal(document.getElementById("desactivarCompteModal"));
      modal.show();
    },
    async desactivarCompte() {
      try {
        const res = await axiosConn.post("/desactivarCompte", { user_id: this.usuari.ID });
        if (res.status === 200) {
          this.toastMessage = "Compte desactivat amb èxit!";
          this.toastColor = "success";
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
            this.$router.push("/login");
          }, 2000);
          window.location.reload();
        } else {
          this.toastMessage = "Error desactivant el compte.";
          this.toastColor = "danger";
          this.toast = true;
        }
      } catch (err) {
        console.error("Error desactivant el compte:", err);
        this.toastMessage = "Error desactivant el compte.";
        this.toastColor = "danger";
        this.toast = true;
      }
    },
    tancarSessio() {
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
      localStorage.removeItem("user");
      this.$router.push({ name: "Login" }).then(() => {
            location.reload();
          });
    },
    canviarContrasenya() {
      this.$router.push(`/canviarContrasenya/${this.usuari.username || ""}`);
    },
  },
};
</script>

<style scoped>
.nav-link.active {
  background-color: #578FCA;
  color: white;
}

.nav-link {
  color: #578FCA;
}

.profile-img {
  object-fit: cover;
  border: 2px solid #e6e6e6;
  background: #f7f7f7;
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

@media (max-width: 767.98px) {
  .profile-img {
    margin-bottom: 10px;
  }
}
</style>
