<script setup lang='ts'>
import { computed, onMounted, ref, watch } from 'vue';
import { FormItemValue } from '../registForm.vue';

const init = defineProps(["type", "value", "title", "logo"])
const emit = defineEmits(["focusin", "focusout", "postValue"])

// focus相关（密码强度）
const haveFocus = (type: string) => {
    if (type === 'focusin') emit("focusin")
    else emit("focusout")
}

// 初始化并返回组件值
const inputValue = ref("")
onMounted(() => inputValue.value = init.value)
watch(inputValue, (nv) => {
    let value: FormItemValue = { value: nv, logo: init.logo }
    emit("postValue", value)
})

// 标签类型
const type = computed(() => {
    let t = init.type ? init.type : "text"
    return t
})

// 样式相关
const input = ref()
const fixInputStyle = () => {
    if (inputValue.value) input.value.classList.add("filled")
    else input.value.classList.remove("filled")
}

</script>

<template>
    <div class="mb-4 relative w-full">
        <input
            ref="input"
            class="input border-b appearance-none w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
            :type="type"
            @focusin="haveFocus('focusin')"
            @focusout="haveFocus('focusout')"
            @keyup="fixInputStyle"
            autocomplete="off"
            v-model="inputValue"
            autofocus
        />
        <label
            class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
        >{{ init.title }}</label>
        <svg class="icon absolute bottom-1 right-0" aria-hidden="true">
            <use xlink:href="#icon-clear" />
        </svg>
    </div>
</template>

<style scoped lang="scss">
.input {
    transition: border 0.2s ease-in-out;
    &:focus + .label,
    &:active + .label,
    &.filled + .label {
        font-size: 0.75rem;
        transition: all 0.2s ease-in;
        top: -0.8rem;
        color: #667eea;
    }
}

.label {
    transition: all 0.2s ease-out;
    top: 0.8rem;
    left: 0;
    pointer-events: none;
}
</style>