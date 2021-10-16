<script setup lang='ts'>
import "../styles/auth.css"
import LoginForm from "../components/auth/loginForm.vue";
import RegistForm from '../components/auth/registForm.vue'
import { authStatus } from "../store/auth.store";
import AuthBg from "../components/auth/authBg.vue";
</script>

<template>
    <div class="auth">
        <div class="auth-box">
            <!-- 左图 -->
            <AuthBg></AuthBg>
            <!-- 登录表单 -->
            <div class="auth-box-login">
                <div class="auth-box-login-box">
                    <Transition name="fade" mode="out-in">
                        <LoginForm v-if="authStatus.login.onShow"></LoginForm>
                        <RegistForm v-else-if="authStatus.regist.onShow"></RegistForm>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.auth {
    @apply relative min-h-screen flex;
    &-box {
        @apply flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white;
        &-login {
            @apply md:flex md:items-center md:justify-center sm:w-auto md:h-full w-full md:w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white;
            &-box {
                @apply max-w-md w-full mx-auto space-y-8;
            }
        }
    }
}
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