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
    path: "/sobre-nosaltres",
    name: "SobreNosaltres",
    component: () => import("../views/SobreNosaltres.vue"),
  },
  {
    path: "/registre",
    name: "Registre",
    component: () => import("../views/User/Registre.vue"),
  },
  {
    path: "/avis-legal",
    name: "AvisLegal",
    component: () => import("../views/Legal/AvisLegal.vue"),
  },
  {
    path: "/condicions-us",
    name: "CondicionsUs",
    component: () => import("../views/Legal/CondicionsDUs.vue"),
  },
  {
    path: "/politica-privacitat",
    name: "PoliticaPrivacitat",
    component: () => import("../views/Legal/PoliticaPrivacitat.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/User/Login.vue"),
  },
  {
    path: "/recuperar-contrasenya",
    name: "RecuperarContrasenya",
    component: () => import("../views/User/RecuperarContrasenya.vue"),
  },
  {
    path: "/canviarContrasenya/:username",
    name: "CanviarContrasenya",
    component: () => import("../views/Perfil/PerfilCanviarContrasenya.vue"),
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
    path: "/perfilDevolucions/:username",
    name: "PerfilDevolucions",
    component: () => import("../views/Perfil/PerfilDevolucions.vue"),
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
    path:"/editarArticle/:id",
    name:"EditarArticle",
    component: () => import("../views/Article/EditarArticle.vue"),
  },
  {
    path:"/preferits/:username",
    name:"Preferits",
    component: () => import("../views/Preferits.vue"),
  }, 
  {
    path: "/buscar/:query",
    name: "Buscar",
    component: () => import("../views/Buscar.vue"),
  }, 
  {
    path: "/allArticles/:id",
    name: "AllArticles",
    component: () => import("../views/Article/AllArticles.vue"),
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
