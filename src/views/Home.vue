<template>
  <div class="app-container">
    <div class="row mt-5">
      <div class="col-1"></div>
      <div class="col-10">
        <Input v-model="inputValue" placeholder="Busca un article..." type="text" :disabled="false" :isRequired="true"
          width="100%" />
      </div>
      <div class="col-1"></div>
    </div>

    <!-- Carrusel -->
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="" class="d-block w-100" alt="slide 1">
        </div>
        <div class="carousel-item">
          <img src="" class="d-block w-100" alt="slide 2">
        </div>
        <div class="carousel-item">
          <img src="" class="d-block w-100" alt="slide 3">
        </div>
      </div>
      <!-- Botones izquierda/derecha -->
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>

  </div>

</template>

<script>
import Input from "@/components/Input.vue";

export default {
  components: {
    Input,
  },
  data() {
    return {
      inputValue: "",
    };
  },
};
</script>
