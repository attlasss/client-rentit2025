import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/Casa.vue"),
  },
  {
    path: "/registre",
    name: "Registre",
    component: () => import("../views/Registre.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/comandes",
    name: "Comandes",
    component: () => import("../views/Comandes/Comandes.vue"),
  },
  {
    path: "/devolucions",
    name: "Devolucions",
    component: () => import("../views/Devolucions.vue"),
  },
  {
    path: "/fervaloracions",
    name: "FerValoracions",
    component: () => import("../views/FerValoracions.vue"),
  },
  {
    path: "/perfilusuarimitja/:id",
    name: "perfilusuarimitja",
    component: () => import("../views/PerfilUsuariMitja.vue"),
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
