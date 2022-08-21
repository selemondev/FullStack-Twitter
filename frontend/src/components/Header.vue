<script setup>
import TwitterIcon from "../assets/twitter-icon.png";
</script>
<template>
    <div>
        <header>
            <nav class="w-full flex-between px-4 h-14">
                <div>
                    <img :src="TwitterIcon" alt="Twitter" class="w-10 h-10">
                </div>

                <div>
                    <button class="py-2 px-4 bg-[#03A9F4] cursor-pointer text-white rounded-md hover:bg-[#0b9fe3] md:py-2 md:px-6"><router-link to="/">Login</router-link></button>
                </div>
            </nav>
        </header>
    </div>
</template>