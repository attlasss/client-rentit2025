<template>
  <div>
    <select
      class="select"
      :disabled="disabled"
      :required="isRequired"
      v-model="selectValue"
      :style="{ width: width }"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Selecciona una opció',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '100%',
    },
    options: {
      type: Array,
      required: true, // [{ value: 'valor1', label: 'Mostrar esto' }]
    },
  },
  computed: {
    selectValue: {
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
.select {
  background-color: #F1F1F1;
  padding: 15px;
  border-radius: 5px;
  border: none;
  border-bottom: 1px solid #6C6B6B;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.select:focus {
  outline: none;
  border-bottom: 1px solid #578FCA;
  box-shadow: 0 4px 6px rgba(87, 143, 202, 0.5);
}
</style>
