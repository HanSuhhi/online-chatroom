<script setup lang='ts'>
import "../styles/auth.css"
import LoginForm from "../components/auth/loginForm.vue";
import RegistForm from '../components/auth/registForm.vue'
import { authStatus, showAuthComponent } from "../store/auth.store";
import AuthBg from "../components/auth/authBg.vue";
showAuthComponent.value
</script>

<template>
    <div class="relative min-h-screen flex">
        <div
            class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white"
        >
            <!-- 左图 -->
            <AuthBg></AuthBg>
            <!-- 登录表单 -->
            <div
                class="md:flex md:items-center md:justify-center sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white"
            >
                <div class="max-w-md w-full mx-auto space-y-8">
                    <!-- 欢迎回来 -->
                    <div class="text-center">
                        <h2 class="mt-6 text-3xl font-bold text-gray-900">欢迎回来</h2>
                    </div>
                    <div class="flex items-center justify-center space-x-2">
                        <span class="h-px w-16 bg-gray-200" v-for="item in 4"></span>
                    </div>
                    <Transition name="fade" mode="out-in">
                        <LoginForm v-if="showAuthComponent === authStatus.login"></LoginForm>
                        <RegistForm v-else-if="showAuthComponent === authStatus.regist"></RegistForm>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: 0.5s;
    transform: translateX(0%);
}

.fade-enter-from {
    transform: translateX(10%);
    opacity: 0.2;
}
.fade-leave-to {
    transform: translateX(-10%);
    opacity: 0.2;
}
</style>