"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const helmet_1 = require("helmet");
const express_rate_limit_1 = require("express-rate-limit");
const dotenv = require("dotenv");
const path = require("path");
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}
else {
    console.log('Running in production mode - using platform environment variables');
}
console.log('MONGO_URI =>', process.env.MONGO_URI);
console.log('JWT_SECRET =>', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: { origin: true, credentials: true } });
        app.use(cookieParser());
        app.use((0, helmet_1.default)());
        app.use((0, express_rate_limit_1.default)({ windowMs: 1 * 60 * 1000, max: 100 }));
        const port = process.env.PORT || 3001;
        await app.listen(port);
        console.log(`🚀 App running on port ${port}`);
        console.log(`📱 Server is ready and listening for requests`);
        console.log(`🌐 Access your app at: http://localhost:${port}`);
    }
    catch (error) {
        console.error('❌ Failed to start the application:', error.message);
        if (error.code === 'EADDRINUSE') {
            console.log('💡 Port is already in use. Try using a different port or kill the process using that port.');
        }
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map