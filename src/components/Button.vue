<template>
  <button
    :class="['btn', computedClasses, { 'no-focus': noFocus }]"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Si se pasa el ícono, lo renderizamos -->
    <span v-if="icon" :data-feather="icon" class="icon"></span>
    <slot />
  </button>
</template>

<script>
import feather from "feather-icons";

export default {
  name: "Button",
  props: {
    color: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "md",
    },
    variant: {
      type: String,
      default: "fill",
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    noFocus: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    computedClasses() {
      const base = [];

      if (this.variant === "gradient") {
        base.push("text-white", `bg-gradient-${this.color}`);
      } else if (this.variant === "outline") {
        base.push(`btn-outline-${this.color}`);
      } else {
        base.push(`btn-${this.color}`);
      }

      if (this.size) base.push(`btn-${this.size}`);
      if (this.fullWidth) base.push("w-100");
      if (this.active) base.push("active");

      return base.join(" ");
    },
  },
  mounted() {
    feather.replace(); // Renderiza íconos después del montaje
  },
  updated() {
    feather.replace(); // Por si cambia dinámicamente el DOM
  },
};

</script>

<style scoped>
.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  transition: transform 0.2s ease-in-out, background-color 0.2s;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-blue {
  background-color: #578FCA;
  color: white;
  border: none;
}

.btn-blue:hover {
  background-color: #578FCA;
  color: white;
  border: none;
}

.btn-white {
  background-color: white;
  color: #578FCA;
  border: none;
}

.btn-white:hover {
  background-color: white;
  color: #578FCA;
  border: none;
}

.btn-outline-blue {
  background-color: white;
  color: #578FCA;
  border: 2px solid #578FCA;
}

.btn-outline-blue:hover {
  background-color: white;
  color: #578FCA;
  border: 2px solid #578FCA;
}

.btn-outline-white {
  color: white;
  border: 2px solid white;
}

.btn-outline-white:hover {
  color: white;
  border: 2px solid white;
}

.btn-md {
  font-size: 1rem;
  padding: 0.5rem 1.25rem;
}

.btn-sm {
  font-size: 0.875rem;
  padding: 0.4rem 1rem;
}

.btn-lg {
  font-size: 1.125rem;
  padding: 0.6rem 1.5rem;
}

/* 🔕 No focus */
.no-focus:focus {
  outline: none !important;
  box-shadow: none !important;
}

.icon {
  margin-right: 8px;
  display: inline-block;
}
</style>
