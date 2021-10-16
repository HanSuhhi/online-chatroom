import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/db/schemas/user.schema";
import { backCaptcha, Captcha, RegistUserDto } from "./dto/regist-user.dto";
import * as svgCaptcha from "svg-captcha";
import { nanoid } from "nanoid";
import { passwordStrength } from "check-password-strength";
import * as bcrypt from "bcryptjs";

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
  public genCaptcha(): backCaptcha {
    let getdiffCaptcha = false;
    let c: svgCaptcha.CaptchaObj;
    let captcha: Captcha;
    // 直到生成captchas中没有的验证码
    while (!getdiffCaptcha) {
      c = svgCaptcha.create();
      if (!this.captchas.has(c.text)) {
        // 生成验证码
        let id = nanoid(6);
        captcha = Object.assign(c, { time: new Date(), id });
        getdiffCaptcha = true;
        this.captchas.set(id, captcha);
      }
    }
    const returnCaptcha: Captcha = JSON.parse(JSON.stringify(captcha));
    delete returnCaptcha.text;
    return returnCaptcha;
  }

  public registUser(registUserDto: RegistUserDto): Promise<string> {
    return (
      Promise.resolve(registUserDto)
        // 1. 检查验证码是否过期
        .then((res) => {
          const captcha = this.captchas.get(res.captchaId);
          // 检查
          if (new Date().getTime() - captcha.time.getTime() > 30 * 60 * 1000) {
            throw "验证码过期";
          }
          return { registUserDto: res, captcha };
        })
        // 2. 检查验证码是否正确
        .then((res) => {
          if (
            res.registUserDto.captchaText.toLowerCase() !==
            res.captcha.text.toLowerCase()
          ) {
            throw "验证码错误";
          }
          return res.registUserDto;
        })
        // 3. 检查用户名是否已注册
        .then(async (res) => {
          const user = await this.userModel
            .findOne({ username: res.username })
            .exec();
          if (user) {
            throw "用户名已注册";
          }
          return res;
        })
        // 4. 检查密码是否过于简单
        .then((res) => {
          const pwdStrength = passwordStrength(res.password);
          if (
            pwdStrength.value === "Strong" ||
            pwdStrength.value === "Medium"
          ) {
            return res;
          }
          throw "密码过于简单，请使用大写字母，小写字母，符号及数字";
        })
        // 5. 注册用户
        .then((res) => {
          let { username, password } = res;
          password = this.hashPassword(password);
          const user = new this.userModel({
            username,
            password,
          });
          user.save();
          return "用户创建成功！";
        })
        // 返回错误
        .catch((errWarn) => {
          return errWarn;
        })
    );
  }

  /**
   * @description 验证密码
   * @date 13/10/2021
   * @private
   * @param {string} password
   * @param {string} hashPassword
   * @returns {*}  {boolean}
   * @memberof AuthService
   */
  public comparePassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * @description 密码加密
   * @date 13/10/2021
   * @private
   * @param {string} password
   * @returns {*}  {string}
   * @memberof AuthService
   */
  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
  }
}
