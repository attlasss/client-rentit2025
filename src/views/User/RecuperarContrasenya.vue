<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6 col-lg-4">
                <div class="form-container p-4">
                    <h1 class="text-center mb-4">Recuperar Contrasenya</h1>
                    <form @submit.prevent="enviarCorreuRecuperacio" v-if="!codigoEnviado && !codigoVerificado"
                        class="d-flex flex-column gap-3">
                        <div>
                            <label class="form-label">Correu electrònic</label>
                            <Input v-model="email" type="email" placeholder="Introdueix el teu correu" required />
                            <span v-if="emailError" class="text-danger">{{ emailError }}</span>
                        </div>
                        <div class="text-center mt-3">
                            <Button color="blue" variant="fill" type="submit">Enviar correu de recuperació</Button>
                        </div>
                    </form>

                    <form @submit.prevent="verificarCodigo" v-if="codigoEnviado && !codigoVerificado"
                        class="d-flex flex-column gap-3">
                        <div>
                            <label class="form-label">Codi de confirmació</label>
                            <Input v-model="codigo" type="text" placeholder="Introdueix el codi de confirmació"
                                required />
                        </div>
                        <div class="text-center mt-3">
                            <Button color="blue" variant="fill" type="submit">Verificar codi</Button>
                        </div>
                    </form>

                    <form @submit.prevent="actualitzarContrasenya" v-if="codigoVerificado"
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
            email: "",
            emailError: "",
            codigo: "",
            novaContrasenya: "",
            confirmaContrasenya: "",
            toast: false,
            toastMessage: "",
            toastColor: "success",
            codigoEnviado: false,
            codigoVerificado: false,
        };
    },
    methods: {
        async enviarCorreuRecuperacio() {
            try {
                const response = await axiosConn.post("/recuperarContrasenya", { email: this.email });
                if (response.status === 200) {
                    this.emailError = "";
                    this.toastMessage = "Correu enviat amb èxit!";
                    this.toastColor = "success";
                    this.toast = true;
                    this.codigoEnviado = true;
                } else {
                    this.toastMessage = "Error al enviar el correu.";
                    this.toastColor = "error";
                    this.toast = true;
                }

            } catch (error) {
                if (error.response && error.response.status === 404) {

                    this.emailError = "Correu electrònic no vàlid.";
                } else {
                    this.emailError = "";
                    this.toastMessage = "No s'ha pogut enviar el correu.";
                    this.toastColor = "error";
                    this.toast = true;
                }
            }
        },
        async verificarCodigo() {
            await axiosConn.post("/comprobarCodi", { email: this.email, codi: this.codigo })
                .then((response) => {
                    if (response.status === 200) {
                        this.codigoVerificado = true;
                        this.toastMessage = "Codi verificat amb èxit!";
                        this.toastColor = "success";
                        this.toast = true;
                    } else {
                        this.toastMessage = "Codi incorrecte.";
                        this.toastColor = "error";
                        this.toast = true;
                    }
                })
                .catch((error) => {
                    console.error("Error al verificar el codi:", error);
                    this.toastMessage = "Error al verificar el codi.";
                    this.toastColor = "error";
                    this.toast = true;
                });

        },
        async actualitzarContrasenya() {
            if (this.novaContrasenya !== this.confirmaContrasenya) {
                this.toastMessage = "Les contrasenyes no coincideixen.";
                this.toastColor = "danger";
                this.toast = true;
                setTimeout(() => {
                    this.toast = false;
                }, 2500);
                return;
            }

            const password = this.novaContrasenya;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(password)) {
                this.toastMessage = "La contrasenya ha de tenir almenys 8 caràcters, una majúscula, una minúscula i un número.";
                this.toastColor = "danger";
                this.toast = true;
                setTimeout(() => { this.toast = false; }, 3000);
                return;
            }

            try {

                const res = await axiosConn.post("/actualitzarContrasenya", {
                    email: this.email,
                    contrasenya: this.novaContrasenya,
                });
                if (res.status === 200) {
                    this.toastMessage = "Contrasenya actualitzada amb èxit!";
                    this.toastColor = "success";
                    this.toast = true;
                    setTimeout(() => {
                        this.$router.push("/login");
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
