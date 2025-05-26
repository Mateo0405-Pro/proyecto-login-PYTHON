import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import LoginForm from "../components/LoginForm.vue";
import Profile from "../components/Profile.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: LoginForm },
  { path: "/profile", component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;