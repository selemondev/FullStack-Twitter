<script setup>
import { PhotographIcon, CalendarIcon, XIcon, EmojiHappyIcon } from "@heroicons/vue/outline";
import TwitterIcon from "../assets/twitter-icon.png";
import { useToast } from "vue-toastification";
import EmojiPicker from "vue3-emoji-picker";
import "../../node_modules/vue3-emoji-picker/dist/style.css";
import { ref } from "vue";
const inputEl = ref("");
const showEmojis = ref(false);
const loading = ref(false);
const selectedImage = ref("");
const blob = ref("");
const toast = useToast();
function showEmoji(emoji) {
  inputEl.value += emoji.i;
};
const fileUpload = () => {
  const target = event.target;
  const file = target.files[0];
  selectedImage.value = file;
  blob.value = URL.createObjectURL(file);
};
function removeSelectedImage() {
  selectedImage.value = null;
};
async function sendTweet() {
};
</script>
<template>
  <div
    :class="[loading ? ' flex p-3 bg-[#0f131a]  space-x-3 opacity-60' : 'flex bg-[#0f131a] rounded-md p-3 space-x-3']">
    <div>
      <img :src="TwitterIcon" class="h-11 w-11 rounded-full mr-4" />
    </div>
    <div class="w-full">
      <div>
        <input v-model="inputEl" placeholder="What's happening?"
          class="w-full min-h-[52px] text-lg tracking-wide bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400 " />
        <div v-if="selectedImage">
          <div class="relative">
            <div
              class="absolute w-8 h-8 bg-black bg-opacity-75 hover:bg-gray-800 rounded-full cursor-pointer flex items-center justify-center top-1 left-1">
              <XIcon @click="removeSelectedImage()" class="h-5 w-5 text-white" />
            </div>
            <img :src="blob" alt="image" width="200" height="200">
          </div>
        </div>
      </div>

      <div v-if="!loading">
        <div class="flex justify-between items-center pt-2">
          <div class="flex items-center space-x-2 md:space-x-4">
            <div class="w-10 h-10 bg-gray-900 hover:bg-gray-800 cursor-pointer rounded-full border border-gray-700 grid-center md:w-28 md:h-10">
              <label for="fileUpload" class="flex-center space-x-2">
                <PhotographIcon class="icon-style text-green-500 h-[22px]" />
                <h4 class="hidden md:block">Photo</h4>
              </label>
              <input type="file" @change="fileUpload" hidden name="fileUpload" id="fileUpload" accept="image/*" />
            </div>

            <div
              class="icon-style w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-full border border-gray-700 grid-center md:w-28 md:h-10">
              <div class="flex-center space-x-2" @click="showEmojis = !showEmojis">
                <EmojiHappyIcon class="text-yellow-500 h-[22px]" />
                <h4 class="hidden md:block">Emoji</h4>
              </div>
            </div>

            <div v-if="showEmojis" class="absolute top-44">
              <EmojiPicker @select="showEmoji" />
            </div>


            <div
              class="icon-style w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-full border border-gray-700 grid-center md:w-28 md:h-10">
              <div class="flex-center space-x-2">
                <CalendarIcon class="text-[#1d9bf0] h-[22px]" />
                <h4 class="hidden md:block">Calendar</h4>
              </div>
            </div>
          </div>
          <div>
            <button :disabled="!inputEl"
              class="bg-[#1d9bf0] text-white rounded-full shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default px-4 py-1.5 font-bold"
              @click="sendTweet()">Tweet</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
