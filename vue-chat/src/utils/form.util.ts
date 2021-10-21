import { passwordStrength } from "check-password-strength";

class FormChecker {
  /**
   * @description 用户名检查
   * @date 20/10/2021
   * @param {string} username
   * @param {number} [max=20]
   * @param {number} [min=5]
   * @returns {*}  {(Promise<string | true>)}
   * @memberof FormChecker
   */
  public checkUsername(username: string, max = 19, min = 6): Promise<string | true> {
    return Promise.resolve(username)
      .then((username) => {
        if (!username.match(/^[a-z]/i)) throw "首字母应为字母";
        if (username.length > max || username.length < min)
          throw "长度应为6-20";
        if (!username.match(/[a-z_0-9]/i)) {
          throw "只能为字母、数字及下划线";
        }
        return true;
      })
      .catch((err) => err);
  }

  /**
   * @description 密码验证器
   * @date 20/10/2021
   * @param {string} password
   * @returns {*}  
   * @memberof FormChecker
   */
  public checkPassword(password: string): Promise<string | true> {
    return Promise.resolve(passwordStrength(password))
      .then(res => {
        if (res.contains.length !== 4) throw "需大、小写字母，数字与特殊符号组合"
        if (res.id < 2) throw '密码过短'
        if (password.length < 8 || password.length > 20) throw "密码长度出错"
        return true
      })
      .catch(err => err)
  }

  /**
   * @description 重复密码验证器
   * @date 20/10/2021
   * @param {string} repassword
   * @param {string} password
   * @returns {*}  {(Promise<string | true>)}
   * @memberof FormChecker
   */
  public checkRepassword(repassword: string, password: string): Promise<string | true> {
    return Promise.resolve(repassword === password)
      .then(res => {
        if (!res) throw "密码不相等"
        return true
      })
      .catch(err => err)
  }
}

export default new FormChecker()