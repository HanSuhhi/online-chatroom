import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/db/schemas/user.schema";
import { Captcha, RegistUserDto } from "./dto/regist-user.dto";
import * as svgCaptcha from "svg-captcha";

@Injectable()
export class AuthService {
  private captchas: Map<string, Captcha> = new Map();

  constructor(
    @InjectModel("USER_MODEL") private readonly userModel: Model<User>,
  ) {}

  /**
   * @description 返回验证码
   * @date 06/10/2021
   * @returns {*}  {Captcha}
   * @memberof AuthService
   */
  public genCaptcha(): Captcha {
    let getdiffCaptcha = false;
    let c: svgCaptcha.CaptchaObj;
    // 直到生成captchas中没有的验证码
    while (!getdiffCaptcha) {
      c = svgCaptcha.create();
      if (!this.captchas.has(c.text)) {
        const captcha = Object.assign(c, { time: new Date() });
        getdiffCaptcha = true;
        this.captchas.set(c.text, captcha);
      }
    }
    return this.captchas.get(c.text);
  }

  public registUser(registUserDto: RegistUserDto) {
    // 1. 检查验证码是否过期
    // 2. 检查验证码是否正确
    // 3. 检查用户名是否已注册
    // 4. 检查密码是否过于简单
    // 5. 注册用户
  }
}
