import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/db/schemas/user.schema";

export class RegistUserDto extends User {
  @ApiProperty()
  captchaId: string;

  @ApiProperty()
  captchaText: string;
}
