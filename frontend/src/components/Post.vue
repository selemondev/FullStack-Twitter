<script setup>
import { DotsHorizontalIcon, ShareIcon } from "@heroicons/vue/outline";
import { HeartIcon, ChatIcon  } from "@heroicons/vue/solid";
import TwitterIcon from "../assets/twitter-icon.png";
</script>
<template>
    <div class="p-2 flex cursor-pointer bg-gray-700/40 rounded-xl mt-2 ">
        <img :src="TwitterIcon" alt="twitter" class="h-11 w-11 rounded-full mr-4" />
        <div class="flex flex-col space-y-1 w-full">
            <div class="flex justify-between items-center">
                <div>
                    <div class="inline-block">
                        <h4 class="text-[15px] sm:text-base inline-block">
                            username
                            <span class="text-sm dark:text-gray-400 text-gray-600 ml-2">
                                @username
                                <!-- <timeago :datetime="props.timeStamp?.toDate()" :auto-update="60"></timeago> -->
                            </span>
                        </h4>
                        <p class="text-sm text-gray-600">2hrs ago</p>
                        <div>
                            <h3 class="dark:text-white text-[20px] mt-2 mb-2">Lorem ipsum dolor sit amet.</h3>
                        </div>
                        <div class="grid-center w-[500px] bg-red-500 text-center">
                            <img :src="TwitterIcon || ''" alt="Twitter"
                                class="max-h-[200px] object-cover mr-2 rounded-xl" />
                        </div>

                    </div>
                </div>
                <DotsHorizontalIcon class="text-gray-600 h-7 w-7 self-start" />
            </div>

            <div class="text-[#6e767d] py-2 flex justify-between xl:w-[420px] w-[250px]">
                <div class="flex items-center space-x-1 group">
                    <div
                        class="icon-style w-10 h-10 bg-gray-800 hover:bg-gray-900 grid-center cursor-pointer rounded-lg  grid-center md:w-28 md:h-10">
                        <div class="flex-center space-x-3">
                            <HeartIcon class="w-6 h-6" />
                            <p>Like</p>
                        </div>
                    </div>
                </div>

                 <div>
                    <div
                        class="icon-style w-10 h-10 bg-gray-800 hover:bg-gray-900 grid-center cursor-pointer rounded-lg  grid-center md:w-28 md:h-10">
                        <div class="flex-center space-x-1">
                            <ChatIcon class="w-6 h-6"/>
                            <p>Comment</p>
                        </div>
                    </div>
                </div>

                <div class="icon-style group">
                    <div
                        class="icon-style w-10 h-10 bg-gray-800 hover:bg-gray-900 grid-center cursor-pointer rounded-lg  grid-center md:w-28 md:h-10">
                        <div class="flex-center space-x-3">
                            <ShareIcon class="w-6 h-6"/>
                            <p>Share</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>