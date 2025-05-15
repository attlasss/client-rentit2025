<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-8 col-xl-7">
                <h2 class="text-center mb-5">Afegir Article</h2>
                <form @submit.prevent="afegirarticle" class="d-flex flex-column gap-3">
                    <div>
                        <label class="form-label">Nom del article</label>
                        <Input v-model="article.nom" placeholder="Introdueix el nom" required />
                    </div>

                    <div>
                        <label class="form-label">Descripció</label>
                        <Input v-model="article.descripcio" placeholder="Introdueix una descripció" required />
                    </div>

                    <div>
                        <label class="form-label">Categoria</label>
                        <!-- Select de las categorias -->
                        <Select v-model="article.id_categoria"
                            :options="categories.map(category => ({ value: category.id_categoria, label: category.nom }))"
                            placeholder="Selecciona una categoria" required />
                    </div>

                    <div>
                        <label class="form-label">Preu per mes</label>
                        <Input v-model="article.preu" type="number" min="0" placeholder="Ex: 15€" required />

                    </div>

                    <div>
                        <label class="form-label">Mesos</label>
                        <Select v-model="article.mesos"
                            :options="Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `${i + 1} mesos` }))"
                            placeholder="Selecciona una durada" required />

                    </div>

                    <div>
                        <label class="form-label">Imatge</label>
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
                        <Button color="blue" variant="fill" type="submit">Afegir article</Button>
                    </div>
                </form>
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
                imatge: "",
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
        afegirarticle() {
            if (!this.article.nom || !this.article.descripcio || !this.article.id_categoria || !this.article.preu
                || !this.article.mesos || !this.article.imatge) {

                // Console log para depuración
                console.log("Verificando campos del artículo:");
                console.log("Nombre del artículo:", this.article.nom);
                console.log("Descripción:", this.article.descripcio);
                console.log("Categoría:", this.article.id_categoria);
                console.log("Precio por mes:", this.article.preu);
                console.log("Mesos:", this.article.mesos);
                console.log("Imagen seleccionada:", this.article.imatge);

                this.toastMessage = "Si us plau, ompliu tots els camps.";
                this.toastColor = "danger";
                this.toast = true;
                return;
            }


            const userID = localStorage.getItem("userID");

            const formData = new FormData();
            formData.append("foto_article", this.article.imatge); // <<-- Usa el archivo real
            formData.append("mimetype", this.article.imatge.type);
            formData.append("user_id", userID);
            formData.append("articleData", JSON.stringify(this.article));

            try {
                const res = axiosConn.post("/crearArticle", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("Response:", res.status);
                if (res.status === 200) {

                    this.toastMessage = "Article creat amb èxit!";
                    this.toastColor = "success";
                    this.toast = true;
                    // Redirigir a la pàgina d'articles
                    this.$router.push({ name: "articles" });
                    setTimeout(() => {
                        this.toast = false;
                    }, 2000);
                } else {
                    this.toastMessage = "Error actualitzant la foto.";
                    this.toastColor = "danger";
                    this.toast = true;
                }
            } catch (err) {
                console.error("qqq", err);
                this.toastMessage = "qq";
                this.toastColor = "danger";
                this.toast = true;
            }


        },
        getData() {
            axiosConn
                .get("/getCategories")
                .then((response) => {
                    this.categories = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching categories:", error);
                });
        },
        previewImage(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.selectedImatge = e.target.result; // Solo para mostrar en pantalla (base64)
                };

                this.article.imatge = file; // <<--- Guarda el File aquí

                reader.readAsDataURL(file);
            }
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