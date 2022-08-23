<script setup>
import SideProfile from '../components/SideProfile.vue';
import Widget from '../components/Widget.vue';
import ProfileContainer from "../components/ProfileContainer.vue";
</script>
<template>
    <div class="flex">
        <SideProfile/>
        <div class="flex-grow max-w-2xl mt-16 sm:ml-[73px] xl:ml-[310px]">
            <div class="bg-gray-700/40 h-[510px] xl:w-[600px]">
                <ProfileContainer/>
            </div>
        </div>
        <Widget/>
    </div>
</template>