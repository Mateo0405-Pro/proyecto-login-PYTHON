<template>
  <div class="max-w-4xl mx-auto mt-12 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6">Gestión de Usuarios</h2>

    <form @submit.prevent="crearUsuario" class="mb-8 space-y-4">
      <!-- Campos para nuevo usuario -->
      <input v-model="nuevoUsuario.usuario" placeholder="Usuario" required class="input" />
      <input v-model="nuevoUsuario.contraseña" type="password" placeholder="Contraseña" required class="input" />
      <input v-model="nuevoUsuario.nombre" placeholder="Nombre" required class="input" />
      <input v-model="nuevoUsuario.email" type="email" placeholder="Email" required class="input" />
      <select v-model.number="nuevoUsuario.idrol" required class="input">
        <option :value="1">Administrador</option>
        <option :value="2">Usuario</option>
      </select>
      <button type="submit" class="btn">Crear Usuario</button>
    </form>

    <h3 class="text-xl font-semibold mb-4">Usuarios Registrados</h3>
    <table class="w-full table-auto border-collapse border border-gray-300">
      <thead><tr><th>ID</th><th>Usuario</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th></tr></thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.IdUsuario">
          <td>{{ usuario.IdUsuario }}</td>
          <td>{{ usuario.Usuario }}</td>
          <td>{{ usuario.Nombre }}</td>
          <td>{{ usuario.Email }}</td>
          <td>{{ usuario.IdRol === 1 ? 'Admin' : 'Usuario' }}</td>
          <td><button @click="eliminarUsuario(usuario.IdUsuario)" class="btn-delete">Eliminar</button></td>
        </tr>
      </tbody>
    </table>
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