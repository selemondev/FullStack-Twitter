<script setup>
import useVuelidate from "@vuelidate/core";
import { required, sameAs, minLength, email, helpers } from "@vuelidate/validators";
import { reactive, computed, watchEffect, ref } from "vue";
import { useRouter } from "vue-router";
import TwitterIcon from "../assets/twitter-icon.png";
import { useAuthStore } from "../stores/authStore";
const authStore = useAuthStore();
const router = useRouter();
const formData = reactive({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
});
const token = ref("");
const loading = ref(false);
watchEffect(() => {
    token.value = authStore.token,
    loading.value = authStore.registerLoading
    if(token.value) {
        router.push("/edit")
    };
});
const rules = computed(() => {
    return {
    username: { required: helpers.withMessage("Username is required", required) },
    email: { required: helpers.withMessage("Email is required", required), email },
    password: { required: helpers.withMessage("Password is required", required), minLength:minLength(8) },
    confirmPassword: { required: helpers.withMessage("Passwords do not match", required), sameAs: sameAs(formData.password) }
}
});
const v$ = useVuelidate(rules, formData);
const handleSubmit = async () => {
    const result = await v$.value.$validate();
     if(result) {
        authStore.register(formData.username, formData.email, formData.password);
    }
    setTimeout(() => {
        formData.username = "";
        formData.email = "";
        formData.password = "";
        formData.confirmPassword = ""
    }, 1000)
}
</script>
<template>
<section class="grid-center pt-2">
    <div class="max-w-sm w-72 mt-10 mb-4 md:w-96 md:mt-6 md:mb-6">
        <form class="w-full px-6 py-4 bg-black/75 border border-gray-800 rounded-md shadow-sm" @submit.prevent="handleSubmit">
            <div class="grid-center pb-4">
                <img :src="TwitterIcon" alt="twitter" class="w-10 h-10">
            </div>

            <div class="pb-4">
                <label for="username" class="label">Username</label>
                <input type="text" placeholder="Username" class="input-style" v-model="formData.username">
                <p class="error" v-if="v$.username.$error">{{ v$.username.$errors[0].$message}}</p>
            </div>

             <div class="pb-4">
                <label for="email" class="label">Email</label>
                <input type="email" placeholder="Email" class="input-style" v-model="formData.email">
                <p class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message}}</p>
            </div>

             <div class="pb-4">
                <label for="password" class="label">Password</label>
                <input type="password" placeholder="Password" class="input-style" v-model="formData.password">
                <p class="error" v-if="v$.password.$error">{{ v$.password.$errors[0].$message}}</p>
            </div>

            
             <div class="pb-4">
                <label for="confirmPassword" class="label">ConfirmPassword</label>
                <input type="password" placeholder="Password" class="input-style" v-model="formData.confirmPassword">
                <p class="error" v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message}}</p>
            </div>

            <div>
                 <button type="submit" class="btn">{{ loading ? "Signing Up..." : "Sign Up"}}</button>
            </div>

        </form>
    </div>
</section>
</template>
