<template>
  <div class="max-w-2xl mx-auto mt-12 p-6">
    <h1 class="text-3xl font-bold mb-6">Bienvenido a Proyecto Login</h1>
    <p class="mb-6">Esta es la página principal.</p>
    <router-link to="/login" class="text-blue-600 hover:underline">Ir a Iniciar Sesión</router-link>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>