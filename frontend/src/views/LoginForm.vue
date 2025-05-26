<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
    <div class="max-w-sm w-full mx-4">
      <!-- Logo o imagen decorativa -->
      <div class="text-center mb-6">
        <div class="inline-block p-3 rounded-full bg-white/10 backdrop-blur-sm mb-3">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>

      <!-- Tarjeta de login -->
      <div class="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden transform hover:scale-102 transition-all duration-300">
        <div class="p-6">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-white mb-1">Bienvenido</h1>
            <p class="text-sm text-white/80">Ingresa tus credenciales para continuar</p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-3">
              <div class="relative group">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-white/60 group-focus-within:text-white transition-colors duration-200">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input 
                  v-model="usuario" 
                  type="text" 
                  placeholder="Usuario" 
                  required 
                  class="w-full pl-9 pr-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-transparent transition-all duration-200" 
                />
              </div>
              
              <div class="relative group">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-white/60 group-focus-within:text-white transition-colors duration-200">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input 
                  v-model="contraseña" 
                  type="password" 
                  placeholder="Contraseña" 
                  required 
                  class="w-full pl-9 pr-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-transparent transition-all duration-200" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              class="w-full bg-white text-indigo-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-white/90 transform hover:scale-102 transition-all duration-200 shadow flex items-center justify-center space-x-2"
            >
              <span>Iniciar Sesión</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          <!-- Footer decorativo -->
          <div class="mt-6 text-center">
            <p class="text-white/60 text-xs">¿Necesitas ayuda? Contacta al administrador</p>
          </div>
        </div>
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