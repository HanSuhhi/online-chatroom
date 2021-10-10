<script setup lang='ts'>
import bg from "../../assets/auth-bg.jpg"
</script>

<template>
    <div
        class="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
        :style="`background-image: url(${bg})`"
    >
        <div class="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
        <div class="w-full max-w-md z-10">
            <div class="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                山坞
                <span class="text-3xl">Chat</span>
            </div>
            <div class="sm:text-sm xl:text-md text-gray-200 font-normal">云深山坞，烟冷江皋，人生未易相逢。</div>
        </div>
        <ul class="circles">
            <li v-for="circle in 10"></li>
        </ul>
    </div>
</template>

<style scoped>
</style>