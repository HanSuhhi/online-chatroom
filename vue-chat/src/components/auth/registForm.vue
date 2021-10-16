<script setup lang='ts'>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { ref } from 'vue';
import { Captcha, getCAPTCHA, RegistForm, sendRegist, } from '../../api/auth/auth';
import { changeAuthComponent, authStatus } from '../../store/auth.store';
import FormTitle from './formTitle.vue';
import PasswordStrength from './passwordStrength.vue';

// 验证码相关
let svgCaptcha: Captcha = reactive({
  id: "",
  data: ""
})

const getCaptcha = () => getCAPTCHA().then((res) => {
  const { data, id } = res.data
  svgCaptcha.data = data;
  svgCaptcha.id = id;
  registForm.captchaId = id
})

// 密码强度相关
const isPasswordFocus = ref(false)
const changePasswordFocus = () => isPasswordFocus.value = !isPasswordFocus.value

// 注册相关
const registForm: RegistForm = reactive({
  username: "",
  password: "",
  captchaId: "",
  captchaText: ""
})

const regist = () => {
  sendRegist(registForm).then(res => {
    console.log(res);
  })
}

onMounted(getCaptcha)

</script>

<template>
  <TransitionGroup name="list-complete" tag="form" class="mt-8 space-y-6" action="#" method="POST">
    <FormTitle title="初次光临" class="list-complete-item" key="1"></FormTitle>
    <!-- 账号 -->
    <div class="relative list-complete-item" key="2">
      <label class="login-form-label">账号</label>
      <input class="login-form-input" placeholder="请输入账号" v-model="registForm.username" />
    </div>
    <!-- 密码 -->
    <div class="mt-8 content-center list-complete-item" key="3">
      <label class="login-form-label">密码</label>
      <input
        @focusin="changePasswordFocus"
        @focusout="changePasswordFocus"
        class="login-form-input"
        placeholder="请输入密码"
        type="password"
        autocomplete="on"
        v-model="registForm.password"
      />
      <PasswordStrength :password="registForm.password" v-show="isPasswordFocus"></PasswordStrength>
    </div>
    <!-- 确认 -->
    <div class="mt-8 content-center list-complete-item" key="4">
      <label class="login-form-label">确认密码</label>
      <input class="login-form-input" autocomplete="on" type="password" placeholder="请确认密码" />
    </div>
    <!-- 验证码 -->
    <div class="mt-8 content-center list-complete-item" key="5">
      <label class="login-form-label">验证码</label>
      <div class="flex">
        <input class="login-form-input" placeholder="请输入验证码" v-model="registForm.captchaText" />
        <div v-html="svgCaptcha.data" @click="getCaptcha"></div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="list-complete-item" key="6">
      <button
        type="button"
        class="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
        @click="regist"
      >注 册</button>
    </div>
    <!-- 说明 -->
    <p
      class="items-center justify-center mt-10 text-center text-md text-gray-500 list-complete-item"
      key="7"
    >
      <span>已有账号？</span>
      <a
        class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
        @click="changeAuthComponent(authStatus.login.symbol)"
      >立即登录</a>
    </p>
  </TransitionGroup>
</template>
<style scoped lang="scss">
.login-form-la .login-form-label {
  @apply ml-3 text-sm font-bold text-gray-700 tracking-wide ml-3 text-sm font-bold text-gray-700 tracking-wide;
}
.login-form-input {
  @apply w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500;
}
.list-complete {
  &-item {
    transition: all 0.4s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>