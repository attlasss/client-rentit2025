<template>
  <div>
    <input
      :type="type"
      class="input"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="isRequired"
      v-model="inputValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<style scoped>
.input {
  background-color: #F1F1F1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  border-bottom: 3px solid #6C6B6B;
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  border-bottom: 3px solid #578FCA;
  box-shadow: 0 4px 6px rgba(87, 143, 202, 0.5);
}
</style>
