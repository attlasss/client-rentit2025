<template>
    <div class="container-fluid mt-4">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center mb-4">Articles</h1>
                <p class="no-display">Tots els articles</p>
            </div>
        </div>

        <!-- Filtro por categoria -->
        <div class="row mb-4">
            <div class="col-12 col-md-4 mx-auto">
                <label class="form-label" for="categoria">Categoria</label>
                <Select v-model="categoriaSeleccionada"
                    :options="categories.map(category => ({ value: category.id_categoria, label: category.nom }))"
                    placeholder="Selecciona una categoria" 
                    name="categoria"
                    required />
            </div>
        </div>

        <!-- Artículos -->
        <div v-if="articles.length === 0" class="text-center my-4">
      <p>No hi ha cap article encara. </p>
    </div>

    <div v-else>
      <div class="row g-3 justify-content-center mx-0 mx-xl-5">
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-stretch"
          v-for="(article, index) in articlesFiltrats"
          :key="article.id_article"
        >
          <ArticleCard
            :username="article.username"
            :nom="article.nom"
            :preu="article.preu"
            :mesos="article.mesos"
            :foto="article.foto"
            :mimeType="article.mimeType"
            :id_article="article.id_article"
            :userID="article.user_id"
            :is_favorite="article.is_favorite"
            @toggleFav="toggleFav(article.id_article, index)"
            :estat="article.estat"
            @verMas="viewMore(article.id_article)"
            class="w-100"
          />
        </div>
      </div>
    </div>


        <!-- Mensaje tipo toast -->
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
import ArticleCard from "@/components/ArticleCard.vue";
import Select from "@/components/Select.vue";
import axiosConn from "@/axios/axios";

export default {
    components: {
        ArticleCard, Select
    },
    data() {
        return {
            usuari: {},
            articles: [],
            toast: false,
            toastMessage: "",
            toastColor: "success",
            categoriaSeleccionada: "",
            categories: [],
        };
    },
    computed: {
        articlesFiltrats() {
            if (!this.categoriaSeleccionada) return this.articles;
            return this.articles.filter(a => a.id_categoria === this.categoriaSeleccionada);
        }
    },
    mounted() {
        this.getArticles();
        this.getCategories();
    },
    methods: {
        async getArticles() {
            const userID = localStorage.getItem("userID");
            this.usuari = JSON.parse(localStorage.getItem("user"));

            try {
                const response = await axiosConn.get(`/getAllArticles/${userID}`);
                if (response.status === 200) {
                    this.articles = response.data;
                } else {
                    this.toastMessage = "Error al carregar els articles";
                    this.toastColor = "danger";
                    this.toast = true;
                    setTimeout(() => {
                        this.toast = false;
                    }, 3000);
                }
            } catch (error) {
                this.toastMessage = "Error al carregar els articles";
                this.toastColor = "danger";
                this.toast = true;
                setTimeout(() => {
                    this.toast = false;
                }, 3000);
            }
        },
        async getCategories() {
            try {
                const response = await axiosConn.get("/getCategories");
                if (response.status === 200) {
                    this.categories = response.data;
                } else {
                    this.toastMessage = "Error al carregar les categories";
                    this.toastColor = "danger";
                    this.toast = true;
                    setTimeout(() => {
                        this.toast = false;
                    }, 3000);
                }
            } catch (error) {
                this.toastMessage = "Error al carregar les categories";
                this.toastColor = "danger";
                this.toast = true;
                setTimeout(() => {
                    this.toast = false;
                }, 3000);
            }
        },
        filtrarCategoria() {
            // No hace falta nada aquí, el computed hace el filtrado
        },
        toggleFav(articleId, index) {
            axiosConn.post("/afegirArticlesPreferits", {
                id_article: articleId,
                id_usuari: this.usuari.id,
            })
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.function === "add") {
                            this.toastMessage = "Article afegit a favorits!";
                            this.toastColor = "success";
                            this.articles[index].is_favorite = true;
                        } else if (response.data.function === "delete") {
                            this.toastMessage = "Article eliminat de favorits";
                            this.toastColor = "danger";
                        }
                        this.toast = true;
                        setTimeout(() => {
                            this.toast = false;
                        }, 2000);
                    } else {
                        this.toast = true;
                        this.toastMessage = "Error al afegir a favorits";
                        this.toastColor = "danger";
                        setTimeout(() => {
                            this.toast = false;
                        }, 2000);
                    }
                })
                .catch((error) => {
                    console.error("Error adding favorite:", error);
                    this.showToast("Error al afegir a favorits");
                });
        },
        viewMore(article) {
            this.$router.push(`/article/${article}`);
        },
    }
};
</script>

<style scoped>
@media (min-width: 1200px) {
  .col-lg-2 {
    flex: 0 0 auto;
    width: 16.66666667%; /* 100 / 6 = 16.66... */
  }
}
</style>
