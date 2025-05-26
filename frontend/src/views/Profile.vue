<template>
  <div class="max-w-3xl mx-auto mt-12 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Perfil de Usuario</h2>

    <p><strong>Usuario:</strong> {{ perfil.Usuario }}</p>
    <p><strong>Nombre:</strong> {{ perfil.Nombre }}</p>
    <p><strong>Email:</strong> {{ perfil.Email }}</p>
    <p><strong>Rol:</strong> {{ perfil.IdRol === 1 ? "Admin" : "Usuario" }}</p>

    <button @click="logout" class="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
      Cerrar Sesión
    </button>

    <div v-if="perfil.IdRol === 1" class="mt-8">
      <h3 class="text-xl font-semibold mb-4">Administración</h3>
      <router-link to="/usuarios" class="btn-admin">Gestionar Usuarios</router-link>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

export default {
  name: "UserProfile", // Nombre multi-palabra para evitar error ESLint
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const perfil = userStore.perfil;

    function logout() {
      userStore.logout();
      router.push("/login");
    }

    return { perfil, logout };
  },
};
</script>
