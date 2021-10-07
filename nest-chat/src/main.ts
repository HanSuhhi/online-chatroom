import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

const logger = new Logger()

let port: number = 4563;


(async () => {
  // create app
  Promise.resolve(await NestFactory.create(AppModule))
    // 配置swagger
    .then(app => {
      const config = new DocumentBuilder()
        .setTitle('online 聊天室')
        .setDescription('power by Nest & Vue')
        .setVersion('1.0')
        .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('swagger', app, document);
      return app
    })
    // listen port
    .then((app) => app.listen(port))
    .finally(() => {
      logger.log(`http://localhost:${port}/swagger`)
    })

})();



