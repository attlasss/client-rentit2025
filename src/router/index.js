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
<<<<<<< Updated upstream
    path: "/Orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
  },
  {
    path: "/Return",
    name: "Return",
    component: () => import("../views/Return.vue"),
  },
=======
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  }
>>>>>>> Stashed changes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
