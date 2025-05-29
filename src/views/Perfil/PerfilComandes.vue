<template>
  <div class="container-fluid mt-4">
    <div class="row mb-4">
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

      <!-- Comandes -->
      <div class="col-md-9">
        <h1 class="mb-4">Les meves comandes</h1>
        <p class="d-none">Les comandes de l'usuari</p>
        <div v-if="comandes.length === 0" class="text-center text-muted mt-5">
          Encara no tens cap comanda.
        </div>
        <div v-else class="row gy-4">
          <div class="col-12" v-for="comanda in comandes" :key="comanda.id_comanda">
            <div
              class="order-card border rounded-4 p-4 bg-white d-flex flex-column flex-md-row align-items-md-center shadow-sm text-start">
              <img :src="comanda.foto" alt="Imatge article" class="order-img me-md-4 mb-3 mb-md-0" />
              <div class="flex-grow-1">
                <p class="mb-1 text-muted">
                  <strong>Article:</strong> {{ comanda.nom_article }}<br>
                  <strong>Preu:</strong> {{ comanda.preu_mes }}€/mes
                  &nbsp; | &nbsp;
                  <strong>Duració:</strong> {{ comanda.mesos }} mesos
                  &nbsp; | &nbsp;
                  <strong>Venedor:</strong>
                  <a @click="verPerfil(comanda.vendedor_username)" class="username-link">@{{ comanda.vendedor_username
                  }}</a>

                </p>
                <p class="mb-1">
                  <strong>Direccio: </strong> {{ comanda.direccio }}<br>
                  <strong>Estat: </strong>
                  <span class="badge bg-info" v-if="comanda.estat === 'pendent'">Pendent</span>
                  <span class="badge bg-success" v-if="comanda.estat === 'acceptada'">Acceptada</span>
                  <span class="badge bg-danger" v-if="comanda.estat === 'rebutjada'">Rebutjada</span>
                  <span class="badge bg-info" v-if="comanda.estat === 'en_devolucio'">Devolució Pendent</span>
                  <span class="badge bg-success" v-if="comanda.estat === 'devolucio_acceptada'">Devolució
                    Completada</span>
                  <span class="badge bg-success" v-if="comanda.estat === 'devolucio_rebutjada'">Devolució
                    Rebutjada</span>
                </p>
                <p class="mb-1">
                  <strong>Data Order:</strong> {{ comanda.data_order }}<br>
                  <strong v-if="comanda.data_inici">Data inici:</strong> {{ comanda.data_inici }}
                  <strong v-if="comanda.data_fi">Data fi:</strong> {{ comanda.data_fi }}
                </p>
                <p class="mb-1">
                  <strong>Preu Total</strong> {{ comanda.preu_total }}€<br>
                </p>
                <!-- Botón para tramitar devolución si estat es acceptada -->
              </div>
              <div class="ms-md-4 mt-3 mt-md-0 d-flex flex-column align-items-end">
                <div v-if="comanda.estat === 'acceptada'" class="mt-2">
                  <Button color="blue" variant="outline" @click="abrirModalDevolucio(comanda)">Tramitar
                    devolució</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Devolució -->
    <div class="modal fade" id="modalDevolucio" tabindex="-1" aria-labelledby="modalDevolucioLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="tramitarDevolucio">
            <div class="modal-header">
              <h5 class="modal-title" id="modalDevolucioLabel">Tramitar devolució</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tancar"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Imatge de l'estat del producte</label>
                <input type="file" class="form-control" accept="image/*" @change="onFileChange" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Estat del producte</label>
                <Select v-model="estatDevolucio" :options="estatOptions" placeholder="Selecciona l'estat" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Comentari</label>
                <input type="text" class="form-control" v-model="comentariDevolucio" placeholder="Escriu un comentari"
                  required />
              </div>
            </div>
            <div class="modal-footer">
              <Button color="gray" data-bs-dismiss="modal" type="button">Cancel·lar</Button>
              <Button color="blue" type="submit">Enviar devolució</Button>
            </div>
          </form>
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
import Select from "@/components/Select.vue";
import Button from "@/components/Button.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
export default {
  components: { Select, Button },
  data() {
    return {
      usuari: {},
      comandes: [],
      toast: false,
      toastMessage: "",
      toastColor: "success",
      comandaSeleccionada: null,
      estatDevolucio: "",
      comentariDevolucio: "",
      estatOptions: [
        { value: "correcte", label: "Correcte" },
        { value: "com_es_va_enviar", label: "Com es va enviar" },
        { value: "danyat", label: "Danyat" },
        { value: "altres", label: "Altres" },
      ],
      imatgeDevolucio: null,
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
  },
  mounted() {
    this.getComandes();
  },
  methods: {
    async getComandes() {
      const userID = localStorage.getItem("userID");
      this.usuari = JSON.parse(localStorage.getItem("user"));

      try {
        const response = await axiosConn.get(`/getComandesClient/${userID}`);
        if (response.status === 200) {
          this.comandes = response.data;
          this.comandes.forEach((comanda) => {
            if (comanda.data_inici) {
              const dataInici = new Date(comanda.data_inici);
              if (!isNaN(dataInici)) {
                comanda.data_inici = dataInici.toLocaleDateString("ca-ES");
              } else {
                comanda.data_inici = "Data no vàlida";
              }
            } else {
              comanda.data_inici = "";
            }
            if (comanda.data_order) {
              const dataOrder = new Date(comanda.data_order);
              if (!isNaN(dataOrder)) {
                comanda.data_order = dataOrder.toLocaleString("ca-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });
              } else {
                comanda.data_order = "Data no vàlida";
              }
            } else {
              comanda.data_order = "";
            }
            if (comanda.data_fi) {
              const dataFi = new Date(comanda.data_fi);
              if (!isNaN(dataFi)) {
                comanda.data_fi = dataFi.toLocaleDateString("ca-ES");
              } else {
                comanda.data_fi = "Data no vàlida";
              }
            } else {
              comanda.data_fi = "";
            }
          });
        } else {
          this.toastMessage = "Error al carregar les comandes";
          this.toastColor = "danger";
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        }
      } catch (error) {
        this.toastMessage = "Error al carregar les comandes";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 3000);
      }
    },
    verPerfil(username) {
      this.$router.push(`/verPerfil/${username}`);
    },
    abrirModalDevolucio(comanda) {
      this.comandaSeleccionada = comanda;
      this.estatDevolucio = "";
      this.imatgeDevolucio = null;
      const modal = new bootstrap.Modal(document.getElementById("modalDevolucio"));
      modal.show();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.imatgeDevolucio = file;
    },
    async tramitarDevolucio() {
      if (!this.imatgeDevolucio || !this.estatDevolucio) {
        this.toastMessage = "Has d'adjuntar una imatge i seleccionar un estat.";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => { this.toast = false; }, 2000);
        return;
      }
      try {

        const formData = new FormData();
        formData.append("id_comanda", this.comandaSeleccionada.id_comanda);
        formData.append("estat", this.estatDevolucio);
        formData.append("imatge", this.imatgeDevolucio);
        formData.append("mimeType", this.imatgeDevolucio.type);
        formData.append("comentari", this.comentariDevolucio);

        const res = await axiosConn.post("/tramitarDevolucio", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status !== 200) {
          this.toastMessage = "Error al tramitar la devolució";
          this.toastColor = "danger";
          this.toast = true;
          setTimeout(() => { this.toast = false; }, 2000);
          return;
        } else {
          this.toastMessage = "Devolució tramitada correctament!";
          this.toastColor = "success";
          this.toast = true;
          setTimeout(() => { this.toast = false; }, 2000);
          bootstrap.Modal.getInstance(document.getElementById("modalDevolucio")).hide();
          this.getComandes();
        }
      } catch (error) {
        this.toastMessage = "Error al tramitar la devolució";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => { this.toast = false; }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.order-card {
  transition: box-shadow 0.2s;
}

.order-card:hover {
  box-shadow: 0 4px 24px 0 rgba(0, 191, 166, 0.13);
}

.order-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  background: #f2f2f2;
  border: 1px solid #e6e6e6;
}

.btn-outline-primary {
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.nav-link.active {
  background-color: #578FCA;
  color: white;
}

.nav-link {
  color: #578FCA;
}
</style>
