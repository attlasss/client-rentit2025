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

      <div class="col-md-9">
        <div class="row">
          <div class="col-2">
            <div class="text-center mb-4">
              <img :src="usuari.foto_perfil || 'https://via.placeholder.com/150'" alt="Foto de perfil"
                class="rounded-circle" height="100px" width="100px" />
            </div>
            <!-- Boton editar foto -->
            <Button class="w-100 mt-1" color="blue" variant="outline" @click="openModal">Editar Foto</Button>
          </div>
          <div class="col-10">
            <h2 class="mb-4">{{ usuari.nom }} {{ usuari.cognoms }}</h2>
          </div>
        </div>

        <div class="row text-left mt-5 border-top pt-3 p-5">
          <h2>Dades Personals</h2>
          <form @submit.prevent="updateUser" class="d-flex flex-column gap-3 mb-5">
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
              <Input v-model="usuari.email" type="email" required :disabled="disableDades" />
            </div>
            <div>
              <label class="form-label">DNI</label>
              <Input v-model="usuari.dni" required :disabled="disableDades" />
            </div>
            <div>
              <label class="form-label">Data Naixement</label>
              <Input type="date" v-model="usuari.data_naixement" required :disabled="disableDades" />
            </div>

            <div class="row text-center mt-3">
              <div class="col-12 col-md-6 mb-2 mb-md-0">
                <Button class="w-100" color="danger" variant="" v-if="disableDades" @click="openDeactivateModal">
                  Desactivar Compte
                </Button>
              </div>
              <div class="col-12 col-md-6 mb-2 mb-md-0">
                <Button class="w-100" color="blue" variant="outline" v-if="disableDades" @click="modificarDades">
                  Modificar Dades
                </Button>
                <Button class="w-100" color="blue" variant="fill" type="submit" v-if="!disableDades" @click="guardarDades">
                  Guardar Dades
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

        <!-- Modal for editing profile picture -->
        <div class="modal fade" id="editPhotoModal" tabindex="-1" aria-labelledby="editPhotoModalLabel" aria-hidden="true">
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
                    <input type="file" class="form-control" id="profilePhoto" @change="onFileChange" accept="image/"/>
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

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      currentView: "dadesPersonals",
      usuari: {},
      menuItems: [
        { label: "Dades Personals", path: `/perfil/${this.username}-${this.userID}` },
        { label: "Articles Preferits", path: `/perfil/${this.username}-${this.userID}/preferits` },
        { label: "Les meves Comandes", path: `/perfil/${this.username}-${this.userID}/comandes` },
        { label: "Els meus Articles", path: `/perfil/${this.username}-${this.userID}/articles` },
        { label: "Les meves Valoracions", path: `/perfil/${this.username}-${this.userID}/valoracions` },
      ],
      username: "",
      userID: "",
      disableDades: true,
      toast: false,
      toastMessage: "",
      toastColor: "success",
      selectedFile: null,
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
        this.usuari.data_naixement = new Date(this.usuari.data_naixement).toISOString().split("T")[0];
        
        // Gestionamos la imagen 
        

      } catch (err) {
        console.error("Error carregant usuari:", err);
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
          }
        })
        .catch(error => {
          console.error("Error actualitzant usuari:", error);
          this.toast = true;
          this.toastMessage = "Error actualitzant usuari";
          this.toastColor = "danger";
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
  },
};
</script>

<style scoped>
.nav-link.active {
  background-color: #0d6efd;
  color: white;
}
</style>
