import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/db/schemas/user.schema";
import { RegistUserDto } from "./dto/regist-user.dto";
import * as svgCaptcha from "svg-captcha";
import { nanoid } from "nanoid";
import { passwordStrength } from "check-password-strength";
import * as bcrypt from "bcryptjs";
import { BackCaptcha, Captcha, CheckCaptchaDto } from "./dto/chatcha.dto";

@Injectable()
export class AuthService {
  private captchas: Map<string, Captcha> = new Map();
  private USERNAME_LENGTH_MAX: number = 20;
  private USERNAME_LENGTH_MIN: number = 5;

  constructor(
    @InjectModel("USER_MODEL") private readonly userModel: Model<User>,
  ) { }

  /**
   * @description 返回验证码
   * @date 06/10/2021
   * @returns {*}  {Captcha}
   * @memberof AuthService
   */
  public genCaptcha(): BackCaptcha {
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
    // delete returnCaptcha.text;
    return returnCaptcha;
  }

  /**
   * @description 检查验证码
   * @date 17/10/2021
   * @param {CheckCaptchaDto} CheckCaptchaDto
   * @returns {*}  {Promise<boolean>}
   * @memberof AuthService
   */
  public checkCaptcha(
    CheckCaptchaDto: CheckCaptchaDto,
  ): Promise<boolean | string> {
    return (
      Promise.resolve(CheckCaptchaDto)
        // 1. 检查验证码是否过期
        .then((res) => {
          const captcha = this.captchas.get(res.captchaId);
          if (!captcha) throw "验证码失效"
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
          return true;
        })
        .catch((err) => err)
    );
  }

  /**
   * @description 检查用户名是否已经存在
   * @date 17/10/2021
   * @param {string} username
   * @returns {*}  {Promise<boolean>}
   * @memberof AuthService
   */
  public checkUsername(username: string): Promise<boolean | string> {
    return (
      Promise.resolve(username)
        // 判断username 是否为合法字符
        .then((username) => {
          if (!username.match(/^[a-z]/i)) throw "首字母应为字母";
          if (
            username.length > this.USERNAME_LENGTH_MAX ||
            username.length < this.USERNAME_LENGTH_MIN
          )
            throw "长度应为6-20";
          if (!username.match(/[a-z_0-9]{5,19}$/i)) {
            throw "应为字母、数字及下划线的组合";
          }
          return username;
        })
        // 判断用户名是否已存在
        .then(async (username) => {
          const user = await this.userModel.findOne({ username }).exec();
          if (user) throw "用户名已注册";
          return true;
        })
        .catch((err) => err)
    );
  }

  /**
   * @description 注册用户
   * @date 17/10/2021
   * @param {RegistUserDto} registUserDto
   * @returns {*}  {Promise<string>}
   * @memberof AuthService
   */
  public registUser(registUserDto: RegistUserDto): Promise<string> {
    return (
      Promise.resolve(registUserDto)
        // 1. 检查验证码是否过期 & 验证码是否正确
        .then((regist) => {
          const result = this.checkCaptcha({
            captchaId: registUserDto.captchaId,
            captchaText: registUserDto.captchaText,
          });
          if (typeof result === "string") throw result;
          return regist;
        })
        // 2. 检查用户名是否已注册
        .then((res) => {
          const result = this.checkUsername(res.username);
          if (typeof result === "string") throw result;
          return res;
        })
        // 3. 检查密码是否过于简单
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
        // 4. 注册用户
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
  private comparePassword(password: string, hashPassword: string): boolean {
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
