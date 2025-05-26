<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-lg shadow-2xl overflow-hidden">
        <!-- Header con gradiente -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
          <h2 class="text-3xl font-bold text-white text-center">Perfil de Usuario</h2>
        </div>

        <!-- Información del perfil -->
        <div class="px-6 py-8 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center space-x-3">
                <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Usuario</p>
                  <p class="text-lg font-semibold">{{ perfil.Usuario }}</p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center space-x-3">
                <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Nombre</p>
                  <p class="text-lg font-semibold">{{ perfil.Nombre }}</p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center space-x-3">
                <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Email</p>
                  <p class="text-lg font-semibold">{{ perfil.Email }}</p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center space-x-3">
                <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Rol</p>
                  <p class="text-lg font-semibold">{{ perfil.IdRol === 1 ? "Administrador" : "Usuario" }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex flex-col space-y-4 mt-8">
            <button 
              @click="logout" 
              class="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Cerrar Sesión</span>
            </button>

            <div v-if="perfil.IdRol === 1" class="mt-4">
              <router-link 
                to="/usuarios" 
                class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Gestionar Usuarios</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
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
