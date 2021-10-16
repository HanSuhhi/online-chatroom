<script setup lang='ts'>
import { computed } from "@vue/reactivity";
import { passwordStrength } from "check-password-strength";
type Strength = {
    level: number;
    style: string;
    text: string;
}
type Translation = {
    text: string;
    color: string;
}

const props = defineProps(["password"])


let translate: { [value: string]: Translation } = {
    0: { text: "极弱", color: "bg-red-400" },
    1: { text: "弱", color: "bg-yellow-400" },
    2: { text: "中等", color: "bg-blue-400" },
    3: { text: "强", color: "bg-green-400" }
}

const strength = computed(() => {
    const { id: level } = passwordStrength(props.password)
    const translation = translate[level]
    let strength: Strength = {
        level: level + 1,
        text: translation.text,
        style: `w-1/4 h-1.5 rounded-md ${translation.color}`
    }
    return strength
})

</script>

<template>
    <div class="password-strength flex items-center" v-if="props.password">
        <div :class="strength.style" v-for="_ in strength.level"></div>
        <span class="text-gray-400 ml-1 text-xs font-normal">{{ strength.text }}</span>
    </div>
</template>

<style scoped>
</style>