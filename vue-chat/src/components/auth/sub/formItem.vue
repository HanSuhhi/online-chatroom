<script setup lang='ts'>
import { computed, onMounted, ref, watch } from 'vue';
import { FormItemValue } from '../registForm.vue';
import Iconfont from '../../common/iconfont.vue';

const init = defineProps(["type", "value", "title", "logo", "error", "clearable", "warning", "showLength", "maxlength"])
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
const type = computed(() => init.type ? init.type : "text");

// 样式相关
const input = ref()
const fixInputStyle = () => inputValue.value ? input.value.classList.add("filled") : input.value.classList.remove("filled")

// 清空input
const clearInput = () => {
    inputValue.value = ""
    fixInputStyle()
}

// 错误处理
const isError = computed(() => init.error)
watch(isError, () => {
    if (isError.value) {
        input.value.classList.remove("focus:border-indigo-600")
        input.value.classList.add("border-red-300")
    } else {
        input.value.classList.remove("border-red-300")
        input.value.classList.add("focus:border-indigo-600")
    }
})

// 控制clearable
const isClearable = computed(() => typeof init.clearable === 'string' && inputValue.value.length > 0)

// 字数显示
const isFocus = ref(false)
const changeFocus = () => isFocus.value = !isFocus.value
const showLength = computed(() => typeof init.showLength === 'string' && inputValue.value.length > 0 && isFocus.value)
</script>

<template>
    <div class="mb-4 relative w-full">
        <input
            ref="input"
            class="input border-b appearance-none w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
            :type="type"
            @focusin="haveFocus('focusin'); changeFocus()"
            @focusout="haveFocus('focusout'); changeFocus()"
            @keyup="fixInputStyle"
            :maxlength="init.maxlength"
            autocomplete="off"
            v-model="inputValue"
            autofocus
        />
        <label
            class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
        >
            {{ init.title }}
            <transition name="right">
                <span
                    v-if="showLength"
                    class="text-gray-400 text-xs inline-flex"
                >{{ `${inputValue.length} / ${maxlength}` }}</span>
            </transition>
        </label>
        <transition name="line">
            <span
                v-if="init.warning"
                class="absolute bottom-1 right-10 text-xs text-red-400"
            >{{ init.warning }}</span>
        </transition>
        <Iconfont
            v-if="isClearable"
            name="#icon-clear"
            @click="clearInput"
            class="hover:text-yellow-400 cursor-pointer transition-all text-gray-400"
        ></Iconfont>
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
.line {
    &-enter-active {
        transition: all 0.3s ease-out;
    }
    &-leave-active {
        transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
    }
    &-enter-from,
    &-leave-to {
        transform: translateY(5px);
        opacity: 0;
    }
}
.right {
    &-enter-active {
        transition: all 0.8s ease-out;
    }
    &-leave-active {
        transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
    }
    &-enter-from,
    &-leave-to {
        transform: translateX(-10px);
        opacity: 0;
    }
}
.label {
    transition: all 0.2s ease-out;
    top: 0.8rem;
    left: 0;
    pointer-events: none;
}
</style>