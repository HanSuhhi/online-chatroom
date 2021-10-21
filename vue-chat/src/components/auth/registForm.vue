<script setup lang="ts">
import { computed, reactive } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { ref } from "vue";
import {
  Captcha,
  checkCaptcha,
  checkUsername,
  getCAPTCHA,
  RegistForm,
  sendRegist,
} from "../../api/auth/auth";
import { changeAuthComponent, authStatus } from "../../store/auth.store";
import FormTitle from "./sub/formTitle.vue";
import PasswordStrength from "./sub/passwordStrength.vue";
import FormItem from "./sub/formItem.vue";
import formChecker from "../../utils/form.util";

// 验证码相关
let svgCaptcha: Captcha = reactive({
  id: "",
  data: "",
});
const getCaptcha = () =>
  getCAPTCHA().then((res) => {
    const { data, id } = res.data;
    svgCaptcha.data = data;
    svgCaptcha.id = id;
    registForm.captchaId = id;
  });
onMounted(getCaptcha);

// 密码强度相关
const isPasswordFocus = ref(false);
const changePasswordFocus = () => {
  isPasswordFocus.value = !isPasswordFocus.value;
};

// 注册相关
const registForm: RegistForm = reactive({
  username: "",
  password: "",
  repassword: "",
  captchaId: "",
  captchaText: "",
});
const regist = async () => {
  const formdata = JSON.parse(JSON.stringify(registForm))
  delete formdata.repassword

  if (await watchRegistForm(registForm)) {
    sendRegist(formdata).then((res) => {
      alert(`${res.data} 用户注册成功`)
      changeAuthComponent(authStatus.login.symbol)
    });
  } else {
    console.log("存在错误");
  }
};

/** 组件传值相关 */
export type FormItemValue = {
  value: string;
  logo: keyof RegistForm | string;
};
const getValue = ({ value, logo }: FormItemValue) => {
  registForm[logo as keyof RegistForm] = value;
};

/**  处理输入错误，表单规则校验 */
const inputErrors = reactive({
  username: {
    status: false,
    msg: "",
  },
  password: {
    status: false,
    msg: "",
  },
  repassword: {
    status: false,
    msg: "",
  },
  captcha: {
    status: false,
    msg: "",
  },
});
const haveError = computed(() => !inputErrors.captcha.status && !inputErrors.password.status && !inputErrors.repassword.status && !inputErrors.username.status)

type ErrorKeys = keyof typeof inputErrors;

const resetError = (k: ErrorKeys) => {
  inputErrors[k].status = false;
  inputErrors[k].msg = "";
};
const dealCheckerResult = (res: string | boolean, key: ErrorKeys): void => {
  if (typeof res === "string") {
    inputErrors[key].msg = res;
    inputErrors[key].status = true;
  } else resetError(key);
};

const watchRegistForm = async (nv: RegistForm): Promise<boolean> => {
  // 1. 是否存在账号
  if (nv.username.length > 0) {
    const username = await formChecker.checkUsername(nv.username);
    dealCheckerResult(username, "username");
    const username2 = (await checkUsername(nv.username)).data;
    dealCheckerResult(username2, "username");
  } else resetError("username");

  // 2. 密码是否过于简单
  if (nv.password.length > 0) {
    const password = await formChecker.checkPassword(nv.password);
    dealCheckerResult(password, "password");
  } else resetError("password");

  // 3. 确认密码是否相同
  if (nv.repassword && nv.repassword?.length > 0) {
    const repassword = await formChecker.checkRepassword(nv.repassword, nv.password)
    dealCheckerResult(repassword, "repassword")
  } else resetError("repassword")

  // 4. 验证码是否正确
  if (nv.captchaText.length > 0) {
    if (nv.captchaText.length !== 4) {
      inputErrors.captcha.status = true;
      return false
    }
    const { captchaId, captchaText } = nv
    const captcha = (await checkCaptcha({ captchaId, captchaText })).data
    dealCheckerResult(captcha, 'captcha')
  } else resetError("captcha")

  return haveError.value
};
watch(registForm, watchRegistForm);
</script>

<template>
  <TransitionGroup name="list-complete" tag="form" class="mt-8 space-y-6" action="#" method="POST">
    <FormTitle title="初次光临" class="list-complete-item" key="1"></FormTitle>
    <!-- 账号 -->
    <FormItem
      :value="registForm.username"
      :error="inputErrors.username.status"
      :warning="inputErrors.username.msg"
      showLength
      maxlength="20"
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
        :error="inputErrors.password.status"
        :warning="inputErrors.password.msg"
        showLength
        maxlength="20"
        clearable
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
      :error="inputErrors.repassword.status"
      :warning="inputErrors.repassword.msg"
      showLength
      clearable
      maxlength="20"
      title="确认密码"
      logo="repassword"
      type="password"
      class="list-complete-item"
      key="4"
      @post-value="getValue"
    ></FormItem>
    <!-- 验证码 -->
    <div class="flex justify-between list-complete-item" key="5">
      <FormItem
        :value="registForm.password"
        :error="inputErrors.captcha.status"
        :warning="inputErrors.captcha.msg"
        logo="captchaText"
        title="验证码"
        maxlength="4"
        @post-value="getValue"
      ></FormItem>
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
