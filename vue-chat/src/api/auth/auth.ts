import { AxiosPromise } from "axios";
import api from "../api";

export type RegistForm = {
  username: string;
  password: string;
  captchaId: string;
  captchaText: string;
};

export type Captcha = {
  id: string;
  data: string;
};

export const getCAPTCHA = (): AxiosPromise<Captcha> =>
  api({
    url: "/auth/captcha",
    method: "get",
  });

export const sendRegist = (registForm: RegistForm): AxiosPromise<string> =>
  api({
    url: "/auth/regist",
    method: "POST",
    data: registForm,
  });
