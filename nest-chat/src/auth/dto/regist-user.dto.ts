import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/db/schemas/user.schema";

export class backCaptcha {
  @ApiProperty()
  id: string;
  @ApiProperty()
  data: string;
}

export class Captcha extends backCaptcha {
  @ApiProperty()
  text: string;
  @ApiProperty()
  time: Date;
}

export class RegistUserDto extends User {
  @ApiProperty()
  captchaId: string;

  @ApiProperty()
  captchaText: string;
}
