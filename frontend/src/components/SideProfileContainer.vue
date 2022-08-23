<script setup>
import TwitterIcon from "../assets/twitter-icon.png";
</script>
<template>
    <div class="hidden mt-16 flex-col h-72 bg-gray-700/40 rounded-md sm:flex xl:w-[300px]">
        <div class="w-full h-20 bg-green-500 rounded-md">
        </div>

        <div class="space-y-2 grid-center">
            <div class="bg-blue-200 w-20 h-20 -mt-10 rounded-full">
                <img :src="TwitterIcon" alt="Twitter" class="h-18 w-18">
            </div>

            <div class="space-y-2">
                <div class="text-center space-y-2">
                    <h3>Username</h3>
                    <h4 class="text-gray-400">@username</h4>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>

                <div class="flex-between">
                    <h3 class="text-gray-400">0 following</h3>
                    <h3 class="text-gray-400">0 followers</h3>
                </div>

            </div>

            <div>
                <h4 class="text-[#03A9F4] hover:font-bold cursor-pointer">My Profile</h4>
            </div>
        </div>
    </div>
</template>