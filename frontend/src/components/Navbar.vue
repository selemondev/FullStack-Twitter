<script setup>
import TwitterIcon from "../assets/twitter-icon.png";
import { BellIcon, MailIcon, SunIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
const isOpen = ref(false);
const handleClick = () => {
    return isOpen.value = !isOpen.value;
}
</script>
<template>
    <div>
        <header>
            <nav class="flex-between fixed bg-black border-b border-gray-900 px-4 w-full h-14">
                <div class="flex-center space-x-2">
                    <div>
                         <router-link to="/home">
                            <img :src="TwitterIcon" alt="Twitter" class="w-10 h-10 cursor-pointer" />
                         </router-link>
                    </div>

                    <div>
                        <input type="search" class="search-input" placeholder="Search Twitter" required/>
                    </div>
                </div>

                <div class="hidden md:block">
                    <div class="flex-center space-x-4">
                        <SunIcon class="icon-style" />
                        <MailIcon class="icon-style" />
                        <BellIcon class="icon-style" />
                        <div class="relative inline-block ">
                            <!-- Dropdown toggle button -->
                            <button @click="handleClick()"
                                class="relative z-10 block text-white border border-transparent rounded-md dark:text-white focus:ring-opacity-40 dark:focus:ring-opacity-40 dark:bg-gray-800 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>

                            <!-- Dropdown menu -->
                            <div v-show="isOpen"
                                class="absolute right-0 z-20 w-48 py-2 mt-2 rounded-md shadow-xl bg-gray-900">
                                <a href="#"
                                    class="block px-4 py-3 text-sm text-gray-300 hover:text-gray-200  duration-200 ">
                                    Profile
                                </a>

                                <a href="#"
                                    class="block px-4 py-3 text-sm text-gray-300 hover:text-gray-200  duration-200 ">
                                    Bookmarks
                                </a>

                                <a href="#"
                                    class="block px-4 py-3 text-sm text-gray-300 hover:text-gray-200  duration-200 ">
                                    LogOut
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>

                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>