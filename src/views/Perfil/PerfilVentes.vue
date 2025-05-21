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

      <!-- Ventes -->
      <div class="col-md-9">
        <h1 class="mb-4">Les meves ventes</h1>
        <div v-if="ventes.length === 0" class="text-center text-muted mt-5">
          Encara no tens cap venta.
        </div>
        <div v-else class="row gy-4">
          <div class="col-12" v-for="venta in ventes" :key="venta.id_venta">
            <div
              class="order-card border rounded-4 p-4 bg-white d-flex flex-column flex-md-row align-items-md-center shadow-sm text-start">
              <img :src="venta.foto" alt="Imatge article" class="order-img me-md-4 mb-3 mb-md-0" />
              <div class="flex-grow-1">
                <p class="mb-1 text-muted">
                  <strong>Preu:</strong> {{ venta.preu_mes }}€/mes
                  &nbsp; | &nbsp;
                  <strong>Duració:</strong> {{ venta.mesos }} mesos
                  &nbsp; | &nbsp;
                  <strong>Comprador:</strong> @{{ venta.comprador_username }}
                </p>
                <p class="mb-1">
                  <strong>Estat: </strong>
                  <span class="badge bg-info" v-if="venta.estat === 'pendent'">Pendent</span>
                  <span class="badge bg-success" v-if="venta.estat === 'acceptada'">Acceptada</span>
                  <span class="badge bg-danger" v-if="venta.estat === 'rebutjada'">Rebutjada</span>
                  <span class="badge bg-info" v-if="venta.estat === 'en_devolucio'">Pendent d'aprobar devolució</span>
                  <span class="badge bg-success" v-if="venta.estat === 'devolucio_acceptada'">Devolució Completada</span>
                  <span class="badge bg-success" v-if="venta.estat === 'devolucio_rebutjada'">Devolució Rebutjada</span>
                </p>
                <p class="mb-1">
                  <strong>Data Order:</strong> {{ venta.data_order }}<br>
                  <strong>Data inici:</strong> {{ venta.data_inici }}<br>
                  <strong>Data fi:</strong> {{ venta.data_fi }}
                </p>
                <p class="mb-1">
                  <strong>Preu Total</strong> {{ venta.preu_total }}€<br>
                </p>
              </div>
              <div class="ms-md-4 mt-3 mt-md-0 d-flex flex-column align-items-end">
                <template v-if="venta.estat === 'pendent'">
                  <Button color="blue" variant="outline" @click="abrirModalGestionar(venta)">
                    Gestionar venda
                  </Button>
                </template>
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

    <!-- Modal de gestionar venda -->
    <div class="modal fade" id="modalGestionar" tabindex="-1" aria-labelledby="modalGestionarLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalGestionarLabel">Gestionar venda</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tancar"></button>
          </div>
          <div class="modal-body">
            <p>Vols aprovar o rebutjar aquesta venda?</p>
            <div class="d-flex gap-2">
              <Button color="success" variant="fill" @click="gestionarVenta('acceptada')">Aprovar</Button>
              <Button color="danger" variant="outline" @click="gestionarVenta('rebutjada')">Rebutjar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConn from "@/axios/axios";
import Button from "@/components/Button.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  components: {
    Button,
  },
  data() {
    return {
      usuari: {},
      ventes: [],
      toast: false,
      toastMessage: "",
      toastColor: "success",
      ventaSeleccionada: null,
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
    this.getVentes();
  },
  methods: {
    async getVentes() {
      const userID = localStorage.getItem("userID");
      this.usuari = JSON.parse(localStorage.getItem("user"));

      try {
        // Suponiendo que el backend devuelve las ventes con el artículo relacionado
        const res = await axiosConn.get(`/getVentesClient/${userID}`);

        if (res.status === 200) {
          this.ventes = res.data;

          // Formatear la fecha
          this.ventes.forEach((venta) => {
            // Verificamos si 'data_inici' no está vacío o es una fecha válida
            if (venta.data_inici) {
              const dataInici = new Date(venta.data_inici);
              if (!isNaN(dataInici)) {
                venta.data_inici = dataInici.toLocaleDateString("ca-ES");
              } else {
                venta.data_inici = "Data no vàlida"; // O valor predeterminado
              }
            } else {
              venta.data_inici = "";
            }

            if (venta.data_order) {
              const dataOrder = new Date(venta.data_order);
              if (!isNaN(dataOrder)) {
                // Formato dd:mm:yyyy hh:mm
                venta.data_order = dataOrder.toLocaleString("ca-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, 
                });
              } else {
                venta.data_order = "Data no vàlida";
              }
            } else {
              venta.data_order = "";
            }


            // Hacemos lo mismo con 'data_fi'
            if (venta.data_fi) {
              const dataFi = new Date(venta.data_fi);
              if (!isNaN(dataFi)) {
                venta.data_fi = dataFi.toLocaleDateString("ca-ES");
              } else {
                venta.data_fi = "Data no vàlida";
              }
            } else {
              venta.data_fi = "";
            }
          });
        } else {
          this.toastMessage = "Error al carregar les ventes";
          this.toastColor = "danger";
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        }
      } catch (error) {
        this.toastMessage = "Error al carregar les ventes";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 3000);
      }
    },
    abrirModalGestionar(venta) {
      this.ventaSeleccionada = venta;
      const modal = new bootstrap.Modal(document.getElementById("modalGestionar"));
      modal.show();
    },
    async gestionarVenta(accion) {
      const ventaID = this.ventaSeleccionada.id_comanda;

      try {
        const response = await axiosConn.post(`/gestionarVenta`, {
          id_comanda: ventaID,
          estat: accion,
        });

        if (response.status === 200) {
          this.toastMessage = `Venda ${accion} amb èxit`;
          this.toastColor = "success";
          this.toast = true;
          const modal = bootstrap.Modal.getInstance(document.getElementById("modalGestionar"));
          modal.hide();
          this.ventaSeleccionada = null; // Resetear la venta seleccionada
          this.getVentes();
          setTimeout(() => {
            this.toast = false;
             // Actualizar la lista de ventes
          }, 3000);
        } else {
          this.toastMessage = "Error al gestionar la venda";
          this.toastColor = "danger";
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        }
      } catch (error) {
        console.error("Error al gestionar la venda:", error);
        this.toastMessage = "Error al gestionar la venda";
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 3000);
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
