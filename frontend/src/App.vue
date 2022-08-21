<script setup>
import { useAuthStore } from "./stores/authStore";
import { watchEffect, ref } from "vue";
import Header from './components/Header.vue';
import Navbar from "./components/Navbar.vue";
const authStore = useAuthStore();
const token = ref("");
watchEffect(() => {
  token.value = authStore.token;
})
</script>
<template>
  <div>
    <Header v-if="!token"/>
    <Navbar v-else/>
    <router-view />
  </div>
</template>
