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
          <div class="col-4">
            <div class="text-center mb-4">
              <img :src="usuari.foto_perfil || 'https://via.placeholder.com/150'" alt="Foto de perfil"
                class="rounded-circle" />
            </div>
            <!-- Boton editar foto -->
            <Button class="w-50 mt-5" color="blue" variant="outline" @click="openModal">Editar Foto</Button>
          </div>
          <div class="col-8">
            <h2 class="mb-4">{{ usuari.nom }} {{ usuari.cognoms }}</h2>
            <!-- Valoraciones -->
            <p><strong>Valoracions:</strong></p>
            <ul class="list-unstyled">
              <li v-for="(valoracio, index) in usuari.valoracions" :key="index">
                {{ valoracio.titol }}: {{ valoracio.puntuacio }} estrelles
              </li>
            </ul>
          </div>
          <div class="row text-left mt-5 border-top pt-3 p-5">
            <h2>Dades Personals</h2>
            <!-- Formulario con los datos del usuario -->
            <form @submit.prevent="updateUser" class="d-flex flex-column gap-3 mb-5">
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
                  <Button class="w-100" color="danger" variant="" v-if="disableDades"
                    @click="modificarDades">Desactivar Compte</Button>
                </div>
                <div class="col-12 col-md-6 mb-2 mb-md-0">
                    <Button class="w-100" color="blue" variant="outline" v-if="disableDades"
                    @click="modificarDades">Modificar Dades</Button>
                  <Button class="w-100" color="blue" variant="fill" type="submit" v-if="!disableDades"
                    @click="guardarDades">
                    Guardar Dades
                  </Button>
                </div>
              </div>
            </form>

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
                    <input type="file" class="form-control" id="profilePhoto" @change="onFileChange" accept="image/*"/>
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

      const formData = new FormData();
      formData.append("foto_perfil", this.selectedFile);
      formData.append("user_id", this.usuari.ID);

      try {
        const res = await axiosConn.post("/updatePhoto", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status === 200) {
          this.toastMessage = "Foto actualitzada amb èxit!";
          this.toastColor = "success";
          this.toast = true;
          this.usuari.foto_perfil = res.data.foto_perfil;
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
  },
};
</script>

<style scoped>
.nav-link.active {
  background-color: #0d6efd;
  color: white;
}
</style>
