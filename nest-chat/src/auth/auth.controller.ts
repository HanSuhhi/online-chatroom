import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Captcha } from "./dto/regist-user.dto";

@Controller("auth")
@ApiTags("用户权限模块")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("captcha")
  @ApiOperation({
    summary: "获取验证码",
  })
  public sendCaptcha(): Captcha {
    return this.authService.genCaptcha();
  }
}
