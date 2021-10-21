<script setup lang='ts'>
const props = defineProps(["name"])
</script>

<template>
    <svg class="icon absolute bottom-1 right-0" aria-hidden="true">
        <use :xlink:href="props.name" />
    </svg>
</template>
