<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6 col-lg-4">
                <div class="form-container p-4">
                    <h1 class="text-center mb-4">Canviar Contrasenya</h1>
                    <form @submit.prevent="verificarAntigaContrasenya" class="d-flex flex-column gap-3" v-if="!isAntigaContrasenyaCorrecta">
                        <div>
                            <label class="form-label">Contrasenya antiga</label>
                            <Input v-model="antigaContrasenya" type="password"
                                placeholder="Introdueix la contrasenya antiga" required />
                        </div>
                        <div class="text-center mt-3">
                            <Button color="blue" variant="fill" type="submit">Comprovar contrasenya</Button>
                        </div>
                    </form>

                    <!-- Formulario 2: Nova contrasenya (mostrat només si la contrasenya antiga és correcta) -->
                    <form v-if="isAntigaContrasenyaCorrecta" @submit.prevent="actualitzarContrasenya"
                        class="d-flex flex-column gap-3">
                        <div>
                            <label class="form-label">Nova contrasenya</label>
                            <Input v-model="novaContrasenya" type="password"
                                placeholder="Introdueix la nova contrasenya" required />
                        </div>
                        <div>
                            <label class="form-label">Confirma la nova contrasenya</label>
                            <Input v-model="confirmaContrasenya" type="password"
                                placeholder="Confirma la nova contrasenya" required />
                        </div>
                        <div class="text-center mt-3">
                            <Button color="blue" variant="fill" type="submit">Actualitzar contrasenya</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Toast Message -->
        <transition name="fade">
            <div v-if="toast"
                class="toast-message text-white px-3 py-2 rounded shadow position-fixed bottom-0 end-0 m-4"
                :class="toastColor === 'success' ? 'bg-success' : 'bg-danger'">
                {{ toastMessage }}
            </div>
        </transition>
    </div>
</template>


<script>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import axiosConn from "@/axios/axios";

export default {
    components: {
        Button,
        Input,
    },
    data() {
        return {
            antigaContrasenya: "",
            novaContrasenya: "",
            confirmaContrasenya: "",
            toast: false,
            toastMessage: "",
            toastColor: "success",
            isAntigaContrasenyaCorrecta: false,
            usuari: {},
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            this.usuari = JSON.parse(localStorage.getItem("user"));
        },
        // Función para verificar la contrasenya antiga
        async verificarAntigaContrasenya() {
            // Enviar petición al backend para verificar si la contrasenya antigua es correcta
            try {
                const res = await axiosConn.post("/checkContrasenyaAntiga", {
                    passwordAntiga: this.antigaContrasenya,
                    id: this.usuari.ID, // Suponiendo que tienes el userId en el estado global
                });

                if (res.status === 200 && res.data.success) {
                    this.isAntigaContrasenyaCorrecta = true;  // La contraseña antigua es correcta
                    this.toastMessage = "Contrasenya antiga correcta. Ara pots introduir la nova contrasenya.";
                    this.toastColor = "success";
                    this.toast = true;
                    setTimeout(() => {
                        this.toast = false;
                    }, 2500);
                } else {
                    this.isAntigaContrasenyaCorrecta = false;  // La contraseña antigua es incorrecta
                    this.toastMessage = "La contrasenya antiga no és correcta.";
                    this.toastColor = "danger";
                    this.toast = true;
                    setTimeout(() => {
                        this.toast = false;
                    }, 2500);
                }
            } catch (error) {
                console.error("Error al verificar la contrasenya antiga:", error);
                this.toastMessage = "Hi ha hagut un error en la verificació de la contrasenya.";
                this.toastColor = "danger";
                this.toast = true;
                setTimeout(() => {
                    this.toast = false;
                }, 2500);
            }
        },

        // Función para actualizar la contrasenya
        async actualitzarContrasenya() {
            // Validar si les contrasenyes són iguals
            if (this.novaContrasenya !== this.confirmaContrasenya) {
                this.toastMessage = "Les contrasenyes no coincideixen.";
                this.toastColor = "danger";
                this.toast = true;
                setTimeout(() => {
                    this.toast = false;
                }, 2500);
                return;
            }

            // Enviar la petició per actualitzar la contrasenya
            try {
                const res = await axiosConn.post("/actualitzarContrasenya", {
                    email: this.usuari.email,
                    contrasenya: this.novaContrasenya,
                });

                if (res.status === 200) {
                    this.toastMessage = "Contrasenya actualitzada amb èxit!";
                    this.toastColor = "success";
                    this.toast = true;
                    setTimeout(() => {
                        this.$router.push(`/perfil/${this.usuari.username}`); // Redirige a la página del perfil u otra después de actualizar
                    }, 2500);
                } else {
                    this.toastMessage = "No s'ha pogut actualitzar la contrasenya.";
                    this.toastColor = "danger";
                    this.toast = true;
                }
            } catch (err) {
                console.error("Error al actualitzar la contrasenya:", err);
                this.toastMessage = "Hi ha hagut un error inesperat.";
                this.toastColor = "danger";
                this.toast = true;
            } finally {
                setTimeout(() => {
                    this.toast = false;
                }, 2500);
            }
        },
    },
};
</script>


<style scoped>
.form-container {
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-label {
    text-align: left;
    display: block;
    font-weight: 600;
}
</style>
