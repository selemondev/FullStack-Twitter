<script setup>
import TwitterIcon from "../assets/twitter-icon.png";
import { reactive } from "vue";
import { CameraIcon } from "@heroicons/vue/outline";
const formData = reactive({
    username: "",
    email: "",
    password: "",
});
const handleSubmit = async () => {
    // const result = await v$.value.$validate();
    //  if(result) {
    //     authStore.register(formData.username, formData.email, formData.password);
    // }
    // setTimeout(() => {
    //     formData.username = "";
    //     formData.email = "";
    //     formData.password = "";
    //     formData.confirmPassword = ""
    // }, 1000)
}
</script>
<template>
    <div>
        <div class="grid-center py-2">
            <h2 class="text-white text-xl">Edit Profile</h2>
        </div>

        <div class="mt-2 relative">
            <div
                class="absolute h-20 w-full inset-0 z-1 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
                <label for="photo">
                    <CameraIcon class="w-8 h-8 cursor-pointer" />
                </label>
            </div>
            <div class="w-full relative h-20 -z-10 bg-green-500 rounded-md">
                <div class="grid-center">
                    <img :src="TwitterIcon" alt="" class="w-20 h-20 object-cover">
                </div>
            </div>


            <div class="space-y-2  mt-2 z-20">
                <div class="relative h-20 w-20">
                    <div
                        class="absolute h-20 w-full inset-0 flex-center z-1 flex-col mt-6 opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
                        <label for="photo">
                            <CameraIcon class="w-8 h-8 cursor-pointer" />
                        </label>
                    </div>

                    <div class="w-20 rounded-full -mt-12 h-20 -z-10 bg-blue-300">
                        <div class="grid-center">
                            <img :src="TwitterIcon" alt="" class="w-20 h-20 object-cover">
                        </div>
                    </div>

                </div>

                <form class="px-2">
                    <div class="pb-4">
                        <label for="username" class="label">Username</label>
                        <input type="text" placeholder="Username" class="input-style" v-model="formData.username">
                    </div>

                    <div class="pb-4">
                        <label for="bio" class="label">Bio</label>
                        <input type="text" placeholder="Bio" class="input-style" v-model="formData.password">
                    </div>

                    <div class="pb-2">
                        <label for="city" class="label">City</label>
                        <input type="text" placeholder="City" class="input-style" v-model="formData.password">
                    </div>

                    <div class="mt-3">
                        <button
                            class="w-full py-2.5 bg-green-500 hover:bg-green-600 transition duration-200 ease-in rounded-md">Update
                            Profile</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>