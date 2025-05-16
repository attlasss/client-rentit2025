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

      <!-- Comandes -->
      <div class="col-md-9">
        <h1 class="mb-4">Les meves ventes</h1>
        <div v-if="ventes.length === 0" class="text-center text-muted mt-5">
          Encara no tens cap venta.
        </div>
        <div v-else class="row gy-4">
          <div
            class="col-12"
            v-for="venta in ventes"
            :key="venta.id_venta"
          >
            <div class="order-card border rounded-4 p-4 bg-white d-flex flex-column flex-md-row align-items-md-center shadow-sm text-start">
              <img
                :src="venta.foto"
                alt="Imatge article"
                class="order-img me-md-4 mb-3 mb-md-0"
              />
              <div class="flex-grow-1">
                <p class="mb-1 text-muted">
                  <strong>Preu:</strong> {{ venta.preu_mes }}€/mes
                  &nbsp; | &nbsp;
                  <strong>Duració:</strong> {{ venta.mesos }} mesos
                </p>
                <p class="mb-1">
                  <strong>Estat: </strong>
                  <span class="badge bg-success" v-if="venta.estat === 'activa'">Activa</span>
                  <span class="badge bg-secondary" v-else> {{ venta.estat }}</span>
                </p>
                <p class="mb-1">
                  <strong>Data inici:</strong> {{ venta.data_inici }}<br>
                  <strong>Data fi:</strong> {{ venta.data_fi }}
                </p>
                <p class="mb-1">
                  <strong>Preu Total</strong> {{ venta.preu_total }}<br>
                </p>

              </div>
              <div class="ms-md-4 mt-3 mt-md-0 d-flex flex-column align-items-end">
                <Button
                  color="blue" variant="outline"
                  :to="`/comanda/${venta.id_venta}`"
                >
                  Veure més
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="toast"
        class="toast-message text-white px-3 py-2 rounded shadow position-fixed bottom-0 end-0 m-4"
        :class="toastColor === 'success' ? 'bg-success' : 'bg-danger'"
      >
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
import axiosConn from "@/axios/axios";
import Button from "@/components/Button.vue";
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
      try {
        const res = await axiosConn.get(`/infoUsuario/${userID}`);
        this.usuari = res.data.usuari;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }

      try {
        // Suponiendo que el backend devuelve las ventes con el artículo relacionado
        const response = await axiosConn.get(`/getVentesClient/${userID}`);
        if (response.status === 200) {
          this.ventes = response.data;
          // Formatear la fecha
          this.ventes.forEach((venta) => {
            const dataInici = new Date(venta.data_inici);
            const dataOrder = new Date(venta.data_order);
            venta.data_inici = dataInici.toLocaleDateString("ca-ES");
            venta.data_order = dataOrder.toLocaleDateString("ca-ES");
            // venta.data_fi = dataFi.toLocaleDateString("ca-ES");
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
  },
};
</script>

<style scoped>
.order-card {
  transition: box-shadow 0.2s;
}
.order-card:hover {
  box-shadow: 0 4px 24px 0 rgba(0,191,166,0.13);
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
