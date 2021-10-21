import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { BackCaptcha, CheckCaptchaDto } from "./dto/chatcha.dto";
import { RegistUserDto } from "./dto/regist-user.dto";
@Controller("auth")
@ApiTags("用户权限模块")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("captcha")
  @ApiOperation({
    summary: "获取验证码",
  })
  public sendCaptcha(): BackCaptcha {
    return this.authService.genCaptcha();
  }

  @Post("/regist")
  @ApiOperation({
    summary: "注册用户",
  })
  public regist(@Body() registUserDto: RegistUserDto) {
    return this.authService.registUser(registUserDto);
  }

  @Post("/checkCaptcha")
  @ApiOperation({
    summary: "校验验证码",
  })
  public checkCaptcha(@Body() checkCaptchaDto: CheckCaptchaDto) {
    return this.authService.checkCaptcha(checkCaptchaDto);
  }

  @Get(":username")
  @ApiOperation({
    summary: "检查用户名是否已存在",
  })
  public checkUsername(@Param("username") username: string) {
    return this.authService.checkUsername(username);
  }
}
