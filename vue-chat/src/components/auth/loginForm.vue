<script setup lang='ts'>
import { changeAuthComponent, authStatus } from '../../store/auth.store';
import FormTitle from './formTitle.vue';
</script>

<template>
    <form class="mt-8 space-y-6" action="#" method="POST">
        <FormTitle title="欢迎回来"></FormTitle>
        <div class="relative">
            <label class="login-form-label">账号</label>
            <input class="login-form-input" placeholder="请输入账号" />
        </div>
        <div class="mt-8 content-center">
            <label class="login-form-label">密码</label>
            <input class="login-form-input" placeholder="请输入密码" />
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label for="remember_me" class="ml-2 block text-sm text-gray-900">记住我</label>
            </div>
            <div class="text-sm">
                <a href="#" class="text-indigo-400 hover:text-blue-500">忘记密码？</a>
            </div>
        </div>
        <div>
            <button
                type="submit"
                class="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
            >登 录</button>
        </div>
        <p class="items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>还没有账号？</span>
            <a
                class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                @click="changeAuthComponent(authStatus.regist.symbol)"
            >立即注册</a>
        </p>
    </form>
</template>
<style scoped>
.login-form-label {
    @apply ml-3 text-sm font-bold text-gray-700 tracking-wide ml-3 text-sm font-bold text-gray-700 tracking-wide;
}
.login-form-input {
    @apply w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500;
}
</style>
