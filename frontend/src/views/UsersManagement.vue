<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-2xl overflow-hidden">
        <!-- Header con gradiente -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
          <h2 class="text-3xl font-bold text-white text-center">Gestión de Usuarios</h2>
        </div>

        <!-- Formulario de nuevo usuario -->
        <div class="px-6 py-8">
          <form @submit.prevent="crearUsuario" class="space-y-6 bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Crear Nuevo Usuario</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Usuario</label>
                <input 
                  v-model="nuevoUsuario.usuario" 
                  placeholder="Usuario" 
                  required 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" 
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input 
                  v-model="nuevoUsuario.contraseña" 
                  type="password" 
                  placeholder="Contraseña" 
                  required 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" 
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Nombre</label>
                <input 
                  v-model="nuevoUsuario.nombre" 
                  placeholder="Nombre" 
                  required 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" 
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  v-model="nuevoUsuario.email" 
                  type="email" 
                  placeholder="Email" 
                  required 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" 
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Rol</label>
                <select 
                  v-model.number="nuevoUsuario.idrol" 
                  required 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  <option :value="1">Administrador</option>
                  <option :value="2">Usuario</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Crear Usuario
            </button>
          </form>

          <!-- Tabla de usuarios -->
          <div class="mt-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Usuarios Registrados</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="usuario in usuarios" :key="usuario.IdUsuario" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ usuario.IdUsuario }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ usuario.Usuario }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ usuario.Nombre }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ usuario.Email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        :class="[
                          'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                          usuario.IdRol === 1 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        ]"
                      >
                        {{ usuario.IdRol === 1 ? 'Admin' : 'Usuario' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        @click="eliminarUsuario(usuario.IdUsuario)" 
                        class="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const usuarios = ref([]);

const nuevoUsuario = ref({
  usuario: "",
  contraseña: "",
  nombre: "",
  email: "",
  idrol: 2,
});

const API_URL = "http://localhost:8000";

async function cargarUsuarios() {
  try {
    const res = await fetch(`${API_URL}/usuarios`, {
      headers: { Authorization: `Bearer ${userStore.token}` },
    });
    if (!res.ok) throw new Error("Error al cargar usuarios");
    usuarios.value = await res.json();
  } catch (error) {
    alert(error.message);
  }
}

async function crearUsuario() {
  try {
    const res = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userStore.token}`,
      },
      body: JSON.stringify(nuevoUsuario.value),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Error al crear usuario");
    }
    alert("Usuario creado con éxito");
    nuevoUsuario.value = {
      usuario: "",
      contraseña: "",
      nombre: "",
      email: "",
      idrol: 2,
    };
    cargarUsuarios();
  } catch (error) {
    alert(error.message);
  }
}

async function eliminarUsuario(id) {
  if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
  try {
    const res = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${userStore.token}` },
    });
    if (res.status !== 204) throw new Error("Error al eliminar usuario");
    alert("Usuario eliminado");
    cargarUsuarios();
  } catch (error) {
    alert(error.message);
  }
}

onMounted(() => {
  if (!userStore.token) {
    router.push("/login");
  } else {
    cargarUsuarios();
  }
});
</script>