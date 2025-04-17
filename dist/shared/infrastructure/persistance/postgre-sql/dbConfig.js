"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const utils_1 = require("../../../utils");
require("dotenv/config");
exports.dbConfig = {
    name: process.env.NODE_ENV || 'dev',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'postgres',
    schema: process.env.DB_SCHEMA || 'public',
    synchronize: process.env.DB_SYNC ? (0, utils_1.evalENVBoolean)(process.env.DB_SYNC) : true,
    logging: process.env.DB_LOGGING ? (0, utils_1.evalENVBoolean)(process.env.DB_LOGGING) : true,
};
//# sourceMappingURL=dbConfig.js.map