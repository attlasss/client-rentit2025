<template>
    <div class="app-container">
      <h1>Holaaaaaaaewefergtyhjmklytfdfaa</h1>
        <Input
          v-model="inputValue"
          placeholder="Enter text here..."
          type="text"
          :disabled="false"
          :isRequired="true"
        />
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
  