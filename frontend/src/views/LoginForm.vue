<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-4 py-8">
    <div class="w-full max-w-xs bg-white rounded-lg shadow-md p-6 space-y-6">
      <!-- Logo y título -->
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-11 h-11 rounded-full bg-blue-100 mb-3">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="text-xl font-bold text-gray-800">Bienvenido</h1>
        <p class="text-xs text-gray-600 mt-1">Ingresa tus credenciales para continuar</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Usuario -->
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <input
            v-model="usuario"
            type="text"
            placeholder="Usuario"
            required
            class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <!-- Contraseña -->
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
          <input
            v-model="contraseña"
            type="password"
            placeholder="Contraseña"
            required
            class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Iniciar Sesión
        </button>
      </form>

      <div class="text-center mt-2">
        <p class="text-xs text-gray-500">
          ¿Necesitas ayuda?
          <a href="#" class="text-blue-600 hover:text-blue-700">Contacta al administrador</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { API_URL } from "../config";

const usuario = ref("");
const contraseña = ref("");
const router = useRouter();
const userStore = useUserStore();

async function handleSubmit() {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: usuario.value, contraseña: contraseña.value }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.detail || "Error en login");
      return;
    }

    const data = await res.json();
    userStore.setToken(data.access_token);

    // Obtener perfil
    const profileRes = await fetch(`${API_URL}/mi-perfil`, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });

    if (!profileRes.ok) throw new Error("Error al cargar perfil");
    const profileData = await profileRes.json();
    userStore.setPerfil(profileData);

    router.push("/perfil");
  } catch (e) {
    alert(e.message);
  }
}
</script>
