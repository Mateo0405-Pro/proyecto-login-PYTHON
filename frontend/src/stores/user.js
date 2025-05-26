import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    perfil: JSON.parse(localStorage.getItem("perfil")) || null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setPerfil(perfil) {
      this.perfil = perfil;
      localStorage.setItem("perfil", JSON.stringify(perfil));
    },
    logout() {
      this.token = null;
      this.perfil = null;
      localStorage.removeItem("token");
      localStorage.removeItem("perfil");
    },
  },
});