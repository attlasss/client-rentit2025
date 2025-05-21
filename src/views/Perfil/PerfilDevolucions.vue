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

      <div class="col-md-9">
        <h1 class="mb-4">Devolucions</h1>
        <!-- Tabs -->
        <ul class="nav nav-tabs mb-4">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'propies' }" @click="activeTab = 'propies'">Les meves
              devolucions</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'gestionar' }" @click="activeTab = 'gestionar'">Devolucions a gestionar</a>
          </li>
        </ul>

        <!-- Les meves devolucions -->
        <div v-if="activeTab === 'propies'">
          <div v-if="devolucionsPropies.length === 0" class="text-center text-muted mt-5">
            Encara no tens cap devolució activa.
          </div>
          <div v-else class="row gy-4">
            <div class="col-12" v-for="devolucio in devolucionsPropies" :key="devolucio.id_devolucio">
              <div
                class="order-card border rounded-4 p-4 bg-white d-flex flex-column flex-md-row align-items-md-center shadow-sm text-start">
                <img :src="devolucio.foto_article" alt="Imatge article" class="order-img me-md-4 mb-3 mb-md-0" />
                <div class="flex-grow-1">
                  <p class="mb-1 text-muted">
                    <strong>Article:</strong> {{ devolucio.nom }}<br>
                    <strong>Data:</strong> {{ devolucio.data }} <br>
                    <strong>Estat Devolució:</strong>
                    <span class="badge bg-info ms-2" v-if="devolucio.estat === 'en_devolucio'">Pendent de gestionar
                      devolució</span>
                    <span class="badge bg-success ms-2" v-if="devolucio.estat === 'devolucio_acceptada'">Devolució
                      Acceptada</span>
                      <span class="badge bg-warning ms-2" v-if="devolucio.estat === 'devolucio_rebutjada'">Devolució
                      Rebutjada</span>
                  </p>
                  <Button color="blue" variant="outline" @click="abrirModalImatge(devolucio)">Veure imatge i estat
                    devolució</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Imatge Devolució -->
        <div class="modal fade" ref="modalImatge" tabindex="-1" aria-labelledby="modalImatgeDevolucioLabel"
          aria-hidden="true" v-show="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalImatgeDevolucioLabel">Detall de la devolució</h5>
                <button type="button" class="btn-close" @click="tancarModal" aria-label="Tancar"></button>
              </div>
              <div class="modal-body text-center" v-if="devolucioSeleccionada">
                <h6>Detalls Devolució</h6>
                <img v-if="devolucioSeleccionada?.devolucio_foto" :src="devolucioSeleccionada.devolucio_foto"
                  alt="Imatge devolució" class="img-thumbnail mb-3" style="max-width: 300px;">
                <div class="mb-2">
                  <strong>Estat enviat:</strong>
                    <span v-if="devolucioSeleccionada.estat_article === 'correcte'">Correcte</span>
                    <span v-if="devolucioSeleccionada.estat_article === 'com_es_va_enviar'">Com
                      es va enviar</span>
                    <span v-if="devolucioSeleccionada.estat_article === 'danyat'">Danyat</span>
                    <span v-if="devolucioSeleccionada.estat_article === 'altres'">Altres</span>
                  <p>
                    <strong>Comentari:</strong>
                    <span>{{ devolucioSeleccionada.comentari }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Gestionar Devolució -->
        <div class="modal fade" ref="modalGestionar" tabindex="-1" aria-labelledby="modalGestionarDevolucioLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalGestionarDevolucioLabel">Gestionar devolució</h5>
                <button type="button" class="btn-close" @click="tancarModalGestionar" aria-label="Tancar"></button>
              </div>
              <div class="modal-body text-center" v-if="devolucioGestionarSeleccionada">
                <h6>Detalls Devolució</h6>
                <img v-if="devolucioGestionarSeleccionada?.devolucio_foto"
                  :src="devolucioGestionarSeleccionada.devolucio_foto"
                  alt="Imatge devolució"
                  class="img-thumbnail mb-3"
                  style="max-width: 300px;">
                <div class="mb-2">
                  <strong>Estat enviat:</strong>
                  <p>
                    <span v-if="devolucioGestionarSeleccionada.estat_article === 'correcte'">Correcte</span>
                    <span v-if="devolucioGestionarSeleccionada.estat_article === 'com_es_va_enviar'">Com es va enviar</span>
                    <span v-if="devolucioGestionarSeleccionada.estat_article === 'danyat'">Danyat</span>
                    <span v-if="devolucioGestionarSeleccionada.estat_article === 'altres'">Altres</span>
                  </p>
                  <strong>Comentari:</strong>
                    <span>{{ devolucioGestionarSeleccionada.comentari }}</span>
                </div>
              </div>
              <div class="modal-footer">
                <Button color="success" variant="fill" @click="gestionarDevolucio('acceptada', devolucioGestionarSeleccionada.id_devolucio)">Acceptar</Button>
                <Button color="danger" variant="outline" @click="gestionarDevolucio('denegada', devolucioGestionarSeleccionada.id_devolucio)">Denegar</Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Devolucions per gestionar -->
        <div v-if="activeTab === 'gestionar'">
          <div v-if="devolucionsgestionar.length === 0" class="text-center text-muted mt-5">
            No tens devolucions pendents d'gestionar.
          </div>
          <div v-else class="row gy-4">
            <div class="col-12" v-for="devolucio in devolucionsgestionar" :key="devolucio.id_devolucio">
              <div
                class="order-card border rounded-4 p-4 bg-white d-flex flex-column flex-md-row align-items-md-center shadow-sm text-start">
                <img :src="devolucio.foto_article" alt="Imatge article" class="order-img me-md-4 mb-3 mb-md-0" />
                <div class="flex-grow-1">
                  <p class="mb-1 text-muted">
                    <strong>Article:</strong> {{ devolucio.nom }}<br>
                    <strong>Estat:</strong> {{ devolucio.estat_devolucio }}<br>
                  </p>
                  <div class="mt-2" v-if="devolucio.estat === 'en_devolucio'">
                    <Button color="blue" variant="outline" @click="modalGestionarDevolucio(devolucio)">Gestionar
                      devolució</Button>
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
    </div>
  </div>
</template>

<script>
import axiosConn from "@/axios/axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import Button from "@/components/Button.vue";

export default {
  components: {
    Button,
  },
  data() {
    return {
      activeTab: "propies",
      usuari: {},
      devolucionsPropies: [],
      devolucionsgestionar: [],
      devolucioSeleccionada: null,
      devolucioGestionarSeleccionada: null,
      modalInstance: null,
      modalGestionarInstance: null,
      toast: false,
      toastMessage: "",
      toastColor: "success",
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
    this.usuari = JSON.parse(localStorage.getItem("user"));
    this.getDevolucions();
    this.getDevolucionsgestionar();
  },
  methods: {
    async getDevolucions() {
      const userID = localStorage.getItem("userID");
      try {
        const res = await axiosConn.get(`/getDevolucionsMevesCompra/${userID}`);
        this.devolucionsPropies = res.data;

        this.devolucionsPropies.forEach((devolucio) => {
          const dataOrder = new Date(devolucio.data);
          if (!isNaN(dataOrder)) {
            devolucio.data = dataOrder.toLocaleString("ca-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
          } else {
            devolucio.data = "Data no vàlida";
          }
        });
      } catch (err) {
        console.error(err);
      }

    },
    async getDevolucionsgestionar() {
      const userID = localStorage.getItem("userID");
      try {
        const res = await axiosConn.get(`/getDevolucionsMevesVenta/${userID}`);
        this.devolucionsgestionar = res.data;
      } catch (e) {
        this.devolucionsgestionar = [];
      }
    },
    async gestionarDevolucio(estat,id_devolucio) {
      try {
        await axiosConn.post("/gestionarDevolucio", { id_devolucio: id_devolucio, estat: estat });
        this.toastMessage = "Devolució gestionada correctament!";
        this.toastColor = "success";
        this.toast = true;
        this.getDevolucionsgestionar();
        this.getDevolucions();
        this.tancarModalGestionar();
        setTimeout(() => { this.toast = false; }, 2000);
      } catch (e) {
        this.toastMessage = "Error gestionant la devolució";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => { this.toast = false; }, 2000);
      }
    },
    abrirModalImatge(devolucio) {
      this.devolucioSeleccionada = devolucio;
      this.modalInstance = new bootstrap.Modal(this.$refs.modalImatge);
      this.modalInstance.show();
    },
    modalGestionarDevolucio(devolucio) {
      this.devolucioGestionarSeleccionada = devolucio;
      this.modalGestionarInstance = new bootstrap.Modal(this.$refs.modalGestionar);
      this.modalGestionarInstance.show();
    },
    tancarModal() {
      if (this.modalInstance) this.modalInstance.hide();
    },
    tancarModalGestionar() {
      if (this.modalGestionarInstance) this.modalGestionarInstance.hide();
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

.nav-link.active {
  background-color: #578FCA;
  color: white;
}

.nav-link {
  color: #578FCA;
}

.toast-message {
  z-index: 1056;
}
</style>
