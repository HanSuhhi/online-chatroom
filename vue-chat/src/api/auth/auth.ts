import { AxiosPromise } from "axios";
import api from "../api";

export type RegistForm = {
  username: string;
  password: string;
  repassword?: string;
  captchaId: string;
  captchaText: string;
};

export type Captcha = {
  id: string;
  data: string;
};

export type CheckCaptcha = {
  captchaId: string;
  captchaText: string;
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

export const checkCaptcha = (
  checkCaptcha: CheckCaptcha,
): AxiosPromise<boolean | string> =>
  api({
    url: "/auth/checkCaptcha",
    method: "POST",
    data: checkCaptcha,
  });

export const checkUsername = (
  username: string,
): AxiosPromise<boolean | string> =>
  api({
    url: `/auth/${username}`,
    method: "GET",
  });
