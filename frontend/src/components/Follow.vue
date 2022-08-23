<script setup>
import { follow } from '../db/db';
</script>
<template>
  <div class="w-full">
    <div class="py-2">
      <h2 class="text-white font-bold text-center text-xl">Who to follow</h2>
    </div>
    <div v-for="user in follow" :key="user.id"
      className="w-72 ml-2 hover:bg-gray-700/30 hover:rounded-md py-2 px-3 cursor-pointer transition duration-200 ease-out flex-between">
      <div class="flex-center w-full">
        <div>
          <img :src="user.img" class="rounded-full w-10 h-10" />
        </div>

        <div className="ml-4 leading-5">
          <h4 className="font-bold text-sm text-white">
            {{ user.username }}
          </h4>
          <h5 className="text-gray-500 text-[15px]">{{ user.tag }}</h5>
        </div>
      </div>

      <div>
        <button
          className="ml-10 bg-white hover:bg-black hover:text-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
          Follow
        </button>
      </div>
    </div>

    <div class="px-10 mt-1">
      <p class="text-[#03A9F4] hover:font-bold cursor-pointer">Show more</p>
    </div>
  </div>
</template>