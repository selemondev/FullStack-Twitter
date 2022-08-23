<script setup>
import TwitterIcon from "../assets/twitter-icon.png";
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import { storage } from "../firebaseConfig";
import { reactive, ref, watchEffect, computed } from "vue";
import { CameraIcon } from "@heroicons/vue/outline";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { updateUserUrl } from "../utils/userUrl";
const authStore = useAuthStore();
const router = useRouter();
const token = ref("");
const loading = ref(false);
watchEffect(() => {
    token.value = authStore.token;
});

const config = {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
};

const formData = reactive({
    username: "",
    profileImage: "",
    bio: "",
    city: "",
    blob: ""
});
const fileUpload = () => {
    const target = event.target;
    const file = target.files[0];
    formData.profileImage = file;
    formData.blob = URL.createObjectURL(file);
}
const rules = computed(() => {
    return {
        username: { required: helpers.withMessage(" Username is required", required) },
        bio: { required: helpers.withMessage("Bio is required", required), minLength: minLength(10) },
        city: { required: helpers.withMessage("City is required", required) },
        profileImage: { required: helpers.withMessage("Profile Image is required", required) },
    }
});
const v$ = useVuelidate(rules, formData);
const handleSubmit = async () => {
    const result = await v$.value.$validate();
    if (result) {
        loading.value = true;
        let profileImage;
        const imageReference = storageRef(storage, `images/${new Date().getTime()}`);
        const snap = await uploadBytes(imageReference, formData.profileImage);
        const downloadImageUrl = await getDownloadURL(storageRef(storage, snap.ref.fullPath));
        profileImage = downloadImageUrl;

        await axios.post(updateUserUrl, {
            profilePicture: profileImage,
            username: formData.username,
            bio: formData.bio,
            city: formData.city,
            blob: formData.blob
        }, config);
        loading.value = false;
        setTimeout(() => {
            formData.username = "",
                formData.bio = "",
                formData.city = "",
                formData.blob = ""
        }, 1000);
        router.push("/home")
    }
}
</script>
<template>
    <div class="grid-center pt-20">
        <div class="w-72 md:w-96">
            <div class="grid-center py-2">
                <h2 class="text-white text-xl">Set up your Profile</h2>
            </div>

            <div class="mt-10 relative">
                <div class="space-y-2 mt-2">
                    <form class="px-2" @submit.prevent="handleSubmit">
                        <div class="relative grid-center">
                            <div
                                class="absolute h-20 w-full inset-0 flex-center z-1 flex-col mt-6 opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
                                <label for="fileUpload">
                                    <CameraIcon class="w-8 h-8 cursor-pointer" />
                                </label>
                            </div>

                            <div class="w-20 rounded-full h-20 bg-blue-300">
                                <div class="grid-center">
                                    <input type="file" hidden name="fileUpload" id="fileUpload" @change="fileUpload">
                                    <img :src="formData.blob" alt="" class="w-20 h-20 object-cover"
                                        v-if="formData.blob">
                                    <img :src="TwitterIcon" alt="" class="w-20 h-20 object-cover" v-else>
                                </div>
                            </div>

                        </div>
                        <div class="pb-4">
                            <label for="username" class="label">Username</label>
                            <input type="text" placeholder="Username" class="input-style" v-model="formData.username">
                        </div>

                        <div class="pb-4">
                            <label for="bio" class="label">Bio</label>
                            <input type="text" placeholder="Bio" class="input-style" v-model="formData.bio">
                        </div>

                        <div class="pb-2">
                            <label for="city" class="label">City</label>
                            <input type="text" placeholder="City" class="input-style" v-model="formData.city">
                        </div>

                        <div class="mt-3">
                            <button
                                class="w-full py-2.5 bg-[#03A9F4] hover:bg-[#0197dc] transition duration-200 ease-in rounded-md">{{
                                        loading ? "Creating your account..." : "Create your account"
                                }}</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
