<script setup lang='ts'>
const props = defineProps(["title"])

</script>

<template>
    <div>
        <div class="text-center">
            <h2 class="mt-6 text-3xl font-bold text-gray-900">{{ props.title }}</h2>
        </div>
        <div class="flex items-center justify-center space-x-2">
            <span class="h-px w-16 bg-gray-200" v-for="item in 4"></span>
        </div>
    </div>
</template>
