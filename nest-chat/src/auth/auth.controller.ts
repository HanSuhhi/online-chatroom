import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { backCaptcha, RegistUserDto } from "./dto/regist-user.dto";

class B {
  @ApiProperty()
  password: string;

  @ApiProperty()
  hash: string;
}

@Controller("auth")
@ApiTags("用户权限模块")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("captcha")
  @ApiOperation({
    summary: "获取验证码",
  })
  public sendCaptcha(): backCaptcha {
    return this.authService.genCaptcha();
  }

  @Post("/regist")
  @ApiOperation({
    summary: "注册用户",
  })
  public async regist(@Body() registUserDto: RegistUserDto) {
    return await this.authService.registUser(registUserDto);
  }

  @Post("/a")
  public compare(@Body() passwords: B) {
    return this.authService.comparePassword(passwords.password, passwords.hash);
  }
}
