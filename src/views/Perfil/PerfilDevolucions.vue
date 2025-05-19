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
                  <strong>Preu:</strong> {{ comanda.preu_mes }}€/mes
                  &nbsp; | &nbsp;
                  <strong>Duració:</strong> {{ comanda.mesos }} mesos
                  &nbsp; | &nbsp;
                  <strong>Venedor:</strong>
                  <a @click="verPerfil(comanda.vendedor_username)" class="username-link">@{{ comanda.vendedor_username
                    }}</a>

                </p>
                <p class="mb-1">
                  <strong>Estat: </strong>
                  <span class="badge bg-info" v-if="comanda.estat === 'pendent'">Pendent</span>
                  <span class="badge bg-success" v-if="comanda.estat === 'acceptada'">Acceptada</span>
                  <span class="badge bg-danger" v-if="comanda.estat === 'rebutjada'">Rebutjada</span>
                </p>
                <p class="mb-1">
                  <strong>Data Order:</strong> {{ comanda.data_order }}<br>
                  <span>
                    <strong v-if="comanda.data_inici">Data inici:</strong> {{ comanda.data_inici }}
                    <strong v-if="comanda.data_fi">Data fi:</strong> {{ comanda.data_fi }}
                  </span>
                </p>
                <p class="mb-1">
                  <strong>Preu Total</strong> {{ comanda.preu_total }}€<br>
                </p>

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
export default {
  data() {
    return {
      usuari: {},
      comandes: [],
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
    this.getComandes();
  },
  methods: {
    async getComandes() {
      const userID = localStorage.getItem("userID");
      this.usuari = JSON.parse(localStorage.getItem("user"));

      try {
        // Suponiendo que el backend devuelve las comandes con el artículo relacionado
        const response = await axiosConn.get(`/getComandesClient/${userID}`);
        if (response.status === 200) {
          this.comandes = response.data;
          // Formatear la fecha
          this.comandes.forEach((comanda) => {
            // Verificamos si 'data_inici' no está vacío o es una fecha válida
            if (comanda.data_inici) {
              const dataInici = new Date(comanda.data_inici);
              // Verificamos si la fecha es válida
              if (!isNaN(dataInici)) {
                comanda.data_inici = dataInici.toLocaleDateString("ca-ES");
              } else {
                comanda.data_inici = "Data no vàlida"; // O cualquier valor predeterminado que prefieras
              }
            } else {
              comanda.data_inici = "";
            }

            // Hacemos lo mismo con 'data_order'
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
