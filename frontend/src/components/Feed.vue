<script setup>
import FeedInput from './FeedInput.vue';
import Post from "./Post.vue";
</script>
<template>
    <div class="flex-grow max-w-2xl mt-16 sm:ml-[73px] xl:ml-[310px]">
        <FeedInput class="xl:w-[600px]" />
        <Post/>
         <Post/>
    </div>
</template>