<template>
  <div class="max-w-4xl mx-auto mt-12 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6">Gestión de Usuarios</h2>

    <!-- Formulario para crear nuevo usuario -->
    <form @submit.prevent="crearUsuario" class="mb-8 space-y-4">
      <h3 class="text-xl font-semibold">Crear Nuevo Usuario</h3>
      <div>
        <label class="block mb-1 font-medium">Usuario</label>
        <input v-model="nuevoUsuario.usuario" type="text" required class="input" />
      </div>
      <div>
        <label class="block mb-1 font-medium">Contraseña</label>
        <input v-model="nuevoUsuario.contraseña" type="password" required class="input" />
      </div>
      <div>
        <label class="block mb-1 font-medium">Nombre</label>
        <input v-model="nuevoUsuario.nombre" type="text" required class="input" />
      </div>
      <div>
        <label class="block mb-1 font-medium">Email</label>
        <input v-model="nuevoUsuario.email" type="email" required class="input" />
      </div>
      <div>
        <label class="block mb-1 font-medium">Rol</label>
        <select v-model.number="nuevoUsuario.idrol" required class="input">
          <option :value="1">Administrador</option>
          <option :value="2">Usuario</option>
        </select>
      </div>

      <button type="submit" class="btn">Crear Usuario</button>
    </form>

    <!-- Tabla usuarios -->
    <h3 class="text-xl font-semibold mb-4">Usuarios Registrados</h3>
    <table class="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 p-2">ID</th>
          <th class="border border-gray-300 p-2">Usuario</th>
          <th class="border border-gray-300 p-2">Nombre</th>
          <th class="border border-gray-300 p-2">Email</th>
          <th class="border border-gray-300 p-2">Rol</th>
          <th class="border border-gray-300 p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.IdUsuario" class="hover:bg-gray-100">
          <td class="border border-gray-300 p-2">{{ usuario.IdUsuario }}</td>
          <td class="border border-gray-300 p-2">{{ usuario.Usuario }}</td>
          <td class="border border-gray-300 p-2">{{ usuario.Nombre }}</td>
          <td class="border border-gray-300 p-2">{{ usuario.Email }}</td>
          <td class="border border-gray-300 p-2">{{ usuario.IdRol === 1 ? 'Admin' : 'Usuario' }}</td>
          <td class="border border-gray-300 p-2">
            <button @click="eliminarUsuario(usuario.IdUsuario)" class="btn-delete">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

export default {
  setup() {
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

    // Función para cargar todos los usuarios (admin)
    async function cargarUsuarios() {
      try {
        const res = await fetch(`${API_URL}/usuarios`, {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        });
        if (!res.ok) throw new Error("Error al cargar usuarios");
        usuarios.value = await res.json();
      } catch (error) {
        alert(error.message);
      }
    }

    // Crear nuevo usuario
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
        cargarUsuarios(); // refresca la lista
      } catch (error) {
        alert(error.message);
      }
    }

    // Eliminar usuario
    async function eliminarUsuario(id) {
      if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
      try {
        const res = await fetch(`${API_URL}/usuarios/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
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

    return { usuarios, nuevoUsuario, crearUsuario, eliminarUsuario };
  },
};
</script>

<style>
.input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  background-color: #2563eb;
  color: white;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  background-color: #1d4ed8;
}

.btn-delete {
  background-color: #dc2626;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.btn-delete:hover {
  background-color: #b91c1c;
}
</style>