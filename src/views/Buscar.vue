<template>
  <div class="container my-5">
    <h1 class="mb-4">Resultats de la cerca</h1>
    <p>Resultats de la cerca </p>
    <div v-if="articles.length === 0" class="text-center text-muted mt-5">
      No s'han trobat articles.
    </div>
    <div v-else class="row g-4">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
        v-for="article in articles"
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
          :estat="article.estat"
          @toggleFav="toggleFav(article.id_article)"
          @verMas="viewMore(article.id_article)"
          class="w-100"
        />
      </div>
    </div>
  </div>
    <transition name="fade">
      <div v-if="toast" class="toast-message text-white px-3 py-2 rounded shadow position-fixed bottom-0 end-0 m-4"
        :class="toastColor === 'success' ? 'bg-success' : 'bg-danger'">
        {{ toastMessage }}
      </div>
    </transition>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
import axiosConn from "@/axios/axios";

export default {
  components: { ArticleCard },
  data() {
    return {
      articles: [],
      toast: false,
      toastMessage: "",
      toastColor: "success",
    };
  },
  watch: {
    '$route.params.query': {
      immediate: true,
      handler() {
        this.buscarArticles();
      }
    }
  },
  methods: {
    async buscarArticles() {
      const query = this.$route.params.query;
      if (!query) {
        this.articles = [];
        return;
      }
    const userId = localStorage.getItem("userID");
      try {
        const res = await axiosConn.get(`/buscarArticles/${encodeURIComponent(query)}?id=${userId}`);
        this.articles = res.data;
        console.log(this.articles);
      } catch (e) {
        this.articles = [];
      }
    },
    toggleFav(article) {
      axiosConn.post("/afegirArticlesPreferits", {
        id_article: article,
        id_usuari: localStorage.getItem("userID"),
      })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.function === "add") {
              this.toastMessage = "Article afegit a favorits!";
              this.toastColor = "success";
            } else if (response.data.function === "delete") {
              this.toastMessage = "Article eliminat de favorits";
              this.toastColor = "danger";
            }

            // Mostrar el toast
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
    viewMore(id) {
      this.$router.push(`/article/${id}`);
    }
  }
};
</script>