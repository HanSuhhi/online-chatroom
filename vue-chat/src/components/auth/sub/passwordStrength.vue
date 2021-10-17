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
    0: { text: "危", color: "bg-red-400" },
    1: { text: "弱", color: "bg-yellow-400" },
    2: { text: "中", color: "bg-blue-400" },
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
    <transition-group
        tag="div"
        name="list-complete"
        class="password-strength flex items-center"
        v-if="props.password"
    >
        <span
            class="text-gray-400 mr-1 text-xs font-normal list-part list-completeitem"
            key="100"
        >{{ strength.text }}</span>
        <div :class="`list-complete-item ${strength.style}`" v-for="_ in strength.level" :key="_"></div>
    </transition-group>
</template>

<style scoped lang="scss">
.list-complete {
    &-item {
        transition: all 0.4s ease;
    }
    &-enter-from,
    &-leave-to {
        opacity: 0;
    }
    &-enter-form {
        transform: translateX(-25%);
    }
    &-leave-to {
        transform: translateX(25%);
    }
}
</style>