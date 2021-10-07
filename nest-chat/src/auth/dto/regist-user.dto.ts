import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/db/schemas/user.schema";

export class Captcha {
    @ApiProperty()
    text: string;
    @ApiProperty()
    data: string;
    @ApiProperty()
    time: Date;
}

export class RegistUserDto extends User {
    @ApiProperty()
    captcha: Captcha
}