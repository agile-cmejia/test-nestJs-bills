"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.appPostgresDataSource = void 0;
const dbConfig_1 = require("./dbConfig");
const commonEntities = require("@avantodev/avanto-db");
const models = [];
for (const key in commonEntities) {
    if (commonEntities.hasOwnProperty(key)) {
        const model = commonEntities[key];
        models.push(model);
    }
}
exports.appPostgresDataSource = {
    type: 'postgres',
    name: dbConfig_1.dbConfig.name,
    host: dbConfig_1.dbConfig.host,
    port: dbConfig_1.dbConfig.port,
    username: dbConfig_1.dbConfig.username,
    password: dbConfig_1.dbConfig.password,
    database: dbConfig_1.dbConfig.database,
    synchronize: dbConfig_1.dbConfig.synchronize,
    schema: dbConfig_1.dbConfig.schema,
    logging: dbConfig_1.dbConfig.logging,
    autoLoadEntities: true,
    entities: models,
};
function getConfig() {
    return {
        type: 'postgres',
        name: dbConfig_1.dbConfig.name,
        host: dbConfig_1.dbConfig.host,
        port: dbConfig_1.dbConfig.port,
        username: dbConfig_1.dbConfig.username,
        password: dbConfig_1.dbConfig.password,
        database: dbConfig_1.dbConfig.database,
        synchronize: dbConfig_1.dbConfig.synchronize,
        schema: dbConfig_1.dbConfig.schema,
        logging: dbConfig_1.dbConfig.logging,
        autoLoadEntities: true,
        entities: models,
    };
}
exports.getConfig = getConfig;
//# sourceMappingURL=PostgresDataSource.js.map