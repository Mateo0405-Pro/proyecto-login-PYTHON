<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
    <h2 class="text-xl font-bold mb-4">Iniciar Sesión</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="usuario" type="text" placeholder="Usuario" required class="input" />
      <input v-model="contraseña" type="password" placeholder="Contraseña" required class="input" />
      <button type="submit" class="btn">Ingresar</button>
    </form>
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