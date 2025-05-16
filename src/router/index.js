import { createRouter, createWebHistory } from "vue-router";
// import * as jwt_decode from 'jwt-decode';
 // Importamos jwt-decode

// Definir las rutas de tu aplicación
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
    path: "/recuperar-contrasenya",
    name: "RecuperarContrasenya",
    component: () => import("../views/RecuperarContrasenya.vue"),
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
    path: "/perfil/:username",
    name: "Perfil",
    component: () => import("../views/Perfil/Perfil.vue"),
  },
  {
    path: "/verPerfil/:username",
    name: "VerPerfil",
    component: () => import("../views/PerfilUser.vue"),
  }, 
  {
    path: "/perfilComandes/:username",
    name: "perfilComandes",
    component: () => import("../views/Perfil/PerfilComandes.vue"),
  }, 
  {
    path: "/perfilArticles/:username",
    name: "PerfilArticles",
    component: () => import("../views/Perfil/PerfilArticles.vue"),
  },
  {
    path: "/perfilValoracions/:username",
    name: "PerfilValoracions",
    component: () => import("../views/Perfil/PerfilValoracions.vue"),
  },
  {
    path: "/perfilVentes/:username",
    name: "PerfilVentes",
    component: () => import("../views/Perfil/PerfilVentes.vue"),
  },
  {
    path:"/publicar-article",
    name:"PublicarArticle",
    component: () => import("../views/Article/PublicarArticle.vue"),
  },
  {
    path:"/article/:id",
    name:"Article",
    component: () => import("../views/Article/ArticleDetails.vue"),
  },  
  {
    path:"/preferits/:username",
    name:"Preferits",
    component: () => import("../views/Preferits.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

// Guardias de navegación globales
// router.beforeEach((to, from, next) => {
//   // Obtener el token desde localStorage
//   const token = localStorage.getItem("token");

//   if (token) {
//     try {
//       // Decodificar el token JWT
//       const decodedToken = jwt_decode(token);

//       // Verificar si el token ha expirado
//       const currentTime = Date.now() / 1000; // Tiempo actual en segundos
//       if (decodedToken.exp < currentTime) {
//         // Si el token ha expirado, eliminarlo y redirigir al login
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         localStorage.removeItem("userID");
//         next({ name: "Login" });
//       } else {
//         // Si el token es válido, continuar con la navegación
//         next();
//       }
//     } catch (error) {
//       // Si hay algún error al decodificar el token, redirigir al login
//       console.error("Error al decodificar el token:", error);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("userID");
//       next({ name: "Login" });
//     }
//   } else {
//     // Si no hay token y la ruta requiere autenticación, redirigir al login
//     if (to.name !== "Login" && to.name !== "Registre") {
//       next({ name: "Login" });
//     } else {
//       next(); // Si la ruta es de login o registro, seguir
//     }
//   }
// });

export default router;
