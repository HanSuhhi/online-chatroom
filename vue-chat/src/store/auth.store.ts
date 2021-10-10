import { ref } from "vue";

export const authStatus = {
  login: Symbol("login"),
  regist: Symbol("regist"),
};

export const showAuthComponent = ref(authStatus.login);

export const changeAuthComponent = (auth: symbol) => {
  if (auth === authStatus.login || auth === authStatus.regist)
    showAuthComponent.value = auth;
  else return;
};
