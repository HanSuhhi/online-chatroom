<script setup lang='ts'>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { ref } from 'vue';
import { Captcha, getCAPTCHA, RegistForm, sendRegist, } from '../../api/auth/auth';
import { changeAuthComponent, authStatus } from '../../store/auth.store';
import FormTitle from './sub/formTitle.vue';
import PasswordStrength from './sub/passwordStrength.vue';
import FormItem from './sub/formItem.vue';

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
const changePasswordFocus = () => {
  isPasswordFocus.value = !isPasswordFocus.value
}

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

// 组件传值相关
export type FormItemValue = {
  value: string;
  logo: keyof RegistForm | string
}
const getValue = ({ value, logo }: FormItemValue) => {
  if (logo === 'repassword') return
  registForm[logo as keyof RegistForm] = value
}

onMounted(getCaptcha)

</script>

<template>
  <TransitionGroup name="list-complete" tag="form" class="mt-8 space-y-6" action="#" method="POST">
    <FormTitle title="初次光临" class="list-complete-item" key="1"></FormTitle>
    <!-- 账号 -->
    <FormItem
      :value="registForm.username"
      title="账号"
      class="list-complete-item"
      logo="username"
      key="2"
      @post-value="getValue"
    ></FormItem>
    <!-- 密码 -->
    <div class="list-complete-item" key="3">
      <FormItem
        :value="registForm.password"
        title="密码"
        logo="password"
        type="password"
        @focusin="changePasswordFocus"
        @focusout="changePasswordFocus"
        @post-value="getValue"
      ></FormItem>
      <PasswordStrength :password="registForm.password" v-show="isPasswordFocus"></PasswordStrength>
    </div>
    <!-- 确认 -->
    <FormItem
      :value="registForm.password"
      title="确认密码"
      logo="repassword"
      type="password"
      class="list-complete-item"
      key="4"
      @post-value="getValue"
    ></FormItem>
    <!-- 验证码 -->
    <div class="flex justify-between list-complete-item" key="5">
      <FormItem :value="registForm.password" logo="captchaText" title="验证码" @post-value="getValue"></FormItem>
      <div v-html="svgCaptcha.data" @click="getCaptcha"></div>
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