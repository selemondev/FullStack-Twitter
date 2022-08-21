import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
import { loginAuthUrl, registerAuthUrl } from "../utils/authUrl";
export const useAuthStore = defineStore({
  id: "auth",
  state:() => ({
    token: JSON.parse(localStorage.getItem("token")),
    registerLoading: false,
    loginLoading: false,
  }),

  getters: {

  },

  actions: {
    async register(username, email, password ) {
      this.registerLoading = true;
      const response = await axios.post(registerAuthUrl, { username, email, password });
      this.token = response.data.token;
      this.registerLoading = false;
      localStorage.setItem("token", JSON.stringify(response.data.token))
    },

    async login (email, password ) {
      this.loginLoading = true;
      const response = await axios.post(loginAuthUrl , { email, password });
      this.token = response.data.token;
      this.loginLoading = false;
      localStorage.setItem("token", JSON.stringify(response.data.token))
    },
  }
});

if( import.meta.hot ) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}