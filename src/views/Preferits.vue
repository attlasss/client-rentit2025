<template>
  <div class="container-fluid mt-4">
    <div class="row">
      
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

      const formData = new FormData();
      formData.append("foto_perfil", this.selectedFile);
      formData.append("user_id", this.usuari.ID);

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
