"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const utils_1 = require("./utils");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
    });
    await app.listen(utils_1.default.isDevelopmentMode() ? 8080 : 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map