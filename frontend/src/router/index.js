import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoginForm from "../views/LoginForm.vue";
import Profile from "../views/Profile.vue";
import UsersManagement from "../views/UsersManagement.vue";
import { useUserStore } from "../stores/user";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: LoginForm },
  { path: "/perfil", component: Profile, meta: { requiresAuth: true } },
  { path: "/usuarios", component: UsersManagement, meta: { requiresAuth: true, requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.token) {
    next("/login");
  } else if (to.meta.requiresAdmin && userStore.perfil?.IdRol !== 1) {
    alert("No tienes permiso para acceder aquí.");
    next("/perfil");
  } else {
    next();
  }
});

export default router;