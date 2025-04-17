"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const nestjs_pino_1 = require("nestjs-pino");
const app_module_1 = require("./app.module");
require("dotenv/config");
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const PORT = process.env.PORT || '3000';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    app.useLogger(app.get(nestjs_pino_1.Logger));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Skeleton Microservice')
        .setDescription('Skeleton Microservice API documentation')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(PORT).then(() => console.log(`App Running in port ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map