<template>
  <button
    :class="['btn', computedClasses]"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <slot />
  </button>
</template>

<script>
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
      default: "fill", // fill | outline | gradient
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
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

      // Variant
      if (this.variant === "gradient") {
        base.push("text-white", `bg-gradient-${this.color}`);
      } else if (this.variant === "outline") {
        base.push(`btn-outline-${this.color}`);
      } else {
        base.push(`btn-${this.color}`);
      }

      // Size
      if (this.size) base.push(`btn-${this.size}`);

      // Full Width
      if (this.fullWidth) base.push("w-100");

      // Active
      if (this.active) base.push("active");

      return base.join(" ");
    },
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
  
}

/* Hover animation */
.btn:hover {
  transform: translateY(-2px);
}

/* Blue Fill Button */
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

/* Blue Outline Button */
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

/* Tamaños */
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

</style>
