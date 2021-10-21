import { ApiProperty } from "@nestjs/swagger";

export class BackCaptcha {
  @ApiProperty()
  id: string;
  @ApiProperty()
  data: string;
}

export class Captcha extends BackCaptcha {
  @ApiProperty()
  text: string;
  @ApiProperty()
  time: Date;
}

export class CheckCaptchaDto {
  @ApiProperty()
  captchaId: string;

  @ApiProperty()
  captchaText: string;
}
