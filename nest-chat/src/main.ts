import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

const logger = new Logger();
const title = "山坞 Chat";
const desc = "云深山坞，烟冷江皋，人生未易相逢 · ——power by Nest & Vue";
const version = "1.0";
const globalPrefix = `/api/v${version.slice(0, version.indexOf("."))}`;

let port: number = 4563;

(async () => {
  // create app
  Promise.resolve(await NestFactory.create(AppModule))
    // 配置swagger
    .then((app) => {
      const config = new DocumentBuilder()
        .setTitle(title)
        .setDescription(desc)
        .setVersion(version)
        .addServer(globalPrefix)
        .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup("swagger", app, document);
      return app;
    })
    // 设置全局前缀
    .then((app) => {
      app.setGlobalPrefix(globalPrefix);
      return app;
    })
    // listen port
    .then((app) => app.listen(port))
    .finally(() => {
      logger.log(`http://localhost:${port}/swagger`);
    });
})();
