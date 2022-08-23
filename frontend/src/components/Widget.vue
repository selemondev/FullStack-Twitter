<script setup>
import Follow from './Follow.vue';
import Trending from './Trending.vue';
</script>
<template>
    <div class="hidden lg:inline ml-3 bg-gray-700/40 h-full mt-16 xl:w-[450px]">
        <div class="w-full rounded-md">
            <div class="py-2.5 ml-2">
                <h3 class="text-xl font-bold">Trends for you</h3>
            </div>
            <Trending />
        </div>
    </div>

</template>