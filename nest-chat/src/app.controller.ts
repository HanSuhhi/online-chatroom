import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@Controller()
@ApiTags("默认")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  @ApiOperation({
    summary: "hello world",
  })
  @HttpCode(806)
  getHello(): string {
    return this.appService.getHello(); // "hello world"
  }
}
