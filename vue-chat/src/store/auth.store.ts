import { reactive } from "vue";

type AuthStatus = {
  symbol: symbol;
  onShow: boolean;
};

export const authStatus: { [status: string]: AuthStatus } = reactive({
  login: { symbol: Symbol("login"), onShow: false },
  regist: { symbol: Symbol("regist"), onShow: true },
});

export const changeAuthComponent = (auth: symbol) => {
  for (const [k, status] of Object.entries(authStatus)) {
    status.onShow = false;
    if (auth === status.symbol) {
      status.onShow = true;
    }
  }
};
