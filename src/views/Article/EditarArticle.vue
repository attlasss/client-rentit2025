<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-8 col-xl-7">
                <h1 class="text-center mb-5">Editar Article</h1>
                <form @submit.prevent="editarArticle" class="d-flex flex-column gap-3">
                    <div>
                        <label class="form-label" for="nom">Nom del article</label>
                        <Input v-model="article.nom" id="nom" placeholder="Introdueix el nom" required />
                    </div>

                    <div>
                        <label class="form-label" for="descripcio">Descripció</label>
                        <Input v-model="article.descripcio" id="descripcio" placeholder="Introdueix una descripció" required />
                    </div>

                    <div>
                        <label class="form-label" for="id_categoria">Categoría</label>
                        <!-- Select de las categorias -->
                        <Select v-model="article.id_categoria"
                            :options="categories.map(category => ({ value: category.id_categoria, label: category.nom }))"
                            placeholder="Selecciona una categoria" required />
                    </div>

                    <div>
                        <label class="form-label" for="preu">Preu per mes</label>
                        <Input v-model="article.preu" id="preu" type="number" min="0" placeholder="Ex: 15€" required />

                    </div>

                    <div>
                        <label class="form-label" for="mesos">Mesos</label>
                        <Select v-model="article.mesos"
                            :options="Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `${i + 1} mesos` }))"
                            placeholder="Selecciona una durada" required />

                    </div>

                    <div>
                        <label class="form-label" for="imatge">Imatge</label>
                        <div class="input-container">
                            <div class="image-upload">
                                <input type="file" class="d-none" id="image-upload" @change="previewImage"
                                    accept="image/*" />
                                <label for="image-upload" class="image-upload-label">
                                    <div class="image-upload-box">
                                        <img v-if="selectedImatge" :src="selectedImatge"
                                            alt="Previsualització de la imatge" class="image-preview" />
                                        <span v-else>Fes clic per afegir una imatge</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="text-center mt-3">
                        <Button class="w-100 w-md-auto" color="blue" variant="fill" type="submit">
                            Editar article
                        </Button> <br>
                        <Button class="w-100 w-md-auto" color="danger" variant="outline" type="button"
                            @click="abrirModalBorrar">
                            Borrar article
                        </Button>
                    </div>

                </form>
            </div>
        </div>

        <!-- Modal de confirmación para borrar -->
        <div class="modal fade" id="modalBorrar" tabindex="-1" aria-labelledby="modalBorrarLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalBorrarLabel">Confirmar esborrat</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tancar"></button>
                    </div>
                    <div class="modal-body">
                        Estàs segur que vols esborrar aquest article? Aquesta acció no es pot desfer.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel·lar</button>
                        <button type="button" class="btn btn-danger" @click="borrarArticle">Esborrar</button>
                    </div>
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
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Select from "@/components/Select.vue";
import axiosConn from "@/axios/axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
    components: {
        Input,
        Button,
        Select,
    },
    data() {
        return {
            article: {
                nom: "",
                descripcio: "",
                id_categoria: "",
                preu: "",
                mesos: "",
                foto: "",
            },
            categories: [],
            toast: false,
            toastMessage: "",
            toastColor: "success",
            selectedImatge: null,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async editarArticle() {
            if (!this.article.nom || !this.article.descripcio || !this.article.id_categoria || !this.article.preu
                || !this.article.mesos || !this.selectedImatge) {
                this.toastMessage = "Si us plau, ompliu tots els camps.";
                this.toastColor = "danger";
                this.toast = true;
                return;
            }


            const userID = localStorage.getItem("userID");
            let user = localStorage.getItem("user");
            if (user) {
                user = JSON.parse(user);
            }
            let imageFile;
            let mimeType;
            const foto = this.article.foto;

            if (typeof foto === "string" && foto.startsWith("data:image/")) {
                // Es una imagen en base64
                mimeType = foto.match(/data:(image\/[^;]+);base64,/)[1];
                const imageBlob = this.base64ToBlob(foto, mimeType);
                imageFile = new File([imageBlob], "foto.jpg", { type: mimeType });
            } else if (foto instanceof File) {
                // Es un archivo ya cargado por el usuario (input type="file")
                imageFile = foto;
                mimeType = foto.type;
            } else {
                console.error("Formato de imagen no válido");
                return;
            }

            // Crear FormData
            const formData = new FormData();
            formData.append("foto_article", imageFile);
            formData.append("mimetype", mimeType);
            formData.append("user_id", userID);
            formData.append("articleData", JSON.stringify(this.article));

            try {
                const res = await axiosConn.post("/editarArticle", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (res.status === 200) {
                    this.toastMessage = "Article editat amb èxit!";
                    this.toastColor = "success";
                    this.toast = true;
                    this.$router.push({ name: "PerfilArticles", params: { username: user.username } });

                    setTimeout(() => {
                        this.toast = false;
                    }, 2000);
                } else {
                    this.toastMessage = "Error creant l'article.";
                    this.toastColor = "danger";
                    this.toast = true;

                    setTimeout(() => {
                        this.toast = false;
                    }, 2000);
                }
            } catch (err) {
                console.error("Error al crear article:", err);
                // this.toastMessage = "Error creant l'article.";
                // this.toastColor = "danger";
                // this.toast = true;
            }
        },
        async borrarArticle() {
            try {
                let user = localStorage.getItem("user");
                if (user) {
                    user = JSON.parse(user);
                }

                const res = await axiosConn.post("/desactivarArticle", {
                    id_article: this.article.id_article,
                });
                if (res.status === 200) {
                    this.toastMessage = "Article esborrat amb èxit!";
                    this.toastColor = "success";
                    this.toast = true;
                    setTimeout(() => {
                        this.toast = false;
                        this.$router.push({ name: "PerfilArticles", params: { username: user.username } });
                    }, 1500);
                } else {
                    this.toastMessage = "Error esborrant l'article.";
                    this.toastColor = "danger";
                    this.toast = true;
                    setTimeout(() => {
                        this.toast = false;
                    }, 2000);
                }
            } catch (err) {
                this.toastMessage = "Error esborrant l'article.";
                this.toastColor = "danger";
                this.toast = true;
                setTimeout(() => {
                    this.toast = false;
                }, 2000);
            }
            // Cerrar el modal
            const modal = bootstrap.Modal.getInstance(document.getElementById("modalBorrar"));
            if (modal) modal.hide();
        },
        abrirModalBorrar() {
            const modal = new bootstrap.Modal(document.getElementById("modalBorrar"));
            modal.show();
        },
        async getData() {
            await axiosConn
                .get("/getCategories")
                .then((response) => {
                    this.categories = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching categories:", error);
                });

            try {
                const response = await axiosConn.get(`/getArticleById/${this.$route.params.id}`);
                this.article = response.data;
                this.mesesSeleccionados = 1;
                if (this.article.foto) {
                    this.selectedImatge = this.article.foto;
                }
            } catch (error) {
                console.error("Error al cargar los detalles del artículo:", error);
            }
        },
        previewImage(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.selectedImatge = e.target.result; // Para mostrar en <img>
                };

                this.article.foto = file; // Guarda el archivo real
                reader.readAsDataURL(file);
            }
        },
        base64ToBlob(base64, mimeType) {
            const byteString = atob(base64.split(',')[1]); // Eliminar el encabezado "data:image/jpeg;base64,"
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ab], { type: mimeType });
        }




    },
};
</script>
<style>
.input-container {
    display: flex;
    justify-content: center;
}

.image-upload {
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-upload-label {
    cursor: pointer;
}

.image-upload-box {
    border: 2px dashed #ccc;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #f8f8f8;
}

.image-preview {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

span {
    color: #888;
    font-size: 14px;
}

.d-none {
    display: none;
}
</style>